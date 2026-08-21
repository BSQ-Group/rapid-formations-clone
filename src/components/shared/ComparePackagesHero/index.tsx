import React from 'react'

import type { ComparePackagesHeroBlock as ComparePackagesHeroBlockProps } from '@/payload-types'

import RichText from '@/components/RichText'
import { Container } from '@/components/shared/Container/Container'
import { SectionWrapper } from '@/components/shared/SectionWrapper/SectionWrapper'
import Text from '@/components/shared/Text'
import { styles } from './ComparePackagesHero.styles'

export const ComparePackagesHero: React.FC<ComparePackagesHeroBlockProps> = ({
  title,
  body,
  sectionLayout,
}) => {
  const heading = title?.trim()

  if (!heading) return null

  return (
    <SectionWrapper {...sectionLayout} className={styles.section}>
      <Container>
        <div className={styles.grid}>
          <div>
            <Text as="h1" textStyle="span" text={heading} className={styles.heading} />
            {body && (
              <RichText
                data={body}
                enableGutter={false}
                enableProse={false}
                className={styles.body}
              />
            )}
          </div>
        </div>
      </Container>
    </SectionWrapper>
  )
}
