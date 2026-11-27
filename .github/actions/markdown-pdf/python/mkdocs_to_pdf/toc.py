from bs4 import PageElement, Tag

from .options import Options
from .utils.soup_util import clone_element


def _to_chinese_number(num: int) -> str:
    """将阿拉伯数字转换为中文数字"""
    chinese_nums = ['', '一', '二', '三', '四', '五', '六', '七', '八', '九']
    chinese_tens = ['', '十', '二十', '三十', '四十', '五十', '六十', '七十', '八十', '九十']
    
    if num == 0:
        return '零'
    elif 1 <= num <= 9:
        return chinese_nums[num]
    elif 10 <= num <= 19:
        if num == 10:
            return '十'
        else:
            return '十' + chinese_nums[num - 10]
    elif 20 <= num <= 99:
        tens = num // 10
        ones = num % 10
        if ones == 0:
            return chinese_tens[tens]
        else:
            return chinese_tens[tens] + chinese_nums[ones]
    elif 100 <= num <= 999:
        hundreds = num // 100
        remainder = num % 100
        result = chinese_nums[hundreds] + '百'
        if remainder == 0:
            return result
        elif remainder < 10:
            return result + '零' + chinese_nums[remainder]
        elif remainder < 20:
            if remainder == 10:
                return result + '一十'
            else:
                return result + '一十' + chinese_nums[remainder - 10]
        else:
            tens = remainder // 10
            ones = remainder % 10
            if ones == 0:
                return result + chinese_tens[tens]
            else:
                return result + chinese_tens[tens] + chinese_nums[ones]
    else:
        # 对于更大的数字，简单处理
        return str(num)


def make_indexes(soup: PageElement, options: Options) -> None:
    """ Generate ordered chapter number and TOC of document.

    Arguments:
        soup {BeautifulSoup} -- DOM object of Document.
        options {Options} -- The options of this sequence.
    """

    # Step 1: (re)ordered headings
    _inject_heading_order(soup, options)

    # Step 2: generate toc page
    level = options.toc_level
    if level < 1 or level > 6:
        return

    options.logger.info(
        f'Generate a table of contents up to heading level {level}.')

    h1li = None
    h2ul = h2li = h3ul = h4ul = h5ul = h6ul = None
    exclude_lv2 = exclude_lv3 = exclude_lv4 = exclude_lv5 = exclude_lv6 = False

    def makeLink(h: Tag) -> Tag:
        li = soup.new_tag('li')
        ref = h.get('id', '')
        a = soup.new_tag('a', href=f'#{ref}')
        for el in h.contents:
            if el.name == 'a':
                a.append(el.contents[0])
            else:
                a.append(clone_element(el))
        li.append(a)
        options.logger.debug(f"| [{h.get_text(separator=' ')}]({ref})")
        return li

    toc = soup.new_tag('article', id='doc-toc')
    title = soup.new_tag('h1')
    title.append(soup.new_string(options.toc_title))
    toc.append(title)

    h1ul = soup.new_tag('ul')
    toc.append(h1ul)

    headings = soup.find_all(['h1', 'h2', 'h3', 'h4', 'h5', 'h6'])
    for h in headings:

        if h.name == 'h1':

            h1li = makeLink(h)
            h1ul.append(h1li)
            h2ul = h2li = h3ul = h4ul = h5ul = h6ul = None

            exclude_lv2 = _is_exclude(h.get('id', None), options)

        elif not exclude_lv2 and h.name == 'h2' and level >= 2:

            if not h2ul:
                h2ul = soup.new_tag('ul')
                h1li.append(h2ul)
            h2li = makeLink(h)
            h2ul.append(h2li)
            h3ul = None

            exclude_lv3 = _is_exclude(h.get('id', None), options)

        elif not exclude_lv2 and not exclude_lv3 \
                and h.name == 'h3' and level >= 3:

            if not h2li:
                continue
            if not h3ul:
                h3ul = soup.new_tag('ul')
                h2li.append(h3ul)
            h3li = makeLink(h)
            h3ul.append(h3li)
            h4ul = None

            exclude_lv4 = _is_exclude(h.get('id', None), options)

        elif not exclude_lv3 and not exclude_lv4 \
                and h.name == 'h4' and level >= 4:

            if not h3li:
                continue
            if not h4ul:
                h4ul = soup.new_tag('ul')
                h3li.append(h4ul)
            h4li = makeLink(h)
            h4ul.append(h4li)
            h5ul = None

            exclude_lv5 = _is_exclude(h.get('id', None), options)

        elif not exclude_lv4 and not exclude_lv5 \
                and h.name == 'h5' and level >= 5:

            if not h4li:
                continue
            if not h5ul:
                h5ul = soup.new_tag('ul')
                h4li.append(h5ul)
            h5li = makeLink(h)
            h5ul.append(h5li)
            h6ul = None

            exclude_lv6 = _is_exclude(h.get('id', None), options)

        elif not exclude_lv5 and not exclude_lv6 \
                and h.name == 'h6' and level >= 6:

            if not h5li:
                continue
            if not h6ul:
                h6ul = soup.new_tag('ul')
                h5li.append(h6ul)
            h6li = makeLink(h)
            h6ul.append(h6li)

        else:
            continue
        pass

        # Decide insertion point: place TOC after '免责声明' but before '前言'
    try:
        # 寻找免责声明和前言的实际位置
        disclaimer_article = foreword_article = None
        for el in soup.body.find_all('article'):
            h1 = el.find('h1')
            if not h1:
                continue
            title_text = h1.get_text(strip=True)
            if disclaimer_article is None and '免责声明' in title_text:
                disclaimer_article = el
            # 前言匹配放宽：包含"前言"即可（兼容"前言："/"前言(说明)"等）
            if foreword_article is None and '前言' in title_text:
                foreword_article = el
            if disclaimer_article is not None and foreword_article is not None:
                break
        
        # 决定插入位置：免责声明后，前言前
        insertion_index = 0
        if disclaimer_article is not None:
            # 找到免责声明在 soup.body.contents 中的实际位置
            for i, child in enumerate(soup.body.contents):
                if child is disclaimer_article:
                    insertion_index = i + 1
                    break
        elif foreword_article is not None:
            # 如果没有免责声明但有前言，在前言前插入
            for i, child in enumerate(soup.body.contents):
                if child is foreword_article:
                    insertion_index = i
                    break
        
        soup.body.insert(insertion_index, toc)
        options.logger.info(f"Inserted TOC at position {insertion_index} (after disclaimer, before foreword).")
    except Exception as e:
        options.logger.warning(f"Fallback TOC insertion at top due to error: {e}")
        soup.body.insert(0, toc)


