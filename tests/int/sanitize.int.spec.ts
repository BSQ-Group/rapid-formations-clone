import { describe, expect, it } from 'vitest'
import { sanitizeHtml } from '@/components/shared/Text/sanitize'

describe('sanitizeHtml — tag allowlist', () => {
  it('preserves allowed inline tags verbatim', () => {
    expect(sanitizeHtml('<strong>bold</strong>')).toBe('<strong>bold</strong>')
    expect(sanitizeHtml('<em>a</em> and <i>b</i>')).toBe('<em>a</em> and <i>b</i>')
    expect(sanitizeHtml('<blockquote>q</blockquote>')).toBe('<blockquote>q</blockquote>')
  })

  it('preserves allowed list tags', () => {
    expect(sanitizeHtml('<ul><li>a</li><li>b</li></ul>')).toBe('<ul><li>a</li><li>b</li></ul>')
    expect(sanitizeHtml('<ol><li>x</li></ol>')).toBe('<ol><li>x</li></ol>')
  })

  it('self-closes void tags', () => {
    expect(sanitizeHtml('a<br>b<hr>c')).toBe('a<br/>b<hr/>c')
  })

  it('escapes disallowed tags as literal text', () => {
    expect(sanitizeHtml('<script>alert(1)</script>')).toBe(
      '&lt;script&gt;alert(1)&lt;/script&gt;',
    )
    expect(sanitizeHtml('<img onerror="x" src="y">')).toBe(
      '&lt;img onerror=&quot;x&quot; src=&quot;y&quot;&gt;',
    )
    expect(sanitizeHtml('<style>body{}</style>')).toBe('&lt;style&gt;body{}&lt;/style&gt;')
  })
})

describe('sanitizeHtml — attribute allowlist', () => {
  it('keeps allowed attrs on <a>', () => {
    expect(sanitizeHtml('<a href="https://ex.com" target="_blank" rel="noopener" class="x">k</a>')).toBe(
      '<a href="https://ex.com" target="_blank" rel="noopener" class="x">k</a>',
    )
  })

  it('drops disallowed attrs', () => {
    expect(sanitizeHtml('<strong onclick="evil()">t</strong>')).toBe('<strong>t</strong>')
    expect(sanitizeHtml('<span style="color:red" class="k">x</span>')).toBe(
      '<span class="k">x</span>',
    )
  })

  it('drops non-safe href schemes', () => {
    expect(sanitizeHtml('<a href="javascript:alert(1)">x</a>')).toBe('<a>x</a>')
    expect(sanitizeHtml('<a href="data:text/html,x">x</a>')).toBe('<a>x</a>')
    expect(sanitizeHtml('<a href="vbscript:x">x</a>')).toBe('<a>x</a>')
  })

  it('strips newline-bypass javascript: hrefs', () => {
    expect(sanitizeHtml('<a href="java\nscript:alert(1)">x</a>')).toBe('<a>x</a>')
    expect(sanitizeHtml('<a href="\tjavascript:x">x</a>')).toBe('<a>x</a>')
  })

  it('allows safe schemes and relative urls', () => {
    expect(sanitizeHtml('<a href="http://x.com">h</a>')).toBe('<a href="http://x.com">h</a>')
    expect(sanitizeHtml('<a href="https://x.com">h</a>')).toBe('<a href="https://x.com">h</a>')
    expect(sanitizeHtml('<a href="mailto:a@b.com">m</a>')).toBe('<a href="mailto:a@b.com">m</a>')
    expect(sanitizeHtml('<a href="tel:+441234">t</a>')).toBe('<a href="tel:+441234">t</a>')
    expect(sanitizeHtml('<a href="/foo">r</a>')).toBe('<a href="/foo">r</a>')
    expect(sanitizeHtml('<a href="#top">f</a>')).toBe('<a href="#top">f</a>')
    expect(sanitizeHtml('<a href="?q=1">q</a>')).toBe('<a href="?q=1">q</a>')
  })
})

