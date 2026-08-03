import React from 'react'

import type { ComparePackagesBlock as ComparePackagesBlockProps } from '@/payload-types'

import { cn } from '@/utilities/ui'
import { SectionWrapper } from '@/components/shared/SectionWrapper/SectionWrapper'
import { ComparePackagesClient } from './ComparePackagesClient'
import { normalizePlans, normalizeSections } from './normalize'

type Props = ComparePackagesBlockProps & {
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
