// Lightweight sanitizer for user-generated HTML content.
// Strips disallowed tags/attributes to prevent XSS.

const ALLOWED_TAGS = new Set(['b','i','em','strong','u','p','br','ul','ol','li','span','a','code','pre']);
const ALLOWED_ATTRS = new Set(['href','title','target','rel','class']);

function isSafeUrl(url) {
  try {
    const u = new URL(url, typeof window !== 'undefined' ? window.location.origin : 'http://localhost');
    return ['http:', 'https:'].includes(u.protocol);
  } catch {
    return false;
  }
}

export function sanitizeHtml(input) {
  if (typeof input !== 'string') return '';
  const doc = (typeof window !== 'undefined' && window.DOMParser)
    ? new DOMParser().parseFromString(input, 'text/html')
    : null;
  if (!doc) return '';

  const walk = (node) => {
    if (node.nodeType === Node.ELEMENT_NODE) {
      const tag = node.tagName.toLowerCase();
      if (!ALLOWED_TAGS.has(tag)) {
        node.replaceWith(...Array.from(node.childNodes));
        return;
      }
      // sanitize attributes
      for (const attr of Array.from(node.attributes)) {
        const name = attr.name.toLowerCase();
        if (!ALLOWED_ATTRS.has(name)) {
          node.removeAttribute(attr.name);
        } else if (name === 'href') {
          const val = node.getAttribute('href');
          if (!isSafeUrl(val)) node.removeAttribute('href');
          else node.setAttribute('rel', 'noopener noreferrer');
        } else if (name === 'target') {
          const val = node.getAttribute('target');
          if (val !== '_blank') node.removeAttribute('target');
        }
      }
    }
    for (const child of Array.from(node.childNodes)) walk(child);
  };

  walk(doc.body);
  return doc.body.innerHTML;
}
