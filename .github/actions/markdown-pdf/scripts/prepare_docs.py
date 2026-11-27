#!/usr/bin/env python3

from __future__ import annotations

import argparse
import fnmatch
import hashlib
import json
import os
import re
import shutil
import subprocess
import sys
import tempfile
import time
from pathlib import Path, PurePosixPath
from typing import Any, Callable
from urllib.parse import unquote, urlparse

import yaml

try:
    from PIL import Image
except ImportError:  # Dependency is installed by the composite action.
    Image = None



def _notify(message: str) -> None:
    """Emit a GitHub Actions ::notice:: log line so progress is visible live."""
    print(f'::notice::{message}', flush=True)

PRODUCT_TITLES = {
    '1panel': '1Panel 文档',
    'ai-gateway': 'AI 网关文档',
    'cordys': 'Cordys CRM 文档',
    'dataease': 'DataEase 文档',
    'halo': 'Halo 文档',
    'jumpserver': 'JumpServer 文档',
    'maxkb': 'MaxKB 文档',
    'sqlbot': 'SQLBot 文档',
}
DOC_SUFFIXES = {'.md', '.mdx'}
ADMONITION_TYPES = {
    'abstract', 'attention', 'bug', 'caution', 'danger', 'error', 'example',
    'failure', 'hint', 'important', 'info', 'note', 'question', 'quote',
    'success', 'tip', 'warning',
}
ADMONITION_OPEN_RE = re.compile(
    r'^(?P<indent>[ \t]*):::(?P<kind>'
    + '|'.join(sorted(ADMONITION_TYPES))
    + r')(?:\[(?P<title>[^\]]*)\])?[ \t]*$',
    re.IGNORECASE,
)
ADMONITION_CLOSE_RE = re.compile(r'^[ \t]*:::[ \t]*$')
FENCE_RE = re.compile(r'^[ \t]*(?P<fence>`{3,}|~{3,})')
IMAGE_MD_RE = re.compile(
    r'(?P<prefix>!\[[^\]]*\]\()'
    r'(?P<target><[^>]+>|(?:[^()\s]|\([^()\s]*\))+)'
    r'(?P<title>\s+(?:"[^"]*"|\'[^\']*\'|\([^)]*\)))?'
    r'(?P<suffix>\))'
)
LINK_MD_RE = re.compile(
    r'(?<!!)(?P<prefix>\[[^\]]*\]\()'
    r'(?P<target><[^>]+>|(?:[^()\s]|\([^()\s]*\))+)'
    r'(?P<title>\s+(?:"[^"]*"|\'[^\']*\'|\([^)]*\)))?'
    r'(?P<suffix>\))'
)
HTML_IMAGE_RE = re.compile(
    r'(?P<prefix><img\b[^>]*?\bsrc\s*=\s*)'
    r'(?P<quote>["\'])(?P<target>.*?)(?P=quote)',
    re.IGNORECASE | re.DOTALL,
)
FRONT_MATTER_RE = re.compile(r'\A---\s*\n(.*?)\n---\s*(?:\n|\Z)', re.DOTALL)
JSX_COMMENT_RE = re.compile(r'\{/\*.*?\*/\}', re.DOTALL)
JSX_STYLE_RE = re.compile(
    r'style\s*=\s*\{\{(?P<body>.*?)\}\}',
    re.IGNORECASE | re.DOTALL,
)
MDX_LINK_RE = re.compile(
    r'<Link\b(?P<attrs>[^>]*?\bto\s*=\s*["\'](?P<href>[^"\']+)["\'][^>]*?)>'
    r'(?P<inner>.*?)</Link>',
    re.DOTALL,
)
UNSUPPORTED_MDX_RE = re.compile(
    r'<(?P<tag>Link|Tabs|TabItem|DocCardList|Admonition)\b|className=\{'
)
FENCE_LINE_RE = re.compile(r'^[ \t]*(?P<fence>`{3,}|~{3,})')


class PrepareError(RuntimeError):
    pass


def _is_within(path: Path, parent: Path) -> bool:
    try:
        path.resolve().relative_to(parent.resolve())
        return True
    except ValueError:
        return False


def _repo_path(repo_root: Path, value: str) -> Path:
    candidate = Path(value)
    if not candidate.is_absolute():
        candidate = repo_root / candidate
    candidate = candidate.resolve()
    if not _is_within(candidate, repo_root):
        raise PrepareError(f'docs_dir 必须位于仓库内: {value}')
    return candidate


