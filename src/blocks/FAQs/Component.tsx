import React from 'react'

import type { FAQsBlock as FAQsBlockProps } from '@/payload-types'

import { Collapsible } from '@/components/shared/Collapsible'
import { Container } from '@/components/shared/Container/Container'
import RichText from '@/components/RichText'
import Text from '@/components/shared/Text'
import { cn } from '@/utilities/ui'
import { faqsStyles as s } from './FAQs.styles'

export const FAQsBlock: React.FC<FAQsBlockProps> = ({ title, faqs }) => {
  if (!faqs?.length) return null

  return (
    <section className={s.section}>
      <Container>
        {title && (
          <div className={s.header}>
            <Text as="h2" textStyle="span" text={title} className={s.heading} />
          </div>
        )}
        <div className={s.panel}>
          <Collapsible
            className={s.list}
            items={faqs.map((item, index) => ({
              id: item.id,
              title: item.title,
              content: (
                <RichText
                  data={item.description}
                  enableGutter={false}
                  enableProse={false}
                  className={cn(s.answerText, index === faqs.length - 1 && s.answerTextLast)}
                />
              ),
            }))}
          />
        </div>
      </Container>
    </section>
  )
}
