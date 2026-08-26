import type { Metadata } from 'next'
import { getServerSideURL } from './getURL'
import { getDomainConfig } from '@/lib/brand'

const brand = getDomainConfig()

const defaultOpenGraph: Metadata['openGraph'] = {
  type: 'website',
  images: [
    {
      url: `${getServerSideURL()}${brand.logoPath}`,
    },
  ],
  siteName: brand.siteName,
  title: brand.siteName,
}

export const mergeOpenGraph = (og?: Metadata['openGraph']): Metadata['openGraph'] => {
  return {
    ...defaultOpenGraph,
    ...og,
    images: og?.images ? og.images : defaultOpenGraph.images,
  }
}
