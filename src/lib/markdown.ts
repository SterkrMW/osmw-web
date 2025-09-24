import DOMPurify from 'dompurify';

// Safe markdown-like parser that sanitizes all output
export function parseMarkdownSafe(content: string): string {
  if (typeof window === 'undefined') {
    // Server-side fallback - just escape HTML
    return content
      .split('\n')
      .map(line => {
        const escaped = line
          .replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')
          .replace(/"/g, '&quot;')
          .replace(/'/g, '&#x27;');
          
        if (line.startsWith('# ')) {
          return `<h1 class="text-2xl font-bold text-cyan-300 mt-8 mb-4 first:mt-0">${escaped.slice(2)}</h1>`;
        } else if (line.startsWith('## ')) {
          return `<h2 class="text-xl font-bold text-cyan-400 mt-6 mb-3">${escaped.slice(3)}</h2>`;
        } else if (line.startsWith('### ')) {
          return `<h3 class="text-lg font-semibold text-teal-300 mt-4 mb-2">${escaped.slice(4)}</h3>`;
        } else if (line.startsWith('**') && line.endsWith('**') && line.length > 4) {
          return `<div class="font-bold text-cyan-300 mt-3 mb-1">${escaped.slice(2, -2)}</div>`;
        } else if (line.startsWith('- ')) {
          return `<li class="ml-6 mb-1">${escaped.slice(2)}</li>`;
        } else if (line.trim() === '') {
          return '<br>';
        } else {
          return `<p class="mb-3">${escaped}</p>`;
        }
      })
      .join('');
  }

  // Client-side with DOMPurify sanitization
  const html = content
    .split('\n')
    .map(line => {
      if (line.startsWith('# ')) {
        return `<h1 class="text-2xl font-bold text-cyan-300 mt-8 mb-4 first:mt-0">${line.slice(2)}</h1>`;
      } else if (line.startsWith('## ')) {
        return `<h2 class="text-xl font-bold text-cyan-400 mt-6 mb-3">${line.slice(3)}</h2>`;
      } else if (line.startsWith('### ')) {
        return `<h3 class="text-lg font-semibold text-teal-300 mt-4 mb-2">${line.slice(4)}</h3>`;
      } else if (line.startsWith('**') && line.endsWith('**') && line.length > 4) {
        return `<div class="font-bold text-cyan-300 mt-3 mb-1">${line.slice(2, -2)}</div>`;
      } else if (line.startsWith('- ')) {
        return `<li class="ml-6 mb-1">${line.slice(2)}</li>`;
      } else if (line.trim() === '') {
        return '<br>';
      } else {
        return `<p class="mb-3">${line}</p>`;
      }
    })
    .join('');

  // Sanitize the HTML to prevent XSS
  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS: ['h1', 'h2', 'h3', 'p', 'li', 'br', 'div', 'strong', 'em'],
    ALLOWED_ATTR: ['class'],
    KEEP_CONTENT: true
  });
}