def _clean_work_dir(work_dir: Path, repo_root: Path) -> None:
    resolved = work_dir.resolve()
    if resolved == repo_root.resolve() or resolved.parent == resolved:
        raise PrepareError(f'拒绝清理不安全的临时目录: {resolved}')
    temp_roots = [Path(tempfile.gettempdir())]
    runner_temp = os.environ.get('RUNNER_TEMP')
    if runner_temp:
        temp_roots.append(Path(runner_temp))
    temp_roots = [path.resolve() for path in temp_roots]
    if resolved in temp_roots:
        raise PrepareError(f'拒绝清理系统临时目录本身: {resolved}')
    if not (_is_within(resolved, repo_root) or any(_is_within(resolved, root) for root in temp_roots)):
        raise PrepareError(f'work_dir 必须位于仓库或系统临时目录内: {resolved}')
    if resolved.exists():
        shutil.rmtree(resolved)
    resolved.mkdir(parents=True, exist_ok=True)


def _apply_outside_fences(text: str, transform: Callable[[str], str]) -> str:
    """Apply a text transform while leaving fenced code blocks untouched."""
    lines = text.splitlines(keepends=True)
    output: list[str] = []
    buffer: list[str] = []
    fence_char: str | None = None
    fence_length = 0

    def flush() -> None:
        if buffer:
            output.append(transform(''.join(buffer)))
            buffer.clear()

    for line in lines:
        match = FENCE_RE.match(line)
        if fence_char is None and match:
            flush()
            token = match.group('fence')
            fence_char = token[0]
            fence_length = len(token)
            output.append(line)
        elif fence_char is not None:
            output.append(line)
            stripped = line.lstrip()
            if stripped.startswith(fence_char * fence_length):
                fence_char = None
                fence_length = 0
        else:
            buffer.append(line)
    flush()
    return ''.join(output)


def _strip_mdx_module_lines(text: str) -> str:
    """Remove top-level ESM lines that Markdown would print as source code."""
    front_matter = ''
    body = text
    match = FRONT_MATTER_RE.match(text)
    if match:
        front_matter = match.group(0)
        body = text[match.end():]

    lines = body.splitlines(keepends=True)
    index = 0
    while index < len(lines):
        stripped = lines[index].strip()
        if not stripped or stripped.startswith('<!--'):
            index += 1
            continue
        if stripped.startswith(('import ', 'export ')):
            index += 1
            continue
        break
    return front_matter + ''.join(lines[index:])


def _compile_excludes(raw: str) -> list[str]:
    """Split a comma/newline separated exclusion list into glob patterns."""
    patterns: list[str] = []
    for token in re.split(r'[\n,]+', raw or ''):
        token = token.strip().replace('\\', '/')
        if token:
            patterns.append(token)
    return patterns


def _is_excluded(relative: PurePosixPath, patterns: list[str]) -> str | None:
    """Return the pattern that matches a docs-relative path, or None."""
    posix = relative.as_posix()
    name = relative.name
    for pattern in patterns:
        if fnmatch.fnmatch(posix, pattern):
            return pattern
        if '/' not in pattern and fnmatch.fnmatch(name, pattern):
            return pattern
    return None


def _outside_fence_lines(text: str) -> list[str]:
    """Yield only the lines that are not inside fenced code blocks."""
    lines = text.splitlines()
    result: list[str] = []
    fence: str | None = None
    for line in lines:
        match = FENCE_LINE_RE.match(line)
        if fence is None and match:
            fence = match.group('fence')
            continue
        if fence is not None:
            if line.lstrip().startswith(fence):
                fence = None
            continue
        result.append(line)
    return result


def _jsx_style_to_css(body: str) -> str:
    """Turn a Docusaurus style={{...}} object literal into valid CSS."""
    props: list[str] = []
    for part in body.split(','):
        if ':' not in part:
            continue
        key, _, value = part.partition(':')
        key = key.strip()
        value = value.strip().strip('"\'')
        if not key or not value:
            continue
        css_key = re.sub(r'([a-z0-9])([A-Z])', r'\1-\2', key).lower()
        props.append(f'{css_key}:{value}')
    return '; '.join(props)


