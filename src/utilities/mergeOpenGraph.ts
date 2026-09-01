import type { Metadata } from 'next'
import { getServerSideURL } from './getURL'
import { getBrand, getDomainConfig } from '@/lib/brand'

const brand = getDomainConfig(getBrand())

const defaultOpenGraph: Metadata['openGraph'] = {
  type: 'website',
  ...(brand.locale ? { locale: brand.locale } : {}),
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
