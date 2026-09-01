import type { Metadata } from 'next'

import type { Media, Page, Post, Config } from '../payload-types'

import { mergeOpenGraph } from './mergeOpenGraph'
import { getServerSideURL } from './getURL'
import { getPagePath } from './getPagePath'
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

  const { siteName, twitterHandle } = getDomainConfig(getBrand())
  const slug = Array.isArray(doc?.slug) ? doc?.slug.join('/') : doc?.slug
  const metaNoindex = doc?.meta && 'noindex' in doc.meta ? Boolean(doc.meta.noindex) : false
  // `port-preview-*` are internal dev/port pages with no legacy source — always noindex
  // them (and they're excluded from the sitemap) so they can't be indexed.
  const noindex = metaNoindex || Boolean(slug?.startsWith('port-preview-'))
  // Verbatim title — the legacy <title> (seeded into meta.title) already carries any
  // brand suffix where the original uses one, so we must NOT auto-append it here.
  const title = doc?.meta?.title || doc?.title || siteName
  const description = doc?.meta?.description || undefined
  // Canonical/og:url from the nested fullPath (matches the legacy URL structure), not the flat slug.
  const path = getPagePath(doc)

  return {
    description,
    metadataBase: new URL(getServerSideURL()),
    alternates: { canonical: path },
    robots: noindex ? { index: false, follow: false } : { index: true, follow: true },
    openGraph: mergeOpenGraph({
      description: description || '',
      images: ogImage ? [{ url: ogImage }] : undefined,
      siteName,
      title,
      url: path,
    }),
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ogImage ? [ogImage] : undefined,
      ...(twitterHandle ? { site: twitterHandle, creator: twitterHandle } : {}),
    },
    title,
  }
}