describe('sanitizeHtml — entity decoding', () => {
  it('decodes named entities listed in NAMED_ENTITIES', () => {
    expect(sanitizeHtml('A&mdash;B')).toBe('A—B')
    expect(sanitizeHtml('wait&hellip;now')).toBe('wait…now')
    expect(sanitizeHtml('&copy; 2026')).toBe('© 2026')
  })

  it('maps &nbsp; to U+00A0 (non-breaking space, not ASCII space)', () => {
    expect(sanitizeHtml('A&nbsp;B')).toBe('A B')
    expect(sanitizeHtml('&#160;')).toBe(' ')
  })

  it('preserves unknown HTML5 entities for browser-native decoding', () => {
    // These aren't in our NAMED_ENTITIES map. Output must leave them intact so
    // the browser decodes on render. Regression test: previous code double-
    // escaped the & and rendered "&pound;" as literal text.
    expect(sanitizeHtml('&pound;10')).toBe('&pound;10')
    expect(sanitizeHtml('&euro;50')).toBe('&euro;50')
    expect(sanitizeHtml('1 &times; 2')).toBe('1 &times; 2')
    expect(sanitizeHtml('a &bull; b')).toBe('a &bull; b')
  })

  it('decodes numeric and hex entities', () => {
    expect(sanitizeHtml('A&#8212;B')).toBe('A—B')
    expect(sanitizeHtml('A&#x2014;B')).toBe('A—B')
  })

  it('guards String.fromCodePoint against out-of-range values', () => {
    // Regression test: &#1114112; (0x110000) and &#x110000; exceed the Unicode
    // range and would crash via RangeError without the guard.
    expect(() => sanitizeHtml('x&#1114112;y')).not.toThrow()
    expect(() => sanitizeHtml('x&#x110000;y')).not.toThrow()
    expect(() => sanitizeHtml('x&#x7FFFFFFF;y')).not.toThrow()
    // Out-of-range entities pass through untouched (browser handles the render)
    expect(sanitizeHtml('x&#1114112;y')).toBe('x&#1114112;y')
  })

  it('escapes bare ampersands that are not entity-shaped', () => {
    expect(sanitizeHtml('a & b')).toBe('a &amp; b')
    expect(sanitizeHtml('AT&T')).toBe('AT&amp;T')
    expect(sanitizeHtml('&')).toBe('&amp;')
  })

  it('round-trips pre-encoded entities back to single-level escape', () => {
    // Previous bug: &amp; became &amp;amp;, &lt; became &amp;lt;
    expect(sanitizeHtml('Acme &amp; Co')).toBe('Acme &amp; Co')
    expect(sanitizeHtml('&lt;b&gt; text')).toBe('&lt;b&gt; text')
  })

  it('handles hex-encoded <script> safely (defence-in-depth)', () => {
    // Decoded to <script>...</script>, then sanitized as disallowed tag.
    expect(sanitizeHtml('&#x3C;script&#x3E;alert(1)&#x3C;/script&#x3E;')).toBe(
      '&lt;script&gt;alert(1)&lt;/script&gt;',
    )
  })
})

describe('sanitizeHtml — attribute values', () => {
  it('round-trips pre-encoded & in attrs', () => {
    expect(sanitizeHtml('<a href="/x?a=1&amp;b=2">q</a>')).toBe(
      '<a href="/x?a=1&amp;b=2">q</a>',
    )
  })

  it('escapes bare & in attr values', () => {
    expect(sanitizeHtml('<a href="/x?a=1&b=2">q</a>')).toBe(
      '<a href="/x?a=1&amp;b=2">q</a>',
    )
  })

  it('quote-escapes attr values', () => {
    expect(sanitizeHtml('<a href="/x" class="a&quot;b">q</a>')).toBe(
      '<a href="/x" class="a&quot;b">q</a>',
    )
  })
})

describe('sanitizeHtml — plain text', () => {
  it('passes through normal text', () => {
    expect(sanitizeHtml('hello world')).toBe('hello world')
    expect(sanitizeHtml('')).toBe('')
  })

  it('escapes bare < and >', () => {
    expect(sanitizeHtml('5 < 3')).toBe('5 &lt; 3')
    expect(sanitizeHtml('a > b')).toBe('a &gt; b')
  })

  it('preserves nested allowed tags around entities', () => {
    expect(sanitizeHtml('<strong>A&nbsp;B</strong>')).toBe('<strong>A B</strong>')
    expect(sanitizeHtml('<em>Acme &amp; Co</em>')).toBe('<em>Acme &amp; Co</em>')
  })
})