def _normalize_jsx_style(text: str) -> str:
    def _repl(match: re.Match[str]) -> str:
        css = _jsx_style_to_css(match.group('body'))
        return f'style="{css}"' if css else ''
    return _apply_outside_fences(text, lambda s: JSX_STYLE_RE.sub(_repl, s))


def degrade_mdx(text: str) -> str:
    """Best-effort downgrade of JSX-only syntax that raw HTML cannot render."""
    def _link(match: re.Match[str]) -> str:
        return f'<a href="{match.group("href")}">{match.group("inner")}</a>'

    text = JSX_COMMENT_RE.sub('', text)
    text = _normalize_jsx_style(text)
    return text


def scan_unsupported_mdx(text: str) -> list[str]:
    """Report JSX component tags / object-props that survived, outside code fences."""
    found: list[str] = []
    for line in _outside_fence_lines(text):
        match = UNSUPPORTED_MDX_RE.search(line)
        if match:
            token = match.group('tag') or 'className={'
            if token not in found:
                found.append(token)
    return found


def convert_admonitions(text: str) -> str:
    """Convert Docusaurus ::: admonitions to Python-Markdown admonitions."""
    lines = text.splitlines()
    output: list[str] = []
    depth = 0
    fence_char: str | None = None
    fence_length = 0

    for line in lines:
        match = FENCE_RE.match(line)
        if fence_char is None and match:
            token = match.group('fence')
            fence_char = token[0]
            fence_length = len(token)
            output.append(('    ' * depth) + line if depth else line)
            continue
        if fence_char is not None:
            output.append(('    ' * depth) + line if depth else line)
            if line.lstrip().startswith(fence_char * fence_length):
                fence_char = None
                fence_length = 0
            continue

        open_match = ADMONITION_OPEN_RE.match(line)
        if open_match:
            kind = open_match.group('kind').lower()
            title = (open_match.group('title') or '').replace('"', "'").strip()
            header = f'!!! {kind}'
            if title:
                header += f' "{title}"'
            output.append(('    ' * depth) + header)
            depth += 1
            continue

        if depth and ADMONITION_CLOSE_RE.match(line):
            depth -= 1
            continue

        output.append(('    ' * depth) + line if depth and line.strip() else line)

    if depth:
        print(f'::warning::发现 {depth} 个未闭合的 Docusaurus admonition，已按文件末尾自动闭合')
    return '\n'.join(output) + ('\n' if text.endswith('\n') else '')


def _strip_target_token(token: str) -> str:
    token = token.strip()
    if token.startswith('<') and token.endswith('>'):
        return token[1:-1]
    return token


def _safe_asset_name(source: Path, digest: str) -> str:
    stem = re.sub(r'[^0-9A-Za-z\u4e00-\u9fff._-]+', '_', source.stem)
    if len(stem) > 80:
        stem = stem[:80]
    suffix = source.suffix.lower() or '.bin'
    return f'{digest[:12]}-{stem}{suffix}'


