'use client'

import { useRef } from 'react'
import { Check, Minus } from 'lucide-react'

import { cn } from '@/utilities/ui'
import { useLinkedCarousel } from '@/utilities/usePackageCarouselSync'
import { InfoTooltip } from '@/components/shared/InfoTooltip'
import { PackageCard } from '@/components/shared/PackageCard'
import type { PackageCardProps, PackageCardStyles } from '@/components/shared/PackageCard/PackageCard.types'
import {
  formationPackagesCardStyles,
  formationPackagesCardTextStyles,
} from '@/blocks/FormationPackages/FormationPackages.styles'

import type { Section } from './ComparePackagesClient'
import { combinedPlansCarouselStyles as s } from './CombinedPlansCarousel.styles'

/**
 * Tablet/mobile combined carousel (CORE-3620). Each slide is a single plan:
 * the marketing card (reusing the shared PackageCard) stacked directly on top
 * of that plan's services list, moving together as one scroll-snap item — no
 * gap, no second synced scroller. Tabs above switch plans.
 *
 * Card content per plan comes in as PackageCard props; the services columns
 * come from the shared `sections` (availability read per plan index).
 */
export interface CombinedPlan {
  /** Plan tab label (e.g. "Basic"). */
  name: string
  /** Full marketing card props for this plan's header. */
  card: Omit<PackageCardProps, 'styles' | 'textStyles' | 'titleAs'>
}

export interface CombinedPlansCarouselProps {
  plans: CombinedPlan[]
  sections: Section[]
  cardStyles?: PackageCardStyles
}

function FeatureIcon({ included }: { included: boolean }) {
  return included ? (
    <Check className={s.checkIcon} aria-label="Included" strokeWidth={2.5} />
  ) : (
    <Minus className={s.minusIcon} aria-label="Not included" strokeWidth={2.5} />
  )
}

function ServicesList({ planIndex, sections }: { planIndex: number; sections: Section[] }) {
  return (
    <div className={s.servicesCard}>
      {sections.map((section, sIdx) => (
        <div key={sIdx}>
          <div className={s.sectionLabel}>{section.label}</div>
          {section.features.map((feature, fIdx) => (
            <div key={fIdx} className={s.featureRow}>
              <div className={s.featureTextStack}>
                <span className={s.featureName}>{feature.name}</span>
                {feature.description && (
                  <span className={s.featureDescription}>{feature.description}</span>
                )}
              </div>
              {(feature.infoText || feature.tooltipText) && (
                <div className={s.featureInfoIconWrap}>
                  <InfoTooltip title={feature.infoText} content={feature.tooltipText} iconSize={24} />
                </div>
              )}
              <div className={s.featureTierIcon}>
                <FeatureIcon included={feature.inPlans[planIndex]} />
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}

export function CombinedPlansCarousel({ plans, sections, cardStyles = formationPackagesCardStyles }: CombinedPlansCarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null)
  const { activeIndex, setActiveIndex } = useLinkedCarousel(trackRef)

  return (
    <div className={s.viewport}>
      {/* Plan tabs */}
      <div className={s.tabs}>
        {plans.map((plan, i) => (
          <button
            key={plan.name}
            onClick={() => setActiveIndex(i)}
            className={cn(s.tab, i === activeIndex && s.tabActive)}
          >
            {plan.name}
          </button>
        ))}
      </div>

      {/* One slide per plan: marketing card + that plan's services list */}
      <div ref={trackRef} className={s.track}>
        {plans.map((plan, i) => (
          <div key={plan.name} className={s.slide}>
            <PackageCard
              {...plan.card}
              titleAs="h3"
              className={s.card}
              styles={cardStyles}
              textStyles={formationPackagesCardTextStyles}
            />
            <ServicesList planIndex={i} sections={sections} />
          </div>
        ))}
      </div>
    </div>
  )
}
