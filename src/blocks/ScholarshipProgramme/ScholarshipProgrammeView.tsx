import React from 'react'
import { faAngleRight } from '@fortawesome/pro-solid-svg-icons/faAngleRight'

import type { ScholarshipProgrammeBlock as ScholarshipProgrammeBlockProps } from '@/payload-types'

import { Container } from '@/components/shared/Container/Container'
import { CtaLink } from '@/components/shared/CtaLink'
import { FaIcon } from '@/components/shared/FaIcon'
import RichText from '@/components/RichText'
import { ScholarshipWinners, type ScholarshipWinner } from '@/components/shared/ScholarshipWinners'
import { SectionWrapper } from '@/components/shared/SectionWrapper/SectionWrapper'
import Text from '@/components/shared/Text'
import { UniversityPartners } from '@/components/shared/UniversityPartners'
import { richTextShell } from '@/blocks/TextContent/TextContent.styles'
import { getLinkHref, type LinkData } from '@/utilities/links'
import { cn } from '@/utilities/ui'
import { scholarshipProgrammeStyles as s } from './ScholarshipProgramme.styles'

export type ScholarshipProgrammeViewProps = ScholarshipProgrammeBlockProps & {
  winners: ScholarshipWinner[]
}

export const ScholarshipProgrammeView: React.FC<ScholarshipProgrammeViewProps> = ({
  title,
  isPageTitle,
  intro,
  applyCta,
  winnersHeading,
  winners,
  sidebarPartners,
  inlinePartners,
  sectionLayout,
}) => {
  const ctaHref = getLinkHref(applyCta as LinkData | undefined)

  return (
    <SectionWrapper {...sectionLayout} className={s.section}>
      <Container className={s.wrapperPad}>
        <div className={s.grid}>
          <div>
            <Text
              as={isPageTitle === false ? 'h2' : 'h1'}
              textStyle="span"
              text={title}
              className={s.title}
            />
            {intro && (
              <RichText
                data={intro}
                enableGutter={false}
                enableProse={false}
                listItemIcon={<FaIcon icon={faAngleRight} className={s.listIcon} />}
                className={cn(
                  richTextShell.text,
                  richTextShell.paragraphs,
                  richTextShell.headings,
                  richTextShell.links,
                  s.intro,
                )}
              />
            )}
            {applyCta?.label && ctaHref && (
              <div className={s.ctaWrap}>
                <CtaLink
                  href={ctaHref}
                  label={applyCta.label}
                  newTab={applyCta.newTab}
                  block
                  className="md:w-max"
                />
              </div>
            )}
            <ScholarshipWinners heading={winnersHeading} winners={winners} />
            <UniversityPartners
              heading={inlinePartners?.heading}
              universities={inlinePartners?.universities ?? []}
              layout="row"
              className={s.inlinePartners}
            />
          </div>
          <div>
            <UniversityPartners
              heading={sidebarPartners?.heading}
              universities={sidebarPartners?.universities ?? []}
              layout="rail"
            />
          </div>
        </div>
      </Container>
    </SectionWrapper>
  )
}
