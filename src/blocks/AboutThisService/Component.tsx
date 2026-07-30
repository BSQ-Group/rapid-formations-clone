import React from 'react'
import Link from 'next/link'
import { ShieldCheck, MapPin, Mail, Check, Phone, Sparkles } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

import type { AboutThisServiceBlock as AboutThisServiceBlockProps } from '@/payload-types'

import { SectionWrapper } from '@/components/shared/SectionWrapper/SectionWrapper'
import Text from '@/components/shared/Text'
import { Button } from '@/components/ui/button'
import { Media } from '@/components/Media'
import { TrustpilotWidget } from '@/components/shared/TrustpilotWidget/TrustpilotWidget'
import { cn } from '@/utilities/ui'
import { aboutThisServiceStyles as s } from './AboutThisService.styles'

const ICONS: Record<string, LucideIcon> = {
  shieldCheck: ShieldCheck,
  mapPin: MapPin,
  mail: Mail,
  check: Check,
  phone: Phone,
  sparkles: Sparkles,
}

const FLOATING_LAYERS = [
  { wrap: s.cardTop, text: s.cardTopText, iconWrap: s.cardTopIconWrap, icon: s.cardTopIcon },
  { wrap: s.cardMid, text: s.cardMidText, iconWrap: s.cardMidIconWrap, icon: s.cardMidIcon },
  { wrap: s.cardBot, text: s.cardBotText, iconWrap: s.cardBotIconWrap, icon: s.cardBotIcon },
]

export const AboutThisServiceBlock: React.FC<AboutThisServiceBlockProps> = ({
  title,
  paragraphs,
  noteLabel,
  noteText,
  orderLink,
  price,
  showTrustpilot,
  cardImage,
  features,
  sectionLayout,
}) => {
  return (
    <SectionWrapper {...sectionLayout} className={s.section}>
      <div className={s.textCol}>
        {title && (
          <Text text={title} as="h2" textStyle="headline-5xl" className={s.title} />
        )}

        {paragraphs && paragraphs.length > 0 && (
          <div className={s.paragraphs}>
            {paragraphs.map((p) => (
              <Text key={p.id} text={p.text} textStyle="body-base" className={s.paragraph} />
            ))}
          </div>
        )}

        {(noteLabel || noteText) && (
          <p className={s.note}>
            {noteLabel && (
              <Text text={noteLabel} textStyle="body-sm" asChild className={s.noteLabel}>
                <span />
              </Text>
            )}
            {noteLabel && noteText ? ' ' : null}
            {noteText && (
              <Text text={noteText} textStyle="body-sm" asChild>
                <span />
              </Text>
            )}
          </p>
        )}

        <div className={s.ctaRow}>
          <div className={s.ctaInline}>
            {orderLink?.url && (
              <Link href={orderLink.url}>
                <Button variant="primary" size="lg">{orderLink.label || 'Order'}</Button>
              </Link>
            )}
            {price && <Text text={price} textStyle="body-sm" className={s.price} />}
          </div>

          {showTrustpilot && (
            <TrustpilotWidget
              template="microTrustScore"
              height="20px"
              width="100%"
              className={s.trustpilot}
            />
          )}
        </div>
      </div>

      <div className={s.packageCard}>
        {cardImage && typeof cardImage === 'object' && (
          <Media resource={cardImage} fill imgClassName={s.packageImage} />
        )}

        {features?.slice(0, 3).map((feature, i) => {
          const layer = FLOATING_LAYERS[i]
          if (!layer) return null
          const Icon = ICONS[feature.icon || 'shieldCheck'] || ShieldCheck
          return (
            <div key={feature.id} className={cn(s.floatingCardBase, layer.wrap)}>
              <div className={layer.iconWrap}>
                <Icon className={layer.icon} strokeWidth={2} />
              </div>
              <Text text={feature.label} textStyle="span" asChild className={layer.text}>
                <span />
              </Text>
            </div>
          )
        })}
      </div>
    </SectionWrapper>
  )
}
