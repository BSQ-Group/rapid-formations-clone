import React from 'react'

export const JsonLd: React.FC<{ data: Record<string, unknown>[] }> = ({ data }) => {
  if (!data.length) return null

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data.length === 1 ? data[0] : { '@context': 'https://schema.org', '@graph': data }),
      }}
    />
  )
}

export default JsonLd
