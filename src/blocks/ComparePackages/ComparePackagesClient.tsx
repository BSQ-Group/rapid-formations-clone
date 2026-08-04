'use client'

import Link from 'next/link'
import { Check, Minus } from 'lucide-react'
import type { DefaultTypedEditorState } from '@payloadcms/richtext-lexical'

import { buttonVariants } from '@/components/ui/button'
import { InfoTooltip } from '@/components/shared/InfoTooltip'
import { cn } from '@/utilities/ui'
import { getLinkHref, type LinkData } from '@/utilities/links'

import { comparePackagesStyles as s } from './ComparePackages.styles'

export interface Plan {
  name: string
  price: string
  subPrice?: string | null
  featured?: boolean | null
  button?: LinkData | null
}

export interface Feature {
  name: string
  description?: string | null
  infoText?: string | null
  tooltipText?: DefaultTypedEditorState | null
  inPlans: [boolean, boolean, boolean]
}

export interface Section {
  label: string
  features: Feature[]
}

export interface ComparePackagesClientProps {
  heading: string
  description?: string | null
  featuresLabel: string
  plans: [Plan, Plan, Plan]
  sections: Section[]
  mobileHidden?: boolean
}

function FeatureIcon({ included }: { included: boolean }) {
  return included ? (
    <Check className={s.checkIcon} aria-label="Included" strokeWidth={2.5} />
  ) : (
    <Minus className={s.minusIcon} aria-label="Not included" strokeWidth={2.5} />
  )
}

function OrderButton({ plan, planIndex }: { plan: Plan; planIndex: number }) {
  const label = plan.button?.label || 'Order'
  const href = plan.button ? getLinkHref(plan.button) : '#'
  const variant = planIndex === 2 ? 'primary' : 'secondary-light'

  return (
    <Link
      href={href}
      target={plan.button?.newTab ? '_blank' : undefined}
      rel={plan.button?.newTab ? 'noopener noreferrer' : undefined}
      className={cn(buttonVariants({ variant, size: 'lg' }), s.ctaButton)}
    >
      {label}
    </Link>
  )
}

function CarouselCard({
  plan,
  planIndex,
  sections,
}: {
  plan: Plan
  planIndex: number
  sections: Section[]
}) {
  return (
    <div className={s.carouselCard}>
      {sections.map((section, sIdx) => (
        <div key={sIdx}>
          <div className={s.cardSectionLabel}>{section.label}</div>
          {section.features.map((feature, fIdx) => (
            <div key={fIdx} className={s.cardFeatureRow}>
              <div className={s.cardFeatureTextStack}>
                <span className={s.cardFeatureName}>{feature.name}</span>
                {feature.description && (
                  <span className={s.cardFeatureDescription}>{feature.description}</span>
                )}
              </div>
              {(feature.infoText || feature.tooltipText) && (
                <div className={s.cardFeatureInfoIconWrap}>
                  <InfoTooltip title={feature.infoText} content={feature.tooltipText} iconSize={24} />
                </div>
              )}
              <div className={s.cardFeatureTierIcon}>
                <FeatureIcon included={feature.inPlans[planIndex]} />
              </div>
            </div>
          ))}
        </div>
      ))}
      <div className={s.cardFooter}>
        <span className={s.cardPlanName}>{plan.name}</span>
        <div className={s.cardPriceStack}>
          <span className={s.cardPrice}>{plan.price}</span>
          {plan.subPrice && <span className={s.cardSubPrice}>{plan.subPrice}</span>}
        </div>
        <OrderButton plan={plan} planIndex={planIndex} />
      </div>
    </div>
  )
}

export function ComparePackagesClient({
  heading,
  description,
  featuresLabel,
  plans,
  sections,
  mobileHidden,
}: ComparePackagesClientProps) {
  return (
    <div className={cn(s.section, mobileHidden && 'hidden lg:flex')}>
      <div className={s.inner}>
        <div className={s.headingWrap}>
          <h2 className={s.heading}>{heading}</h2>
          {description && <p className={s.description}>{description}</p>}
        </div>
        <div className={s.desktopTable}>
          <div className={s.desktopHeader}>
            <div className={s.desktopHeaderLabelCol}>{featuresLabel}</div>
            {plans.map((plan, i) => (
              <div key={i} className={s.desktopHeaderTierCol}>
                {plan.name}
              </div>
            ))}
          </div>
          {sections.map((section, sIdx) => (
            <div key={sIdx}>
              <div className={s.desktopSectionLabel}>
                <div className={s.desktopSectionLabelInner}>{section.label}</div>
              </div>
              {section.features.map((feature, fIdx) => (
                <div key={fIdx} className={s.desktopFeatureRow}>
                  <div className={s.desktopFeatureLabelCell}>
                    <div className={s.desktopFeatureTextBlock}>
                      {(feature.infoText || feature.tooltipText) && (
                        <div className={s.desktopFeatureInfoIconWrap}>
                          <InfoTooltip
                            title={feature.infoText}
                            content={feature.tooltipText}
                            iconSize={24}
                          />
                        </div>
                      )}
                      <div className={s.desktopFeatureTextStack}>
                        <span className={s.desktopFeatureName}>{feature.name}</span>
                        {feature.description && (
                          <span className={s.desktopFeatureDescription}>
                            {feature.description}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  {plans.map((_, pi) => (
                    <div key={pi} className={s.desktopTierCell}>
                      <FeatureIcon included={feature.inPlans[pi]} />
                    </div>
                  ))}
                </div>
              ))}
            </div>
          ))}
          <div className={s.desktopCtaRow}>
            <div className={s.desktopCtaLabelCol} />
            {plans.map((plan, i) => (
              <div key={i} className={s.desktopCtaTierCell}>
                <div className={s.desktopCtaPriceStack}>
                  <span className={s.desktopCtaPlanName}>{plan.name}</span>
                  <span className={s.desktopCtaPrice}>{plan.price}</span>
                  {plan.subPrice && (
                    <span className={s.desktopCtaSubPrice}>{plan.subPrice}</span>
                  )}
                </div>
                <OrderButton plan={plan} planIndex={i} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Tablet / mobile (< lg) ── standalone feature-table carousel.
          Shown only when NOT combined with a FormationPackages block (e.g. a
          page with ComparePackages alone); otherwise the whole section is
          hidden <lg and the combined carousel above renders the services. ── */}
      <div className={s.carouselViewport}>
        <div className={s.carouselTrack}>
          {plans.map((plan, i) => (
            <CarouselCard key={i} plan={plan} planIndex={i} sections={sections} />
          ))}
        </div>
      </div>
    </div>
  )
}