class AssetCollector:
    def __init__(self, repo_root: Path, docs_root: Path, docs_output: Path, max_width: int):
        self.repo_root = repo_root
        self.docs_root = docs_root
        self.docs_output = docs_output
        self.assets_output = docs_output / '_assets'
        self.assets_output.mkdir(parents=True, exist_ok=True)
        self.max_width = max_width
        self.by_source: dict[Path, str] = {}
        self.missing: set[Path] = set()
        self.converted: list[Path] = []
        # librsvg 可把 SVG 连同中文文本一起渲染成位图；Pillow 无法读取 SVG。
        self.rsvg = shutil.which('rsvg-convert')

    def resolve(self, token: str, markdown_file: Path) -> Path | None:
        raw = _strip_target_token(token)
        parsed = urlparse(raw)
        if parsed.scheme or raw.startswith('//') or raw.startswith('#'):
            return None
        path_text = unquote(parsed.path)
        if not path_text:
            return None

        relative = path_text.lstrip('/\\')
        candidates: list[Path] = []
        if path_text.startswith(('/')):
            candidates.extend([
                self.docs_root / 'static' / relative,
                self.repo_root / 'static' / relative,
                self.docs_root / relative,
            ])
        else:
            candidates.extend([
                markdown_file.parent / path_text,
                self.docs_root / path_text,
            ])

        for candidate in candidates:
            resolved = candidate.resolve()
            if _is_within(resolved, self.repo_root) and resolved.is_file():
                return resolved
        self.missing.add(Path(path_text))
        return None

    def collect(self, source: Path) -> str:
        source = source.resolve()
        if source in self.by_source:
            return self.by_source[source]

        digest = hashlib.sha1(str(source).encode('utf-8')).hexdigest()
        suffix = source.suffix.lower()
        is_svg = suffix == '.svg'
        convert_format = suffix in {'.gif', '.webp'}
        should_resize = self.max_width > 0 and Image is not None
        output_name = _safe_asset_name(source, digest)
        if convert_format or is_svg:
            output_name = str(Path(output_name).with_suffix('.png'))

        output_path = self.assets_output / output_name
        copied = False
        if is_svg and self.rsvg:
            try:
                args = [self.rsvg, '-f', 'png']
                target_width = self._svg_target_width(source)
                if target_width:
                    args += ['-w', str(target_width)]
                args += ['-o', str(output_path), str(source)]
                subprocess.run(args, check=True, capture_output=True, text=True)
                copied = True
                self.converted.append(source)
            except subprocess.CalledProcessError as exc:
                detail = (exc.stderr or '').strip() or str(exc)
                print(f'::warning file={source}::SVG 转 PNG 失败，将复制原文件: {detail}')
            except Exception as exc:
                print(f'::warning file={source}::SVG 转 PNG 失败，将复制原文件: {exc}')
        elif Image is not None and not is_svg and (convert_format or should_resize):
            try:
                with Image.open(source) as image:
                    if getattr(image, 'is_animated', False):
                        image.seek(0)
                    needs_resize = self.max_width > 0 and image.width > self.max_width
                    if convert_format or needs_resize:
                        rendered = image.convert('RGBA')
                        if needs_resize:
                            height = max(1, round(rendered.height * self.max_width / rendered.width))
                            rendered = rendered.resize((self.max_width, height), Image.Resampling.LANCZOS)
                        rendered.save(output_path, format='PNG', optimize=True)
                        copied = True
                        self.converted.append(source)
            except Exception as exc:
                print(f'::warning file={source}::图片转换失败，将复制原文件: {exc}')

        if not copied:
            shutil.copy2(source, output_path)
        self.by_source[source] = output_name
        return output_name

    def _svg_target_width(self, source: Path) -> int | None:
        """Pick a crisp PNG width for an SVG, capped by max_width."""
        if self.max_width <= 0:
            return None
        try:
            head = source.read_text(encoding='utf-8', errors='ignore')[:4000]
        except OSError:
            return self.max_width
        match = re.search(r'\bwidth\s*=\s*["\']\s*([0-9.]+)', head)
        if match:
            intrinsic = float(match.group(1))
        else:
            match = re.search(
                r'\bviewBox\s*=\s*["\']\s*[-0-9.]+\s+[-0-9.]+\s+([0-9.]+)', head
            )
            if not match:
                return self.max_width
            intrinsic = float(match.group(1))
        # 2x 渲染保证打印清晰度，再用 max_width 封顶。
        return max(1, min(self.max_width, int(round(intrinsic * 2))))


def rewrite_images(
    text: str,
    markdown_file: Path,
    output_file: Path,
    collector: AssetCollector,
) -> str:
    def image_target(token: str) -> str | None:
        source = collector.resolve(token, markdown_file)
        if source is None:
            return None
        asset_name = collector.collect(source)
        relative = os.path.relpath(
            collector.assets_output / asset_name,
            start=output_file.parent,
        ).replace(os.sep, '/')
        return f'<{relative}>' if any(ch.isspace() for ch in relative) else relative

    def replace_md(match: re.Match[str]) -> str:
        replacement = image_target(match.group('target'))
        if replacement is None:
            return match.group(0)
        return match.group('prefix') + replacement + (match.group('title') or '') + match.group('suffix')

    def replace_html(match: re.Match[str]) -> str:
        replacement = image_target(match.group('target'))
        if replacement is None:
            return match.group(0)
        quote = match.group('quote')
        return f'{match.group("prefix")}{quote}{replacement}{quote}'

    text = _apply_outside_fences(text, lambda chunk: IMAGE_MD_RE.sub(replace_md, chunk))
    text = _apply_outside_fences(text, lambda chunk: HTML_IMAGE_RE.sub(replace_html, chunk))
    return text


