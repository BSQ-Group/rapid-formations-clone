import React from 'react'

import type { DefaultTypedEditorState } from '@payloadcms/richtext-lexical'

import RichText from '@/components/RichText'
import { CtaLink } from '@/components/shared/CtaLink/CtaLink'
import Text from '@/components/shared/Text'
import { renewalItemsStyles as s } from './RenewalItems.styles'

export type RenewalItem = {
  id: string
  title: string
  price: string
  body: DefaultTypedEditorState
  ctaLabel: string
  ctaHref: string
  ctaNewTab?: boolean | null
}

export const RenewalItemsView: React.FC<{ items: RenewalItem[] }> = ({ items }) => (
  <div className={s.grid}>
    {items.map((item) => (
      <div key={item.id} className={s.item}>
        <div className={s.header}>
          <Text as="h4" textStyle="span" text={item.title} className={s.title} />
          <Text textStyle="span" text={`£${item.price}`} className={s.price} />
        </div>
        <div className={s.body}>
          <RichText
            data={item.body}
            enableGutter={false}
            enableProse={false}
            className={s.content}
          />
          <div className={s.buttons}>
            <CtaLink
              href={item.ctaHref}
              label={item.ctaLabel}
              newTab={item.ctaNewTab}
              size="md"
              tone="success"
              className={s.cta}
              ariaLabel={`Order our ${item.title} service now.`}
            />
          </div>
        </div>
      </div>
    ))}
  </div>
)
