"""Page numbers, table-of-contents entries, and link rectangles.

Content is rendered in separate PDF chunks. These helpers keep the printed
page numbers continuous and record where each heading landed, so the
table of contents can show a page number and jump to that page.
"""


def page_start_css(start_page: int) -> str:
    """CSS that makes the first page of a chunk display ``start_page``.

    WeasyPrint skips its usual ``counter-increment: page`` when the page
    counter is reset, and the reset value is what gets printed. Later pages
    increment from there. Page 1 needs no rule.
    """
    if start_page <= 1:
        return ''
    return f'@page :first {{ counter-reset: page {int(start_page)}; }}'


def inject_style(html: str, css: str) -> str:
    if not css:
        return html
    tag = f'<style>{css}</style>'
    marker = '</head>'
    index = html.lower().find(marker)
    if index == -1:
        return tag + html
    return html[:index] + tag + html[index:]


def anchor_positions(document, content_offset: int) -> dict:
    """Map anchor ids to a 0-based index within the content chunks."""
    found = {}
    for index, page in enumerate(document.pages):
        absolute = content_offset + index
        for name in page.anchors:
            found.setdefault(name, absolute)
    return found


def internal_link_rects(document):
    """Internal links as ``(page_index, anchor, rect, page_height)``."""
    items = []
    for index, page in enumerate(document.pages):
        for link in page.links:
            link_type, target, rect = link[0], link[1], link[2]
            if link_type != 'internal' or not target:
                continue
            anchor = target.split('#', 1)[1] if '#' in target else target
            if not anchor:
                continue
            items.append((index, anchor, rect, page.height))
    return items


def css_rect_to_pdf(rect, page_height_css, scale=72 / 96):
    """Convert a top-left CSS-pixel rectangle to a PDF point rectangle."""
    x, y, width, height = rect
    return (
        x * scale,
        (page_height_css - (y + height)) * scale,
        (x + width) * scale,
        (page_height_css - y) * scale,
    )


def _new_tag(node, name, class_name):
    root = node
    while getattr(root, 'parent', None) is not None:
        root = root.parent
    if hasattr(root, 'new_tag'):
        return root.new_tag(name, attrs={'class': class_name})
    from bs4 import BeautifulSoup
    return BeautifulSoup('', 'html.parser').new_tag(
        name, attrs={'class': class_name})


def fill_toc_page_numbers(toc_article, anchor_to_page: dict) -> tuple:
    """Write the printed page number into each TOC link.

    ``anchor_to_page`` maps a heading id to a 1-based page number.
    Returns ``(filled, total)``.
    """
    if toc_article is None:
        return 0, 0
    filled = 0
    total = 0
    for link in toc_article.find_all('a', href=True):
        href = link.get('href') or ''
        if not href.startswith('#'):
            continue
        total += 1
        for old in link.find_all('span', class_='pdf-toc-page'):
            old.decompose()
        page_no = anchor_to_page.get(href[1:])
        if page_no is None:
            continue
        span = _new_tag(link, 'span', 'pdf-toc-page')
        span.string = str(page_no)
        link.append(span)
        filled += 1
    return filled, total