def _find_doc_candidate(base: Path, target: str) -> Path | None:
    target = unquote(target).replace('\\', '/').strip('/')
    if not target:
        target = 'index'
    target = re.sub(r'\.(md|mdx)$', '', target, flags=re.IGNORECASE)
    candidates = [
        base / target,
        base / f'{target}.md',
        base / f'{target}.mdx',
        base / target / 'index.md',
        base / target / 'index.mdx',
    ]
    for candidate in candidates:
        if candidate.is_file():
            return candidate.resolve()
    return None


class LinkRewriter:
    def __init__(self, repo_root: Path, docs_root: Path, copied: dict[Path, Path]):
        self.repo_root = repo_root
        self.docs_root = docs_root
        self.copied = copied
        self.product_route = _product_route(docs_root)

    def resolve_doc(self, token: str, markdown_file: Path) -> Path | None:
        raw = _strip_target_token(token)
        parsed = urlparse(raw)
        if parsed.scheme or raw.startswith(('#', '//', 'mailto:', 'tel:')):
            return None
        path_text = unquote(parsed.path)
        if not path_text:
            return None

        if path_text.startswith('/'):
            stripped = path_text.lstrip('/')
            route_prefix = f'{self.product_route}/'
            if stripped.startswith(route_prefix):
                stripped = stripped[len(route_prefix):]
            return _find_doc_candidate(self.docs_root, stripped)
        return _find_doc_candidate(markdown_file.parent, path_text)

    def rewrite(
        self,
        text: str,
        markdown_file: Path,
        output_file: Path,
    ) -> str:
        def replace(match: re.Match[str]) -> str:
            target_token = match.group('target')
            source = self.resolve_doc(target_token, markdown_file)
            if source is None or source not in self.copied:
                return match.group(0)

            raw = _strip_target_token(target_token)
            anchor = ''
            if '#' in raw:
                anchor = '#' + raw.split('#', 1)[1]
            relative = os.path.relpath(
                self.copied[source],
                start=output_file.parent,
            ).replace(os.sep, '/') + anchor
            replacement = f'<{relative}>' if any(ch.isspace() for ch in relative) else relative
            return match.group('prefix') + replacement + (match.group('title') or '') + match.group('suffix')

        return _apply_outside_fences(text, lambda chunk: LINK_MD_RE.sub(replace, chunk))


def _front_matter_title(path: Path) -> str | None:
    try:
        text = path.read_text(encoding='utf-8')
    except UnicodeDecodeError:
        return None
    match = FRONT_MATTER_RE.match(text)
    if not match:
        return None
    try:
        data = yaml.safe_load(match.group(1)) or {}
    except yaml.YAMLError:
        return None
    title = data.get('title') if isinstance(data, dict) else None
    return str(title).strip() if title else None


def _product_route(docs_root: Path) -> str:
    name = docs_root.name
    if docs_root.parent.name.endswith('_versioned_docs'):
        return docs_root.parent.name[:-len('_versioned_docs')]
    if name.endswith('-docs'):
        return name[:-len('-docs')]
    if name.endswith('_docs'):
        return name[:-len('_docs')]
    return name


def infer_title(docs_root: Path) -> str:
    route = _product_route(docs_root)
    product = PRODUCT_TITLES.get(route, f'{route} 文档')
    if docs_root.parent.name.endswith('_versioned_docs'):
        return f'{product} ({docs_root.name})'
    return product


def infer_output_name(docs_root: Path) -> str:
    route = _product_route(docs_root)
    if docs_root.parent.name.endswith('_versioned_docs'):
        return f'{route}-{docs_root.name}.pdf'
    return f'{docs_root.name}.pdf'


def sanitize_output_name(value: str, fallback: str) -> str:
    value = value.strip() or fallback
    value = value.replace('\\', '-').replace('/', '-')
    value = re.sub(r'[\x00-\x1f<>:"|?*]+', '-', value)
    value = re.sub(r'\s+', ' ', value).strip(' .-')
    if not value:
        value = fallback
    if not value.lower().endswith('.pdf'):
        value += '.pdf'
    return value


def find_sidebar(repo_root: Path, docs_root: Path) -> Path | None:
    for name in ('sidebars.js', 'sidebars.mjs', 'sidebars.cjs'):
        candidate = docs_root / name
        if candidate.is_file():
            return candidate

    if docs_root.parent.name.endswith('_versioned_docs'):
        product = docs_root.parent.name[:-len('_versioned_docs')]
        sidebar_dir = repo_root / f'{product}_versioned_sidebars'
        candidates = [
            sidebar_dir / f'{docs_root.name}-sidebars.json',
            sidebar_dir / f'{docs_root.name}-sidebars.js',
        ]
        for candidate in candidates:
            if candidate.is_file():
                return candidate
    return None


