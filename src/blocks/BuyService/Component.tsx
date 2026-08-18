import React from 'react'
import configPromise from '@payload-config'
import { getPayload } from 'payload'

import type { BuyService, BuyServiceBlock as BuyServiceBlockProps } from '@/payload-types'

import { BuyServiceCard } from '@/components/shared/BuyServiceCard'
import { Container } from '@/components/shared/Container/Container'
import { SectionWrapper } from '@/components/shared/SectionWrapper/SectionWrapper'
import { getLinkHref, type LinkData } from '@/utilities/links'
import { buyServiceStyles as s } from './BuyService.styles'

export const BuyServiceBlock: React.FC<BuyServiceBlockProps> = async ({
  services,
  sectionLayout,
}) => {
  const resolved = (services ?? []).filter(
    (service): service is BuyService => typeof service === 'object' && service !== null,
  )

  if (!resolved.length) return null

  const payload = await getPayload({ config: configPromise })
  const { items } = await payload.findGlobal({ slug: 'prices' })
  const priceBySlug = new Map((items ?? []).map((item) => [item.slug, item.value]))

  return (
    <SectionWrapper {...sectionLayout} className={s.section}>
      <Container>
        <div className={s.list}>
          {resolved.map((service) => {
            const price = priceBySlug.get(service.priceSlug)
            if (!price) return null
            const cta = service.cta as LinkData | undefined
            return (
              <BuyServiceCard
                key={service.id}
                title={service.title}
                mobileTitle={service.mobileTitle}
                price={price}
                postText={service.postText}
                showVat={service.showVat}
                content={service.content}
                hideBodyOnMobile={service.hideBodyOnMobile}
                ctaLabel={cta?.label}
                ctaHref={getLinkHref(cta)}
                ctaNewTab={cta?.newTab}
              />
            )
          })}
        </div>
      </Container>
    </SectionWrapper>
  )
}
