// @vitest-environment node
import { describe, expect, it } from 'vitest'
import { createElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import Text from '@/components/shared/Text'
import { decodeEntities, sanitizeHtml } from '@/components/shared/Text/sanitize'

const CORPUS = [
  'Director Appointment & Resignation',
  'A &amp; B',
  'AT&T',
  '&pound;10 &amp; &lt;b&gt;',
  '<a class="x" href="/y?a=1&b=2">z</a>',
  '<strong>A&nbsp;B</strong>',
  '<script>alert(1)</script>',
  '<img src=x onerror=alert(1)>',
  '<div onclick="alert(1)">x</div>',
  '&nbsp;&#39;&reg;&#x27;',
]

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

describe('sanitizeHtml — single-escape correctness (nav double-escape regression)', () => {
  it('escapes a bare & exactly once', () => {
    const out = sanitizeHtml('Director Appointment & Resignation')
    expect(out).toBe('Director Appointment &amp; Resignation')
    expect(out).not.toContain('&amp;amp;')
  })

  it('leaves an already-escaped & at exactly one level', () => {
    const out = sanitizeHtml('A &amp; B')
    expect(out).toBe('A &amp; B')
    expect(out).not.toContain('&amp;amp;')
  })

  it('preserves an anchor with class and href', () => {
    expect(sanitizeHtml('<a class="x" href="/y">z</a>')).toBe('<a class="x" href="/y">z</a>')
  })

  it('preserves named, numeric and hex entities', () => {
    expect(sanitizeHtml('&nbsp;')).toBe(' ')
    expect(sanitizeHtml('&#39;')).toBe('&#39;')
    expect(sanitizeHtml('&#x27;')).toBe('&#39;')
    expect(sanitizeHtml('&reg;')).toBe('®')
  })

  it('is idempotent — re-sanitising never adds an escape level', () => {
    for (const input of CORPUS) {
      const once = sanitizeHtml(input)
      expect(sanitizeHtml(once), `not idempotent for ${JSON.stringify(input)}`).toBe(once)
    }
  })
})

describe('sanitizeHtml — safety', () => {
  it('neutralises script injection', () => {
    expect(sanitizeHtml('<script>alert(1)</script>')).toBe('&lt;script&gt;alert(1)&lt;/script&gt;')
  })

  it('neutralises event-handler attributes on unknown tags', () => {
    expect(sanitizeHtml('<img src=x onerror=alert(1)>')).toBe('&lt;img src=x onerror=alert(1)&gt;')
    expect(sanitizeHtml('<div onclick="alert(1)">x</div>')).toBe(
      '&lt;div onclick=&quot;alert(1)&quot;&gt;x&lt;/div&gt;',
    )
  })

  it('strips event-handler attributes from allowed tags', () => {
    expect(sanitizeHtml('<a href="/x" onclick="alert(1)">k</a>')).toBe('<a href="/x">k</a>')
  })

  it('drops javascript: hrefs', () => {
    expect(sanitizeHtml('<a href="javascript:alert(1)">x</a>')).toBe('<a>x</a>')
  })

  it('neutralises unclosed tags', () => {
    expect(sanitizeHtml('<script>alert(1)')).toBe('&lt;script&gt;alert(1)')
    expect(sanitizeHtml('<a href="/x"')).toBe('&lt;a href=&quot;/x&quot;')
    expect(sanitizeHtml('<img src=x onerror=alert(1)')).toBe('&lt;img src=x onerror=alert(1)')
  })

  it('neutralises style blocks', () => {
    expect(sanitizeHtml('<style>body{background:url(javascript:alert(1))}</style>')).toBe(
      '&lt;style&gt;body{background:url(javascript:alert(1))}&lt;/style&gt;',
    )
  })

  it('never emits a live tag or handler for any dangerous input', () => {
    const dangerous = [
      '<script>alert(1)</script>',
      '<img src=x onerror=alert(1)>',
      '<div onclick="alert(1)">x</div>',
      '<style>body{}</style>',
      '<iframe src="javascript:alert(1)"></iframe>',
      '<svg/onload=alert(1)>',
      '<script>alert(1)',
      '<a href="/x" onclick="alert(1)">k</a>',
      '<a href="javascript:alert(1)">x</a>',
    ]
    for (const input of dangerous) {
      const out = sanitizeHtml(input)
      for (const tag of out.match(/<[^>]*>/g) || []) {
        expect(tag, input).not.toMatch(/^<\/?(script|img|div|style|iframe|svg|object|embed)\b/i)
        expect(tag, input).not.toMatch(/\bon[a-z]+\s*=/i)
        expect(tag, input).not.toMatch(/javascript:/i)
      }
    }
  })
})

describe('Text — icons path must not double-escape', () => {
  const render = (text: string, withIcon: boolean) =>
    renderToStaticMarkup(
      createElement(Text, {
        text,
        ...(withIcon ? { icons: { iconBefore: createElement('i', { key: 'i' }) } } : {}),
      }),
    )

  it('renders a bare & once whether or not an icon is present', () => {
    const label = 'Director Appointment & Resignation'
    expect(render(label, true)).toContain('Director Appointment &amp; Resignation')
    expect(render(label, true)).not.toContain('&amp;amp;')
    expect(render(label, false)).toContain('Director Appointment &amp; Resignation')
  })

  it('renders an already-escaped & once whether or not an icon is present', () => {
    expect(render('A &amp; B', true)).toContain('A &amp; B')
    expect(render('A &amp; B', true)).not.toContain('&amp;amp;')
    expect(render('A &amp; B', false)).toContain('A &amp; B')
  })

  it('produces the same text for the icon and no-icon paths', () => {
    const textOf = (html: string) => decodeEntities(html.replace(/<[^>]*>/g, ''))
    for (const label of ['Acme & Co', 'A &amp; B', '5 < 3', 'x &#39; y', 'AT&T']) {
      expect(textOf(render(label, true)), label).toBe(textOf(render(label, false)))
    }
  })

  it('still neutralises injection on the icons path', () => {
    for (const payload of [
      '<script>alert(1)</script>',
      '<img src=x onerror=alert(1)>',
      '<div onclick="alert(1)">x</div>',
      '<style>body{}</style>',
    ]) {
      const out = render(payload, true)
      for (const tag of out.match(/<[^>]*>/g) || []) {
        expect(tag, payload).not.toMatch(/^<\/?(script|img|div|style)\b/i)
        expect(tag, payload).not.toMatch(/\bon[a-z]+\s*=/i)
      }
    }
  })
})
