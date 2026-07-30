import React from 'react'

import type { ComparePackagesBlock as ComparePackagesBlockProps } from '@/payload-types'

import { cn } from '@/utilities/ui'
import { SectionWrapper } from '@/components/shared/SectionWrapper/SectionWrapper'
import { ComparePackagesClient } from './ComparePackagesClient'
import { normalizePlans, normalizeSections } from './normalize'

type Props = ComparePackagesBlockProps & {
  /**
   * Set by RenderBlocks when a FormationPackages block on the same page renders
   * the combined card+services carousel on tablet/mobile (CORE-3620). When true
   * this block shows only its desktop table (≥lg) and collapses its <lg padding.
   */
  mobileCombinedElsewhere?: boolean
}

export const ComparePackagesBlock: React.FC<Props> = ({
  heading,
  description,
  featuresLabel,
  plans,
  sections,
  sectionLayout,
  mobileCombinedElsewhere,
}) => {
  if (!plans || plans.length < 3 || !sections?.length) return null

  return (
    <SectionWrapper
      {...sectionLayout}
      className={cn(mobileCombinedElsewhere && 'max-lg:!py-0')}
    >
      <ComparePackagesClient
        heading={heading}
        description={description}
        featuresLabel={featuresLabel}
        plans={normalizePlans(plans)}
        sections={normalizeSections(sections)}
        mobileHidden={mobileCombinedElsewhere}
      />
    </SectionWrapper>
  )
}