def run_sidebar_converter(
    script: Path,
    sidebar: Path,
    docs_root: Path,
    work_dir: Path,
) -> list[dict[str, Any]] | None:
    output = work_dir / 'sidebar.json'
    command = [
        'node', str(script),
        '--sidebar', str(sidebar),
        '--docs-root', str(docs_root),
        '--output', str(output),
    ]
    result = subprocess.run(command, text=True, capture_output=True)
    if result.returncode != 0:
        print('::warning::侧边栏解析失败，将使用按目录自动生成的导航')
        if result.stdout.strip():
            print(result.stdout.strip())
        if result.stderr.strip():
            print(result.stderr.strip())
        return None
    try:
        data = json.loads(output.read_text(encoding='utf-8'))
    except (OSError, json.JSONDecodeError) as exc:
        print(f'::warning::无法读取侧边栏转换结果: {exc}')
        return None
    items = data.get('items') if isinstance(data, dict) else None
    return items if isinstance(items, list) else None


def _normalize_sidebar_items(
    items: list[Any],
    copied: dict[Path, Path],
    docs_root: Path,
    docs_output: Path,
    visited: set[str],
    title_map: dict[Path, str],
) -> list[dict[str, Any]]:
    normalized: list[dict[str, Any]] = []
    for item in items:
        if not isinstance(item, dict):
            continue
        path_value = item.get('path')
        if path_value:
            source = (docs_root / str(path_value)).resolve()
            output = copied.get(source)
            if output is None:
                continue
            nav_path = output.relative_to(docs_output).as_posix()
            if nav_path in visited:
                continue
            visited.add(nav_path)
            label = str(item.get('label') or title_map.get(source) or Path(nav_path).stem)
            normalized.append({label: nav_path})
            continue

        children = item.get('items')
        if isinstance(children, list):
            child_nav = _normalize_sidebar_items(
                children, copied, docs_root, docs_output, visited, title_map
            )
            if child_nav:
                label = str(item.get('label') or '未命名分组')
                normalized.append({label: child_nav})
    return normalized


def _auto_nav_for_paths(
    paths: list[Path],
    docs_root: Path,
    title_map: dict[Path, str],
) -> list[dict[str, Any]]:
    by_relative = {p.relative_to(docs_root).as_posix(): p for p in paths}

    def build(prefix: str) -> list[dict[str, Any]]:
        prefix_path = Path(prefix) if prefix else Path()
        direct_files: list[dict[str, Any]] = []
        directories: dict[str, list[Path]] = {}
        for relative, source in by_relative.items():
            rel_path = Path(relative)
            if prefix and not relative.startswith(prefix.rstrip('/') + '/'):
                continue
            remainder = rel_path.relative_to(prefix_path) if prefix else rel_path
            if len(remainder.parts) == 1:
                label = title_map.get(source, rel_path.stem)
                direct_files.append({label: relative})
            else:
                directories.setdefault(remainder.parts[0], []).append(source)

        result = sorted(direct_files, key=lambda entry: next(iter(entry)).lower())
        for directory in sorted(directories, key=str.lower):
            child_prefix = f'{prefix}/{directory}' if prefix else directory
            children = build(child_prefix)
            if children:
                result.append({directory: children})
        return result

    return build('')


