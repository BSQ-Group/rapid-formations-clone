import React from 'react'

import type { FAQsBlock as FAQsBlockProps } from '@/payload-types'

import { Collapsible } from '@/components/shared/Collapsible'
import { Container } from '@/components/shared/Container/Container'
import RichText from '@/components/RichText'
import Text from '@/components/shared/Text'
import { cn } from '@/utilities/ui'
import { faqsStyles as s } from './FAQs.styles'

export const FAQsBlock: React.FC<FAQsBlockProps> = ({ title, faqs, variant }) => {
  if (!faqs?.length) return null

  const isPage = variant === 'page'

  return (
    <section className={isPage ? s.pageSection : s.section}>
      <Container>
        {title && !isPage && (
          <div className={s.header}>
            <Text as="h2" textStyle="span" text={title} className={s.heading} />
          </div>
        )}
        <div className={isPage ? s.pagePanel : s.panel}>
          <Collapsible
            className={isPage ? s.pageList : s.list}
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
