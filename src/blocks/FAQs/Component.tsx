'use client'

import React, { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import type { FAQsBlock as FAQsBlockProps } from '@/payload-types'
import { SectionWrapper } from '@/components/shared/SectionWrapper/SectionWrapper'
import Text from '@/components/shared/Text'
import RichText from '@/components/RichText'
import { styles } from './Component.styles'

type Props = FAQsBlockProps

export const FAQsBlock: React.FC<Props> = ({ title, faqs, sectionLayout }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  if (!faqs?.length) return null

  return (
    <SectionWrapper {...sectionLayout} className={styles.section}>
      {title && <Text as="h2" textStyle="headline-5xl" text={title} className={styles.heading} />}
      <div className={styles.faqList}>
        {faqs.map((item, index) => {
          const isOpen = openIndex === index
          return (
            <div key={index} className={styles.card}>
              <button
                type="button"
                className={styles.trigger}
                onClick={() => setOpenIndex(isOpen ? null : index)}
                aria-expanded={isOpen}
              >
                <Text textStyle="body-base" text={item.title} className={styles.triggerLabel} />
                <ChevronDown
                  className={`${styles.chevronBase} ${isOpen ? styles.chevronOpen : ''}`}
                />
              </button>
              <div
                className={`${styles.answerGrid} ${isOpen ? styles.answerGridOpen : styles.answerGridClosed}`}
              >
                <div className={styles.answerInner}>
                  <RichText
                    data={item.description}
                    enableGutter={false}
                    className={styles.answerText}
                  />
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </SectionWrapper>
  )
}
