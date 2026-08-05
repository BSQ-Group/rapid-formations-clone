import React from 'react'

import type { PromoCardBlock as PromoCardBlockProps } from '@/payload-types'

import RichText from '@/components/RichText'
import { SectionWrapper } from '@/components/shared/SectionWrapper/SectionWrapper'
import Text from '@/components/shared/Text'
import { promoCardStyles as s } from './PromoCard.styles'

type Props = PromoCardBlockProps

export const PromoCardBlock: React.FC<Props> = ({
  title,
  description,
  addLabel,
  price,
  priceCaption,
  backgroundImage,
  sectionLayout,
}) => {
  const bgUrl =
    backgroundImage && typeof backgroundImage === 'object' ? backgroundImage.url : null

  return (
    <SectionWrapper {...sectionLayout} className={s.section}>
      <div className={s.card} style={bgUrl ? { backgroundImage: `url(${bgUrl})` } : undefined}>
        <div className={s.content}>
          <Text as="h2" textStyle="headline-2xl" text={title} className={s.title} />
          {description && (
            <RichText
              data={description}
              enableGutter={false}
              enableProse={false}
              className={s.description}
            />
          )}
        </div>
        <div className={s.pricePanel}>
          <Text textStyle="body-sm" text={addLabel || 'Add'} asChild className={s.addLabel}>
            <span />
          </Text>
          <Text textStyle="headline-3xl" text={price} asChild className={s.price}>
            <span />
          </Text>
          <Text
            textStyle="body-sm"
            text={priceCaption || 'at the checkout'}
            asChild
            className={s.priceCaption}
          >
            <span />
          </Text>
        </div>
      </div>
    </SectionWrapper>
  )
}