def write_mkdocs_config(
    config_path: Path,
    title: str,
    nav: list[dict[str, Any]],
    toc_depth: int,
    cover_subtitle: str = '',
    brand: str = '',
) -> None:
    config: dict[str, Any] = {
        'site_name': title,
        'site_author': '杭州飞致云信息科技有限公司',
        'copyright': 'Copyright © 杭州飞致云信息科技有限公司',
        'docs_dir': 'docs',
        'site_dir': 'site',
        'use_directory_urls': False,
        'theme': {
            'name': 'material',
            'language': 'zh',
            'font': False,
            'features': [
                'navigation.indexes',
                'navigation.sections',
            ],
        },
        'markdown_extensions': [
            'admonition',
            'attr_list',
            'def_list',
            'footnotes',
            'tables',
            'md_in_html',
            {'toc': {'permalink': False}},
            'pymdownx.details',
            'pymdownx.superfences',
            {'pymdownx.tabbed': {'alternate_style': True}},
            'pymdownx.tasklist',
        ],
        'plugins': [
            'search',
            {
                'to-pdf': {
                    'cover': True,
                    'cover_title': title,
                    'cover_subtitle': cover_subtitle,
                    'brand': brand,
                    'toc_title': '目录',
                    'toc_level': toc_depth,
                    'ordered_chapter_level': 3,
                    'output_html': True,
                    'download_link': 'header',
                    'render_js': False,
                    'output_path': 'pdf/document.pdf',
                }
            },
        ],
        'nav': nav,
    }
    config_path.write_text(
        yaml.safe_dump(config, allow_unicode=True, sort_keys=False, width=1000),
        encoding='utf-8',
    )


