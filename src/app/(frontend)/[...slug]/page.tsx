import type { Metadata } from 'next'

import { PayloadRedirects } from '@/components/PayloadRedirects'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { draftMode } from 'next/headers'
import { cache } from 'react'

import { RenderBlocks } from '@/blocks/RenderBlocks'
import { RenderHero } from '@/heros/RenderHero'
import { generateMeta } from '@/utilities/generateMeta'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import { Header } from '@/Header/Component'
import { TrustPilotBannerBlock } from '@/blocks/TrustPilotBanner/Component'
import type { TrustPilotBannerBlock as TrustPilotBannerBlockType } from '@/payload-types'

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const pages = await payload.find({
    collection: 'pages',
    draft: false,
    limit: 1000,
    overrideAccess: false,
    pagination: false,
    select: {
      slug: true,
      breadcrumbs: true,
    },
  })

  return pages.docs
    .filter((doc) => doc.slug !== 'home')
    .map((doc) => {
      const breadcrumbs = doc.breadcrumbs as Array<{ url: string }> | undefined
      const url = breadcrumbs?.at(-1)?.url ?? `/${doc.slug}`
      const segments = url.replace(/^\//, '').split('/').filter(Boolean)
      return { slug: segments }
    })
}

type Args = {
  params: Promise<{
    slug?: string[]
  }>
}

export default async function Page({ params: paramsPromise }: Args) {
  const { isEnabled: draft } = await draftMode()
  const { slug } = await paramsPromise
  const segments = slug ?? ['home']
  const url = '/' + segments.join('/')

  const page = await queryPageByUrl({ url, draft })

  if (!page) {
    return <PayloadRedirects url={url} />
  }

  const { hero, layout, isHeaderOnDark } = page

  const blocks = layout ?? []
  const firstBlock = blocks[0]
  const hasBanner = firstBlock?.blockType === 'trustpilotBanner'
  const remainingBlocks = hasBanner ? blocks.slice(1) : blocks

  return (
    <>
      {isHeaderOnDark && (
        <style>{`:root{--header-logo-fill:rgb(var(--white));--header-link-color:var(--text-inverse-muted);--header-link-hover-color:var(--text-inverse)}`}</style>
      )}
      {hasBanner && <TrustPilotBannerBlock {...(firstBlock as TrustPilotBannerBlockType)} />}
      <Header onDark={Boolean(isHeaderOnDark)} />
      <main>
        <PayloadRedirects disableNotFound url={url} />
        {draft && <LivePreviewListener />}
        <RenderHero {...hero} />
        <RenderBlocks blocks={remainingBlocks} />
      </main>
    </>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { isEnabled: draft } = await draftMode()
  const { slug } = await paramsPromise
  const segments = slug ?? ['home']
  const url = '/' + segments.join('/')
  const page = await queryPageByUrl({ url, draft })

  return generateMeta({ doc: page })
}

const queryPageByUrl = cache(async ({ url, draft }: { url: string; draft: boolean }) => {
  const payload = await getPayload({ config: configPromise })

  let result = await payload.find({
    collection: 'pages',
    draft,
    limit: 1,
    pagination: false,
    overrideAccess: draft,
    where: {
      fullPath: { equals: url },
    },
  })

  if (!result.docs?.length) {
    const slug = url.split('/').filter(Boolean).pop() ?? ''
    result = await payload.find({
      collection: 'pages',
      draft,
      limit: 1,
      pagination: false,
      overrideAccess: draft,
      where: {
        slug: { equals: slug },
      },
    })
  }

  return result.docs?.[0] || null
})
