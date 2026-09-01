import React from 'react'

// One <script type="application/ld+json"> per item, mirroring how the legacy
// site emits each schema type as its own block (not a single @graph).
export function JsonLd({ items }: { items: Array<Record<string, unknown>> }) {
  if (!items?.length) return null
  return (
    <>
      {items.map((item, i) => (
        <script
          key={i}
          type="application/ld+json"
          // Escape `<` so the JSON can't break out of the <script> element.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(item).replace(/</g, '\\u003c') }}
        />
      ))}
    </>
  )
}
