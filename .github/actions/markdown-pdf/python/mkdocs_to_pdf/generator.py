import logging
import os
import re
import time
from typing import Pattern, List, Tuple
from importlib import import_module
from importlib.util import module_from_spec, spec_from_file_location
from datetime import datetime

from bs4 import BeautifulSoup, PageElement
from weasyprint import HTML, urls
from PyPDF2 import PdfReader, PdfWriter
from PyPDF2.generic import AnnotationBuilder

from .cover import make_cover
from .options import Options
from .pdf_nav import (
    anchor_positions,
    css_rect_to_pdf,
    fill_toc_page_numbers,
    inject_style,
    internal_link_rects,
    page_start_css,
)
from .preprocessor import get_combined as prep_combined
from .styles import style_for_print
from .themes import generic as generic_theme
from .toc import make_indexes
from .utils.emoji_util import fix_twemoji
from .utils.iframe_util import convert_iframe
from .utils.image_util import fix_image_alignment
from .utils.layout_util import convert_for_two_columns
from .utils.section import get_section_path
from .utils.soup_util import clone_element
from .utils.tabbed_set_util import wrap_tabbed_set_content


class Generator(object):

    def __init__(self, options: Options):
        self._options = options

        self._theme = self._load_theme_handler()
        self._nav = None
        self._head = None

        self._scraped_scripts = []
        self._mixed_script = ''

        def to_pattern(s: str) -> Pattern:
            if s.startswith('^'):
                return re.compile(s)
            return re.compile(f'^{s}')

        self._exclude_page_patterns = list(map(
            to_pattern,
            self._options.exclude_pages
        ))
        self._options.logger.debug(
            f'Exclude page patterns: {self._exclude_page_patterns}')

    def on_nav(self, nav):
        """ on_nav """
        self._nav = nav
        if nav:
            self._options.logger.debug(f'theme: {self._theme}')

    def on_post_page(self, output_content: str, page, pdf_path: str) -> str:
        """ on_post_page """

        def is_excluded(url: str) -> bool:
            for p in self._exclude_page_patterns:
                if p.match(url):
                    return True
            return False

        if is_excluded(page.url):
            self.logger.info(f'Page skipped: [{page.title}]({page.url})')
            return output_content
        else:
            self.logger.debug(f' (post: [{page.title}]({page.url})')

        current_time = datetime.now().strftime("%Y 年 %m 月 %d 日")
        output_content = output_content.replace('{{BUILD_TIME}}', current_time)

        soup = self._soup_from_content(output_content, page)

        self._remove_empty_tags(soup)

        if not self._head:
            self._head = soup.find('head')

        article = soup.find('article')
        if article:
            article = clone_element(article)

        if not article:
            main = soup.find('div', attrs={'role': 'main'})
            if main:
                article = soup.new_tag('article')
                for child in main.contents:
                    article.append(clone_element(child))

        if article:
            for a in article.select('a.headerlink'):
                a.decompose()
            for a in article.select('a.md-content__button'):
                a.decompose()
            self._fix_missing_id_for_h1(article, page)
            setattr(page, 'pdf-article', article)
            self._scrap_scripts(soup)
        else:
            self.logger.warning(f'Missing article: [{page.title}]({page.url})')

        return self._options.hook.inject_link(
            output_content, pdf_path, page, self._theme)

    @staticmethod
    def _strip_heading_number(text: str) -> str:
        if not text:
            return text
        pattern = re.compile(r'^\s*(?:\d+\.?)+(?:[).])?(?:\s+|-+|：|:)+')
        new_text = re.sub(pattern, '', text)
        return new_text or text

    def _create_chunk_soup(self) -> BeautifulSoup:
        if self._head:
            soup = BeautifulSoup('<html><body></body></html>', 'html.parser')
            soup.html.insert(0, clone_element(self._head))
        else:
            soup = BeautifulSoup(
                '<html><head></head><body></body></html>', 'html.parser')

        current_time = datetime.now().strftime("%Y 年 %m 月 %d 日")
        meta_tag = soup.new_tag('meta', attrs={'name': 'build-time', 'content': current_time})
        soup.head.append(meta_tag)

        build_time_element = soup.new_tag('div', attrs={
            'class': 'build-time-string-set',
            'style': 'display: none;'
        })
        build_time_element.string = current_time
        soup.body.insert(0, build_time_element)

        def add_stylesheet(stylesheet: str):
            if stylesheet:
                stylesheet = stylesheet.replace(
                    "{{BUILD_TIME}}",
                    current_time
                )
                style_tag = soup.new_tag('style')
                style_tag.string = stylesheet
                soup.head.append(style_tag)

        add_stylesheet(style_for_print(self._options))
        add_stylesheet(self._theme.get_stylesheet(self._options.debug_html))

        return soup

    def _render_chunk_pdf(self, html_string: str, chunk_path: str, start_page: int = 1):
        """Render one chunk. Returns the WeasyPrint document, or None for RelaxedJS."""
        html_string = inject_style(html_string, page_start_css(start_page))
        max_retries = 3
        for attempt in range(max_retries):
            try:
                if self._options.relaxed_js:
                    self._options.relaxed_js.write_pdf(html_string, chunk_path)
                    return None
                html = HTML(string=html_string)
                document = html.render()
                document.write_pdf(chunk_path)
                return document
            except Exception as e:
                self.logger.error(f'Chunk rendering failed (attempt {attempt + 1}/{max_retries}): {e}')
                if attempt < max_retries - 1:
                    time.sleep(2)
                else:
                    raise

    def _page_count(self, document, chunk_path: str) -> int:
        if document is not None:
            return len(document.pages)
        return len(PdfReader(chunk_path).pages)

    def on_post_build(self, config, output_path):
        abs_pdf_path = os.path.join(config['site_dir'], output_path)
        os.makedirs(os.path.dirname(abs_pdf_path), exist_ok=True)

        if not self._nav:
            self.logger.error('No navigation found')
            return

        root_soup = self._create_chunk_soup()

        all_content = []
        page_count = 0
        empty_count = 0
        for page in self._nav:
            content = self._get_content(root_soup, page)
            page_url = getattr(page, 'url', '')
            page_title = getattr(page, 'title', 'Untitled')
            if content:
                all_content.append(content)
                root_soup.body.append(content)
                page_count += 1
                self.logger.info(f'Added content: [{page_title}]({page_url})')
            else:
                empty_count += 1
                self.logger.warning(f'Skipped empty/missing: [{page_title}]({page_url})')

        self.logger.info(f'Total content items: {page_count}, skipped: {empty_count}')

        make_indexes(root_soup, self._options)
        make_cover(root_soup, self._options)

        wrap_tabbed_set_content(root_soup, self._options.logger)
        fix_image_alignment(root_soup, self._options.logger)
        convert_iframe(root_soup,
                       self._options.convert_iframe,
                       self._options.logger)
        convert_for_two_columns(root_soup,
                                self._options.two_columns_level,
                                self._options.logger)
        self._normalize_link_anchors(root_soup)

        toc_article = root_soup.find('article', id='doc-toc')
        cover_elements = []
        for child in list(root_soup.body.contents):
            if hasattr(child, 'name') and child.name == 'div' and 'pdf-cover' in str(child.get('class', [])):
                cover_elements.append(child)

        content_articles = []
        front_cover_article = root_soup.find('article', id='doc-cover')
        back_cover_article = root_soup.find('article', id='doc-back_cover')
        for child in list(root_soup.body.contents):
            if not (hasattr(child, 'name') and child.name == 'article'):
                continue
            if child.get('id') in ('doc-toc', 'doc-cover', 'doc-back_cover'):
                continue
            content_articles.append(child)

        self.logger.info(f'Found {len(cover_elements)} cover elements, {len(content_articles)} content articles')

        temp_dir = os.path.join(config['site_dir'], 'pdf_chunks')
        os.makedirs(temp_dir, exist_ok=True)

        def chunk_html(soup) -> str:
            if self._options.relaxed_js:
                html_string = str(soup)
            else:
                html_string = self._render_js(soup)
            return self._options.hook.pre_pdf_render(html_string)

        def front_soup():
            soup = self._create_chunk_soup()
            for cover_el in cover_elements:
                soup.body.append(clone_element(cover_el))
            if front_cover_article is not None:
                soup.body.append(clone_element(front_cover_article))
            if toc_article is not None:
                soup.body.append(clone_element(toc_article))
            return soup

        chunk_files = []
        cover_toc_path = os.path.join(temp_dir, 'cover_toc.pdf')
        # Page count of the front matter is needed before the body is numbered.
        # Filling in the TOC page numbers does not change how many lines it uses.
        cover_doc = self._render_chunk_pdf(chunk_html(front_soup()), cover_toc_path, start_page=1)
        front_pages = self._page_count(cover_doc, cover_toc_path)
        self.logger.info(f'Cover+TOC measured: {front_pages} pages')

        chunk_size = 5
        chunks = []
        for i in range(0, len(content_articles), chunk_size):
            chunks.append(content_articles[i:i + chunk_size])

        self.logger.info(f'Divided {len(content_articles)} articles into {len(chunks)} chunks')

        content_paths = []
        content_anchor_at = {}
        next_printed = front_pages + 1
        local_base = 0
        for chunk_idx, chunk in enumerate(chunks):
            chunk_soup = self._create_chunk_soup()
            for article in chunk:
                chunk_soup.body.append(clone_element(article))

            chunk_path = os.path.join(temp_dir, f'chunk_{chunk_idx + 1:03d}.pdf')
            document = self._render_chunk_pdf(
                chunk_html(chunk_soup), chunk_path, start_page=next_printed)
            pages = self._page_count(document, chunk_path)
            if document is not None:
                for name, local in anchor_positions(document, local_base).items():
                    content_anchor_at.setdefault(name, local)
            content_paths.append(chunk_path)
            chunk_files.append(chunk_path)
            next_printed += pages
            local_base += pages
            self.logger.info(
                f'Chunk {chunk_idx + 1}/{len(chunks)} rendered: {pages} pages -> {chunk_path}')

        printed_pages = {
            name: front_pages + local + 1
            for name, local in content_anchor_at.items()
        }
        filled, total = fill_toc_page_numbers(toc_article, printed_pages)
        self.logger.info(f'TOC page numbers filled: {filled}/{total}')
        if total and filled == 0:
            self.logger.warning(
                'TOC entries did not match any heading anchor, so page numbers were left blank.')

        cover_doc = self._render_chunk_pdf(chunk_html(front_soup()), cover_toc_path, start_page=1)
        second_front = self._page_count(cover_doc, cover_toc_path)
        chunk_files.append(cover_toc_path)
        self.logger.info(f'Cover+TOC rendered: {second_front} pages -> {cover_toc_path}')
        if second_front != front_pages:
            self.logger.warning(
                f'Cover/TOC grew from {front_pages} to {second_front} pages after page numbers were added. '
                'Footer numbers in the body were set from the first count.')

        back_path = None
        if back_cover_article is not None:
            back_soup = self._create_chunk_soup()
            back_soup.body.append(clone_element(back_cover_article))
            back_path = os.path.join(temp_dir, 'back_cover.pdf')
            back_doc = self._render_chunk_pdf(
                chunk_html(back_soup), back_path, start_page=next_printed)
            pages = self._page_count(back_doc, back_path)
            chunk_files.append(back_path)
            self.logger.info(f'Back cover rendered: {pages} pages -> {back_path}')

        self.logger.info(f'Merging {1 + len(content_paths) + (1 if back_path else 0)} chunks into final PDF...')

        final_merger = PdfWriter()
        final_merger.append(cover_toc_path)
        toc_index = 0
        if cover_doc is not None:
            for index, page in enumerate(cover_doc.pages):
                if 'doc-toc' in page.anchors:
                    toc_index = index
                    break
        final_merger.add_outline_item(self._options.toc_title or '目录', toc_index)
        for chunk_path in content_paths:
            # append keeps each chunk's heading bookmarks and shifts them
            # onto the combined page numbers. add_page dropped those bookmarks.
            final_merger.append(chunk_path)
        if back_path is not None:
            final_merger.append(back_path)

        linked = 0
        if cover_doc is not None:
            for page_index, anchor, rect, height in internal_link_rects(cover_doc):
                local = content_anchor_at.get(anchor)
                if local is None:
                    continue
                destination = second_front + local
                annotation = AnnotationBuilder.link(
                    rect=css_rect_to_pdf(rect, height),
                    target_page_index=destination,
                )
                final_merger.add_annotation(page_index, annotation)
                linked += 1
        self.logger.info(f'TOC links added: {linked}')

        with open(abs_pdf_path, 'wb') as f:
            final_merger.write(f)

        self.logger.info(f'Final PDF saved to: {abs_pdf_path}')
        self.logger.info(f'Total pages in final PDF: {len(final_merger.pages)}')

        for chunk_file in chunk_files:
            try:
                os.remove(chunk_file)
            except:
                pass
        try:
            os.rmdir(temp_dir)
        except:
            pass

    def _remove_empty_tags(self, soup: PageElement):

        def is_blank(el):
            if len(el.get_text(strip=True)) != 0:
                return False
            elif el.find(['img', 'svg']):
                return False
            else:
                return True

        includes = ['article', 'p']
        while True:
            hit = False
            for x in soup.find_all():
                if x.name in includes and is_blank(x):
                    x.extract()
                    hit = True
            if not hit:
                break

    def _page_path_for_id(self, page):
        """ normalize to directory urls style"""

        if page.is_section:
            path = get_section_path(page)
        else:
            path = page.url

        path = '.' if not path or path == 'index.html' else path
        if path.endswith('index.html'):
            path = re.sub(r'index\.html$', '', path)
        elif path.endswith('.html'):
            path = re.sub(r'\.html$', '/', path)
        return path

    def _soup_from_content(self, content: str, page):
        soup = BeautifulSoup(content, 'html.parser')

        try:
            abs_dest_path = page.file.abs_dest_path
            src_path = page.file.src_path
        except AttributeError:
            abs_dest_path = page.abs_output_path
            src_path = page.input_path

        path = os.path.dirname(abs_dest_path)
        os.makedirs(path, exist_ok=True)
        filename = os.path.splitext(os.path.basename(src_path))[0]
        base_url = urls.path2url(os.path.join(path, filename))

        return prep_combined(soup, base_url, page.file.url)

    def _get_content(self, soup: PageElement, page):

        def shift_heading(elem, page):
            for i in range(7, 0, -1):
                while True:
                    h = elem.find(f'h{i}')
                    if not h:
                        break
                    h.name = f'h{i + 1}'

            page_path = self._page_path_for_id(page)
            h1 = soup.new_tag('h1', id=f'{page_path}')
            h1.append(str(page.title))
            elem.insert(0, h1)
            return elem

        def cleanup_class(classes):
            if classes and len(classes):
                excludes = ['md-content__inner']
                return [c for c in classes if not (c in excludes)]
            return classes

        article = getattr(page, 'pdf-article', None)
        if article:
            for heading_tag in article.find_all(re.compile('^h[1-6]$')):
                original = heading_tag.get_text()
                stripped = self._strip_heading_number(original)
                if stripped != original:
                    for child in list(heading_tag.contents):
                        child.extract()
                    heading_tag.append(stripped)

            page_path = self._page_path_for_id(page)
            article['id'] = f'{page_path}:'
            article['data-url'] = f'/{page_path}'
            
            build_time = datetime.now().strftime('%Y 年 %m 月 %d 日')
            for text_node in article.find_all(string=True):
                if '{{ BUILD_TIME }}' in text_node:
                    new_text = text_node.replace('{{ BUILD_TIME }}', build_time)
                    text_node.replace_with(new_text)
            
            return article

        elif page.children:

            new_article = soup.new_tag('article')
            found = False
            for c in page.children:
                content = self._get_content(soup, c)
                if content:
                    new_article.append(content)
                    found = True

            if not found:
                return None

            child_classes = None
            for child_article in new_article.find_all('article'):
                child_article.name = 'section'
                classes = child_article.get('class')
                if classes and not child_classes:
                    child_classes = classes
                child_article['class'] = cleanup_class(classes)

            page_path = self._page_path_for_id(page)
            new_article['id'] = f'{page_path}:'
            new_article['data-url'] = f'/{page_path}'
            if child_classes:
                new_article['class'] = child_classes

            if self._options.heading_shift:
                shifted = shift_heading(new_article, page)
                for heading_tag in shifted.find_all(re.compile('^h[1-6]$')):
                    original = heading_tag.get_text()
                    stripped = self._strip_heading_number(original)
                    if stripped != original:
                        for child in list(heading_tag.contents):
                            child.extract()
                        heading_tag.append(stripped)
                return shifted
            return new_article

        return None

    def _fix_missing_id_for_h1(self, content, page):
        h1 = content.find('h1')
        if h1 and not h1.get('id'):
            h1['id'] = self._page_path_for_id(page)

    @property
    def logger(self) -> logging:
        return self._options.logger

    def _load_theme_handler(self):
        theme = self._options.theme_name
        custom_handler_path = self._options.theme_handler_path
        module_name = '.' + (theme or 'generic').replace('-', '_')
        if custom_handler_path:
            try:
                spec = spec_from_file_location(
                    module_name, os.path.join(
                        os.getcwd(), custom_handler_path))
                mod = module_from_spec(spec)
                spec.loader.exec_module(mod)
                return mod
            except FileNotFoundError as e:
                self.logger.error(
                    f'Could not load theme handler {theme}'
                    f' from custom directory "{custom_handler_path}": {e}')
                pass

        try:
            return import_module(module_name, 'mkdocs_to_pdf.themes')
        except ImportError as e:
            self.logger.error(f'Could not load theme handler {theme}: {e}')
            return generic_theme

    def _normalize_link_anchors(self, soup):
        def normalize_anchor_chars(anchor: str):
            anchor = anchor.replace('%25', '-').replace('%', '-')
            return anchor

        for anchor in soup.find_all(id=True):
            anchor['id'] = normalize_anchor_chars(anchor['id'])
        for link in soup.find_all('a', href=True):
            link['href'] = normalize_anchor_chars(link['href'])

        if not (self._options.debug_html or self._options.show_anchors or
                self._options.strict or self._options.verbose):
            return

        from urllib.parse import urlparse

        anchors = set(map(lambda el: '#' + el['id'], soup.find_all(id=True)))

        if not (self._options.strict or self._options.debug_html):
            self.logger.info('Anchor points provided:')
            for anchor in sorted(anchors):
                self.logger.info(f'| {anchor}')
            return

        missing = set()
        for el in soup.find_all('a', href=True):
            href = el['href']
            target_url = urlparse(href)

            if target_url.scheme or target_url.netloc:
                continue
            if href in anchors:
                continue

            missing.add(href)

        if len(missing):
            self.logger.error(f'Missing {len(missing)} link(s):')
            for link in sorted(missing):
                self.logger.warning(f'  | {link}')
            if (self._options.show_anchors or
                self._options.verbose or
                    self._options.debug_html):
                self.logger.info('  | --- found anchors:')
                for anchor in sorted(anchors):
                    self.logger.info(f'  | {anchor}')

    def _render_js(self, soup):
        if not self._options.js_renderer:
            fix_twemoji(soup, self._options.logger)
            return str(soup)

        soup = self._options.hook.pre_js_render(soup)

        scripts = self._theme.get_script_sources()
        if len(scripts) > 0:
            body = soup.find('body')
            if body:
                for script in self._scraped_scripts:
                    body.append(script)
                if len(self._mixed_script) > 0:
                    tag = soup.new_tag('script')
                    tag.append(self._mixed_script)
                    body.append(tag)
                for src in scripts:
                    body.append(soup.new_tag('script', src=f'file://{src}'))

        return self._options.js_renderer.render(str(soup))

    def _scrap_scripts(self, soup):
        if not self._options.js_renderer:
            return

        scripts = soup.select('body>script')
        if not scripts:
            return

        def exists_src(src):
            for script in self._scraped_scripts:
                if src == script['src']:
                    return True
            return False

        for script in scripts:
            if script.has_attr('src'):
                src = script['src']
                if (not src
                    or not re.match(r'^http?s://', src)
                        or exists_src(src)):
                    continue
                self._scraped_scripts.append(script)
            else:
                text = script.get_text()
                if text:
                    self._mixed_script += ';' + text