import React from 'react'
import configPromise from '@payload-config'
import { getPayload } from 'payload'

import type { BankingPartnersBlock as BankingPartnersBlockProps } from '@/payload-types'

import { BankingPartnersView } from './BankingPartnersView'

// Content is single-sourced from the `businessBankAccounts` global (same pattern
// as the BusinessBankAccounts card block); the block only supplies section layout.
export const BankingPartnersBlock: React.FC<BankingPartnersBlockProps> = async ({
  sectionLayout,
  showCta,
}) => {
  const payload = await getPayload({ config: configPromise })
  const { heading, subheading, backgroundPattern, banks, cta } = await payload.findGlobal({
    slug: 'businessBankAccounts',
  })

  if (!heading || !banks?.length) return null

  return (
    <BankingPartnersView
      heading={heading}
      subheading={subheading}
      backgroundPattern={backgroundPattern}
      banks={banks}
      cta={showCta === false ? undefined : cta}
      sectionLayout={sectionLayout}
    />
  )
}
