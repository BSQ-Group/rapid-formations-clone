import React from 'react'
import configPromise from '@payload-config'
import { getPayload } from 'payload'

import type { TestimonialQuoteBlock as TestimonialQuoteBlockProps } from '@/payload-types'

import { Container } from '@/components/shared/Container/Container'
import { SectionWrapper } from '@/components/shared/SectionWrapper/SectionWrapper'
import { TestimonialQuoteRotator } from './TestimonialQuoteRotator'
import { testimonialQuoteStyles as s } from './TestimonialQuote.styles'

const pick = (seed: string, length: number) => {
  let hash = 0
  for (let i = 0; i < seed.length; i++) hash = (hash * 31 + seed.charCodeAt(i)) >>> 0
  return hash % length
}

export const TestimonialQuoteBlock: React.FC<TestimonialQuoteBlockProps> = async ({
  id,
  sectionLayout,
}) => {
  const payload = await getPayload({ config: configPromise })
  const { items } = await payload.findGlobal({ slug: 'testimonialPool' })

  const pool = (items ?? [])
    .filter((item) => item.quote && item.customerName)
    .map(({ quote, customerName }) => ({ quote, customerName }))

  if (!pool.length) return null

  return (
    <SectionWrapper {...sectionLayout} className={s.section}>
      <Container>
        <TestimonialQuoteRotator pool={pool} initialIndex={pick(id ?? '', pool.length)} />
      </Container>
    </SectionWrapper>
  )
}
