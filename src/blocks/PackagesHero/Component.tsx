import React from 'react'
import type { PackagesHeroBlock as PackagesHeroBlockProps } from '@/payload-types'
import Text from '@/components/shared/Text'
import { LucideIcon } from '@/components/shared/LucideIcon'
import { Media } from '@/components/Media'
import { cn } from '@/utilities/ui'
import { packagesHeroStyles as s } from './PackagesHero.styles'

export const PackagesHeroBlock: React.FC<PackagesHeroBlockProps> = ({
  heading,
  subtitle,
  benefits,
  heroImage,
  topCard,
  bottomCard,
  topCardExtra,
  bottomCardExtra,
}) => {
  const progressPct =
    topCard?.progressValue != null ? Math.min(Math.max(topCard.progressValue, 0), 100) : null

  const topCardExtraProgressPct =
    topCardExtra?.progressValue != null
      ? Math.min(Math.max(topCardExtra.progressValue, 0), 100)
      : null

  const hasFourCards = !!(topCardExtra?.title || bottomCardExtra?.title)

  return (
    <section className={s.section}>
      <div className={s.inner}>
        <div className={s.leftCol}>
          <Text as="h1" textStyle="headline-6xl" text={heading} className={s.heading} />
          {subtitle && <Text textStyle="body-sm" text={subtitle} className={s.subtitle} />}
          {benefits && benefits.length > 0 && (
            <ul className={s.benefitsList}>
              {benefits.map((benefit, index) => (
                <li key={benefit.id ?? index} className={s.benefitItem}>
                  <div className={s.benefitIconWrap}>
                    <LucideIcon name="Check" size={16} className="text-[var(--icon-accent)]" />
                  </div>
                  <Text textStyle="body-sm" text={benefit.text} className={s.benefitText} />
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className={s.rightCol}>
          <div className={s.imageArea}>
            <div className={s.imageWrap}>
              {heroImage && typeof heroImage === 'object' && (
                <Media resource={heroImage} fill imgClassName={s.imageInner} />
              )}
            </div>
            {topCard?.title && (
              <div className={cn(s.cardChrome, hasFourCards ? s.topCard4 : s.topCard)}>
                <div className={s.cardIconWrap}>
                  <LucideIcon
                    name={(topCard.iconName as any) ?? 'FileText'}
                    size={24}
                    className="text-[var(--icon-default)]"
                  />
                </div>
                <div className={s.topCardContent}>
                  <div className={s.topCardTitleRow}>
                    <Text textStyle="body-sm" text={topCard.title} className={s.topCardLabel} />
                    {topCard.detail && (
                      <Text textStyle="body-sm" text={topCard.detail} className={s.topCardDetail} />
                    )}
                  </div>
                  {progressPct !== null && (
                    <div className={s.progressBarTrack}>
                      <div className={s.progressBarFill} style={{ width: `${progressPct}%` }} />
                    </div>
                  )}
                  {topCard.subtitle && progressPct === null && (
                    <Text
                      textStyle="body-sm"
                      text={topCard.subtitle}
                      className={s.topCardSubtitle}
                    />
                  )}
                  {topCard.showRedactedLines && progressPct === null && !topCard.subtitle && (
                    <div className={s.redactedLines}>
                      <div className={s.redactedLine} />
                      <div className={s.redactedLineShort} />
                    </div>
                  )}
                </div>
              </div>
            )}
            {topCardExtra?.title && (
              <div className={cn(s.cardChromeSmall, s.topCardExtraPos)}>
                <div className={s.cardIconWrapSmall}>
                  <LucideIcon
                    name={topCardExtra.iconName ?? 'Mails'}
                    size={16}
                    className="text-[var(--icon-default)]"
                  />
                </div>
                <div className={s.smallTopCardContent}>
                  <div className={s.topCardTitleRow}>
                    <Text
                      textStyle="body-sm"
                      text={topCardExtra.title}
                      className={s.smallCardLabel}
                    />
                    {topCardExtra.detail && (
                      <Text
                        textStyle="body-sm"
                        text={topCardExtra.detail}
                        className={s.smallCardLabel}
                      />
                    )}
                  </div>
                  {topCardExtraProgressPct !== null && (
                    <div className={s.progressBarTrackSmall}>
                      <div
                        className={s.progressBarFill}
                        style={{ width: `${topCardExtraProgressPct}%` }}
                      />
                    </div>
                  )}
                  {topCardExtra.subtitle && topCardExtraProgressPct === null && (
                    <Text
                      textStyle="body-sm"
                      text={topCardExtra.subtitle}
                      className={s.smallCardLabel}
                    />
                  )}
                </div>
              </div>
            )}
            {bottomCardExtra?.title && (
              <div className={cn(s.cardChromeSmall, s.bottomCardExtraPos)}>
                <div className={s.cardIconWrapSmall}>
                  <LucideIcon
                    name={(bottomCardExtra.iconName as any) ?? 'CircleCheckBig'}
                    size={16}
                    className="text-[var(--icon-default)]"
                  />
                </div>
                <div className={s.bottomCardContent}>
                  <Text
                    textStyle="body-base"
                    text={bottomCardExtra.title}
                    className={s.smallCardTitle}
                  />
                  {bottomCardExtra.subtitle && (
                    <Text
                      textStyle="body-xs"
                      text={bottomCardExtra.subtitle}
                      className={s.smallCardSubtitle}
                    />
                  )}
                </div>
              </div>
            )}
            {bottomCard?.title && (
              <div className={cn(s.cardChrome, hasFourCards ? s.bottomCard4 : s.bottomCard)}>
                <div className={s.cardIconWrap}>
                  <LucideIcon
                    name={(bottomCard.iconName as any) ?? 'CircleCheckBig'}
                    size={24}
                    className="text-[var(--icon-default)]"
                  />
                </div>
                <div className={s.bottomCardContent}>
                  <Text
                    textStyle="body-base"
                    text={bottomCard.title}
                    className={s.bottomCardTitle}
                  />
                  {bottomCard.subtitle && (
                    <Text
                      textStyle="body-xs"
                      text={bottomCard.subtitle}
                      className={s.bottomCardSubtitle}
                    />
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
