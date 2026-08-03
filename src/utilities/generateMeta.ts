import type { Metadata } from 'next'

import type { Media, Page, Post, Config } from '../payload-types'

import { mergeOpenGraph } from './mergeOpenGraph'
import { getServerSideURL } from './getURL'
import { getBrand, getDomainConfig } from '@/lib/brand'

const getImageURL = (image?: Media | Config['db']['defaultIDType'] | null) => {
  const serverUrl = getServerSideURL()

  let url = serverUrl + getDomainConfig(getBrand()).logoPath

  if (image && typeof image === 'object' && 'url' in image) {
    const ogUrl = image.sizes?.og?.url

    url = ogUrl ? serverUrl + ogUrl : serverUrl + image.url
  }

  return url
}

export const generateMeta = async (args: {
  doc: Partial<Page> | Partial<Post> | null
}): Promise<Metadata> => {
  const { doc } = args

  const ogImage = getImageURL(doc?.meta?.image)

  const { siteName } = getDomainConfig(getBrand())
  const title = doc?.meta?.title ? `${doc.meta.title} | ${siteName}` : siteName
  const slug = Array.isArray(doc?.slug) ? doc?.slug.join('/') : doc?.slug
  const path = !slug || slug === 'home' ? '/' : `/${slug}`

  return {
    description: doc?.meta?.description,
    metadataBase: new URL(getServerSideURL()),
    alternates: { canonical: path },
    robots: { index: true, follow: true },
    openGraph: mergeOpenGraph({
      description: doc?.meta?.description || '',
      images: ogImage
        ? [
            {
              url: ogImage,
            },
          ]
        : undefined,
      siteName,
      title,
      url: path,
    }),
    title,
  }
}
