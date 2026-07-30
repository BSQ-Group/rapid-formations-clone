import React from 'react'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import type { BusinessBankAccountsBlock as BusinessBankAccountsBlockProps } from '@/payload-types'
import { SectionWrapper } from '@/components/shared/SectionWrapper/SectionWrapper'
import { BusinessBankAccountsCarousel } from './BusinessBankAccountsCarousel'

export const BusinessBankAccountsBlock: React.FC<BusinessBankAccountsBlockProps> = async ({
  sectionLayout,
}) => {
  const payload = await getPayload({ config: configPromise })
  const data = await payload.findGlobal({ slug: 'businessBankAccounts' })

  if (!data.banks?.length) return null

  return (
    <SectionWrapper {...sectionLayout}>
      <BusinessBankAccountsCarousel heading={data.heading} banks={data.banks} />
    </SectionWrapper>
  )
}