def _inject_heading_order(soup: Tag, options: Options):

    level = options.ordered_chapter_level
    if level < 1 or level > 6:
        return

    options.logger.info(f'Number headings up to level {level}.')

    h1n = h2n = h3n = h4n = h5n = h6n = 0
    exclude_lv2 = exclude_lv3 = exclude_lv4 = exclude_lv5 = exclude_lv6 = False
    
    # 标记是否已经过免责声明，用于控制编号起始
    passed_disclaimer = False

    headings = soup.find_all(['h1', 'h2', 'h3', 'h4', 'h5', 'h6'])
    for h in headings:

        if h.name == 'h1':
            # 检查是否为免责声明或前言 (支持中英文)
            title_text = h.get_text(strip=True)
            is_disclaimer = ('免责声明' in title_text) or ('Disclaimer' in title_text)
            is_preface = ('前言' in title_text) or ('Preface' in title_text) or ('Prologue' in title_text)
            
            if is_disclaimer or is_preface:
                # 免责声明/前言不计入编号，但标记已经过免责声明(开始正文计数准备)
                passed_disclaimer = True
                prefix = ''
                exclude_lv2 = True  # 下级子标题也不编号
                options.logger.debug(f"| [免责/前言 (无编号)] {title_text} ({h.get('id', '(none)')})")
            else:
                # 正常标题，如果还没过免责声明则从1开始，否则继续编号
                if not passed_disclaimer:
                    # 第一个非免责声明的h1从1开始
                    h1n = 1
                    passed_disclaimer = True
                else:
                    h1n += 1
                
                h2n = h3n = h4n = h5n = h6n = 0
                if getattr(options, 'locale', 'zh') == 'en':
                    prefix = f'{h1n}. '
                else:
                    prefix = f'{_to_chinese_number(h1n)}、'
                exclude_lv2 = _is_exclude(h.get('id', None), options)

        elif not exclude_lv2 and h.name == 'h2' and level >= 2:

            h2n += 1
            h3n = h4n = h5n = h6n = 0
            prefix = f'{h1n}.{h2n} '

            exclude_lv3 = _is_exclude(h.get('id', None), options)

        elif not exclude_lv2 and not exclude_lv3 \
                and h.name == 'h3' and level >= 3:

            h3n += 1
            h4n = h5n = h6n = 0
            prefix = f'{h1n}.{h2n}.{h3n} '

            exclude_lv4 = _is_exclude(h.get('id', None), options)

        elif not exclude_lv3 and not exclude_lv4 \
                and h.name == 'h4' and level >= 4:

            h4n += 1
            h5n = h6n = 0
            prefix = f'{h1n}.{h2n}.{h3n}.{h4n} '

            exclude_lv5 = _is_exclude(h.get('id', None), options)

        elif not exclude_lv4 and not exclude_lv5 \
                and h.name == 'h5' and level >= 5:

            h6n = 0
            h5n += 1
            prefix = f'{h1n}.{h2n}.{h3n}.{h4n}.{h5n} '

            exclude_lv6 = _is_exclude(h.get('id', None), options)

        elif not exclude_lv5 and not exclude_lv6 \
                and h.name == 'h6' and level >= 6:

            h6n += 1
            prefix = f'{h1n}.{h2n}.{h3n}.{h4n}.{h5n}.{h6n} '

        else:
            continue

        # 只有非空的prefix才添加编号标签
        if prefix.strip():
            options.logger.debug(f"| [{prefix} {h.text}]({h.get('id', '(none)')})")
            nm_tag = soup.new_tag('span', **{'class': 'pdf-order'})
            nm_tag.append(prefix)
            h.insert(0, nm_tag)
        else:
            # 免责声明等无编号标题的调试日志已在上面输出
            pass


def _is_exclude(url: str, options: Options) -> bool:
    if not url:
        return False

    if url in options.excludes_children:
        options.logger.info(f"|  (exclude '{url}')")
        return True

    return False