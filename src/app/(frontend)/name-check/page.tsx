/**
 * The single name-check step page — `/name-check/?pkg=<slug>`.
 *
 * Replaced the seven `/name-check-<pkg>-package/` pages (CORE-7284), which were one
 * template differing only in heading label and checkout path. `redirects.ts` 301s
 * every legacy URL onto this route, so inbound links and bookmarks still work.
 *
 * Package identity comes from the Packages collection rather than a code table, so
 * the name, slug and checkout path an editor maintains for the compare grids are the
 * same ones this page sells against.
 */

import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { cache } from 'react'
import configPromise from '@payload-config'
import { getPayload } from 'payload'

import { Header } from '@/Header/Component'
import { NameCheckPanel } from '@/components/shared/NameCheckPanel'
import { getBrand, getDomainConfig } from '@/lib/brand'

/** Where an unknown or missing `pkg` goes: choose a package, don't guess one. */
const PACKAGE_INDEX_HREF = '/compare-packages/'

type Args = {
  searchParams: Promise<{ pkg?: string }>
}

const queryPackageBySlug = cache(async (slug: string) => {
  const payload = await getPayload({ config: configPromise })
  const result = await payload.find({
    collection: 'packages',
    limit: 1,
    pagination: false,
    where: { slug: { equals: slug } },
    select: { name: true, checkoutPath: true },
  })

  return result.docs?.[0] ?? null
})

export default async function NameCheckPage({ searchParams }: Args) {
  const { pkg } = await searchParams
  const selected = pkg ? await queryPackageBySlug(pkg) : null

  // No package, or one we don't sell. Defaulting to a named package would silently
  // sell Basic to someone who clicked Privacy, and a mis-sell beats an extra click.
  if (!selected?.name || !selected.checkoutPath) {
    redirect(PACKAGE_INDEX_HREF)
  }

  return (
    <>
      <Header />
      <main className="min-[1023px]:pb-5">
        <NameCheckPanel packageName={selected.name} checkoutPath={selected.checkoutPath} />
      </main>
    </>
  )
}

export async function generateMetadata({ searchParams }: Args): Promise<Metadata> {
  const { pkg } = await searchParams
  const selected = pkg ? await queryPackageBySlug(pkg) : null
  const { siteName } = getDomainConfig(getBrand())

  return {
    title: selected?.name
      ? `${selected.name} Package - Name Check | ${siteName}`
      : `Company Name Check | ${siteName}`,
    description: selected?.name
      ? `Name Check for ${selected.name} Package.`
      : 'Check whether your company name is available.',
    // One page serving seven packages off a query param is not a canonical landing
    // page — the package pages are. Matches the seven pages it replaced, which were
    // noindex on both this site and the legacy one.
    robots: { index: false, follow: true },
  }
}
