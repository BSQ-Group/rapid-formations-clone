'use client'

import React, { useId, useState } from 'react'

import type { FAQsBlock as FAQsBlockProps } from '@/payload-types'

import Text from '@/components/shared/Text'
import RichText from '@/components/RichText'
import { Container } from '@/components/shared/Container/Container'
import { cn } from '@/utilities/ui'
import { faqsStyles as s } from './FAQs.styles'

const AngleDown = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 384 512" aria-hidden focusable="false">
    <path d="M192 384c-8.188 0-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L192 306.8l137.4-137.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-160 160C208.4 380.9 200.2 384 192 384z" />
  </svg>
)

export const FAQsBlock: React.FC<FAQsBlockProps> = ({ title, faqs }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const baseId = useId()

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
          <ul className={s.list}>
            {faqs.map((item, index) => {
              const isOpen = openIndex === index
              const isLast = index === faqs.length - 1
              const triggerId = `${baseId}-faq-${index}`
              const panelId = `${baseId}-faq-panel-${index}`

              return (
                <li key={item.id ?? index} className={s.item}>
                  <h3 className={s.questionHeading}>
                    <button
                      type="button"
                      id={triggerId}
                      aria-controls={panelId}
                      aria-expanded={isOpen}
                      onClick={() => setOpenIndex(isOpen ? null : index)}
                      className={cn(s.trigger, isOpen && s.triggerOpen)}
                    >
                      <Text
                        textStyle="span"
                        text={item.title}
                        className={cn(s.question, isOpen && s.questionOpen)}
                      />
                      <span className={cn(s.iconCircle, isOpen && s.iconCircleOpen)}>
                        <AngleDown className={s.icon} />
                      </span>
                    </button>
                  </h3>
                  <div
                    id={panelId}
                    inert={!isOpen}
                    className={cn(s.answer, isOpen ? s.answerOpen : s.answerClosed)}
                  >
                    <div className={s.answerInner}>
                      <RichText
                        data={item.description}
                        enableGutter={false}
                        enableProse={false}
                        className={cn(s.answerText, isLast && s.answerTextLast)}
                      />
                    </div>
                  </div>
                </li>
              )
            })}
          </ul>
        </div>
      </Container>
    </section>
  )
}