def prepare(args: argparse.Namespace) -> dict[str, Any]:
    repo_root = Path(args.repo_root).resolve()
    docs_root = _repo_path(repo_root, args.docs_dir)
    if not docs_root.is_dir():
        raise PrepareError(f'docs_dir 不存在或不是目录: {args.docs_dir}')
    if docs_root == repo_root:
        raise PrepareError('docs_dir 不能是仓库根目录，请指定具体产品目录')
    if not 1 <= args.toc_depth <= 6:
        raise PrepareError('toc-depth 必须在 1 到 6 之间')
    if not 0 <= args.image_max_width <= 10000:
        raise PrepareError('image-max-width 必须在 0 到 10000 之间（0 表示不缩放）')

    work_dir = Path(args.work_dir).resolve()
    _clean_work_dir(work_dir, repo_root)
    t0 = time.monotonic()
    docs_output = work_dir / 'docs'
    docs_output.mkdir(parents=True, exist_ok=True)

    source_files = sorted(
        path for path in docs_root.rglob('*')
        if path.is_file()
        and path.suffix.lower() in DOC_SUFFIXES
        and 'node_modules' not in path.parts
    )
    if not source_files:
        raise PrepareError(f'目录中没有 Markdown 文件: {args.docs_dir}')

    exclude_patterns = _compile_excludes(getattr(args, 'exclude', ''))
    excluded_count = 0
    if exclude_patterns:
        kept: list[Path] = []
        for path in source_files:
            relative = PurePosixPath(path.relative_to(docs_root).as_posix())
            hit = _is_excluded(relative, exclude_patterns)
            if hit:
                excluded_count += 1
                print(f'::notice::已排除文档: {relative.as_posix()} (匹配 {hit})')
            else:
                kept.append(path)
        source_files = kept
        if not source_files:
            raise PrepareError('排除后没有可生成的 Markdown 文件')

    copied: dict[Path, Path] = {}
    title_map: dict[Path, str] = {}
    for source in source_files:
        source = source.resolve()
        relative = source.relative_to(docs_root)
        output = (docs_output / relative).with_suffix('.md')
        output.parent.mkdir(parents=True, exist_ok=True)
        copied[source] = output.resolve()
        title = _front_matter_title(source)
        if title:
            title_map[source] = title

    jsx_fallback_files: list[str] = []
    asset_collector = AssetCollector(repo_root, docs_root, docs_output, args.image_max_width)
    link_rewriter = LinkRewriter(repo_root, docs_root, copied)

    total_files = len(source_files)
    for index, source in enumerate(source_files, start=1):
        source = source.resolve()
        output = copied[source]
        if index % 25 == 0 or index == total_files:
            _notify(f'处理中 {index}/{total_files}: {source.relative_to(docs_root).as_posix()}')
        text = source.read_text(encoding='utf-8')
        if source.suffix.lower() == '.mdx':
            text = _strip_mdx_module_lines(text)
        text = degrade_mdx(text)
        residual = scan_unsupported_mdx(text)
        if residual:
            jsx_fallback_files.append(
                f"{source.relative_to(docs_root).as_posix()}: {', '.join(residual)}"
            )
        text = convert_admonitions(text)
        text = rewrite_images(text, source, output, asset_collector)
        text = link_rewriter.rewrite(text, source, output)
        output.write_text(text, encoding='utf-8')

    title = args.title.strip() or infer_title(docs_root)
    output_name = sanitize_output_name(args.output_name, infer_output_name(docs_root))
    sidebar = find_sidebar(repo_root, docs_root)
    sidebar_items: list[dict[str, Any]] | None = None
    if sidebar:
        sidebar_items = run_sidebar_converter(
            Path(__file__).with_name('sidebar_to_nav.mjs'),
            sidebar,
            docs_root,
            work_dir,
        )
    else:
        print('::notice::未找到 sidebars.js/版本侧边栏，按目录自动生成导航')

    visited: set[str] = set()
    nav = _normalize_sidebar_items(
        sidebar_items or [], copied, docs_root, docs_output, visited, title_map
    )

    missing_sources = [
        source for source in source_files
        if copied[source].relative_to(docs_output).as_posix() not in visited
    ]
    if missing_sources:
        other_nav = _auto_nav_for_paths(missing_sources, docs_root, title_map)
        if other_nav:
            nav.append({'其他文档': other_nav})

    if not nav:
        raise PrepareError('生成的 MkDocs 导航为空')

    config_path = work_dir / 'mkdocs.yml'
    brand = re.sub(r'\s*文[档檔]\s*$', '', title).strip() or title.strip()
    write_mkdocs_config(
        config_path, title, nav, toc_depth=args.toc_depth,
        cover_subtitle=args.cover_subtitle, brand=brand,
    )

    if jsx_fallback_files:
        print(
            f'::warning::有 {len(jsx_fallback_files)} 个文件仍含无法还原的 JSX '
            f'（建议用 exclude 排除）: '
            + ' | '.join(jsx_fallback_files[:5])
        )

    if asset_collector.missing:
        samples = ', '.join(str(path) for path in sorted(asset_collector.missing)[:5])
        print(
            f'::warning::有 {len(asset_collector.missing)} 个图片/链接资源未找到，'
            f'示例: {samples}'
        )

    metadata = {
        'repo_root': str(repo_root),
        'docs_root': str(docs_root),
        'work_dir': str(work_dir),
        'config_path': str(config_path),
        'docs_output': str(docs_output),
        'pdf_source': str(work_dir / 'site' / 'pdf' / 'document.pdf'),
        'title': title,
        'output_name': output_name,
        'markdown_files': len(source_files),
        'nav_entries': sum(1 for _ in _walk_nav(nav)),
        'assets_copied': len(asset_collector.by_source),
        'assets_converted': len(asset_collector.converted),
        'missing_assets': len(asset_collector.missing),
        'excluded_files': excluded_count,
        'jsx_fallback_files': jsx_fallback_files,
        'sidebar': str(sidebar) if sidebar else None,
    }
    metadata_path = Path(args.metadata).resolve()
    metadata_path.parent.mkdir(parents=True, exist_ok=True)
    metadata_path.write_text(
        json.dumps(metadata, ensure_ascii=False, indent=2),
        encoding='utf-8',
    )
    print(
        f'准备完成: {len(source_files)} 个 Markdown，'
        f'{metadata["nav_entries"]} 个导航页面，{metadata["assets_copied"]} 个资源'
    )
    _notify(f'资源统计: 转换 {len(asset_collector.converted)} 个，复制 {len(asset_collector.by_source)} 个，缺失 {len(asset_collector.missing)} 个')
    _notify(f'prepare 阶段耗时 {time.monotonic() - t0:.1f} 秒')
    return metadata


def _walk_nav(items: list[dict[str, Any]]):
    for item in items:
        for value in item.values():
            if isinstance(value, list):
                yield from _walk_nav(value)
            else:
                yield value


def build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--repo-root', required=True)
    parser.add_argument('--docs-dir', required=True)
    parser.add_argument('--work-dir', required=True)
    parser.add_argument('--metadata', required=True)
    parser.add_argument('--title', default='')
    parser.add_argument('--output-name', default='')
    parser.add_argument('--toc-depth', type=int, default=3)
    parser.add_argument('--image-max-width', type=int, default=1600)
    parser.add_argument('--cover-subtitle', default='')
    parser.add_argument(
        '--exclude',
        default='',
        help="Comma/newline separated docs-relative paths or globs to skip (e.g. 'product_landing.md').",
    )
    return parser


def main() -> int:
    try:
        prepare(build_parser().parse_args())
    except Exception as exc:
        print(f'::error::{exc}', file=sys.stderr)
        return 1
    return 0


if __name__ == '__main__':
    raise SystemExit(main())
