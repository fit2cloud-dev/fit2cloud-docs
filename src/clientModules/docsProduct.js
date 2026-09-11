const DE_CAPTION_RE = /^(图|表)\s+\d+/;

function setDocsProduct(pathname) {
  const p = pathname || (typeof window !== 'undefined' ? window.location.pathname : '');
  let product = '';
  if (p.includes('/jumpserver')) {
    product = 'jumpserver';
  } else if (p.includes('/sqlbot')) {
    product = 'sqlbot';
  } else if (p.includes('/1panel')) {
    product = '1panel';
  } else if (p.includes('/dataease')) {
    product = 'dataease';
  } else if (p.includes('/cordys')) {
    product = 'cordys';
  }
  if (typeof document === 'undefined') {
    return;
  }
  if (product) {
    document.documentElement.dataset.docsProduct = product;
  } else {
    delete document.documentElement.dataset.docsProduct;
  }
}

function setDocsSection(pathname) {
  const p = pathname || (typeof window !== 'undefined' ? window.location.pathname : '');
  if (typeof document === 'undefined') {
    return;
  }
  let section = '';
  if (/\/jumpserver\/installation(\/|$)/.test(p)) {
    section = 'installation';
  } else if (/\/jumpserver\/manual\/env(\/|$)/.test(p)) {
    section = 'env';
  }
  if (section) {
    document.documentElement.dataset.docsSection = section;
  } else {
    delete document.documentElement.dataset.docsSection;
  }
}

function markDeCaptions() {
  if (typeof document === 'undefined') {
    return;
  }
  if (document.documentElement.dataset.docsProduct !== 'dataease') {
    return;
  }
  document.querySelectorAll('.theme-doc-markdown p').forEach((p) => {
    if (p.childElementCount !== 0) {
      return;
    }
    const text = (p.textContent || '').trim();
    if (DE_CAPTION_RE.test(text)) {
      p.classList.add('de-caption');
    }
  });
}

export function onRouteDidUpdate({location}) {
  setDocsProduct(location.pathname);
  setDocsSection(location.pathname);
  markDeCaptions();
  if (typeof requestAnimationFrame === 'function') {
    requestAnimationFrame(markDeCaptions);
  }
}

setDocsProduct();
setDocsSection();
markDeCaptions();