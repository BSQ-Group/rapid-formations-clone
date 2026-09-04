import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { cache } from 'react'
import configPromise from '@payload-config'
import { getPayload } from 'payload'

import { Header } from '@/Header/Component'
import { NameCheckPanel } from '@/components/shared/NameCheckPanel'
import { getBrand, getDomainConfig } from '@/lib/brand'

const PACKAGE_INDEX_HREF = '/compare-packages/'

type Args = {
  params: Promise<{ pkg: string }>
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

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const packages = await payload.find({
    collection: 'packages',
    limit: 100,
    pagination: false,
    select: { slug: true },
  })

  return packages.docs.flatMap((doc) => (doc.slug ? [{ pkg: doc.slug }] : []))
}

export default async function NameCheckPage({ params }: Args) {
  const { pkg } = await params
  const selected = await queryPackageBySlug(pkg)

  // Never default to a package: that sells Basic to someone who clicked Privacy.
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

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const { pkg } = await params
  const selected = await queryPackageBySlug(pkg)
  const { siteName } = getDomainConfig(getBrand())

  return {
    title: selected?.name
      ? `${selected.name} Package - Name Check | ${siteName}`
      : `Company Name Check | ${siteName}`,
    description: selected?.name
      ? `Name Check for ${selected.name} Package.`
      : 'Check whether your company name is available.',
    // The package pages are the canonical landing pages, not this step.
    robots: { index: false, follow: true },
  }
}
