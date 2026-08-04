import React from 'react'
import Link from 'next/link'

import type { ComparePackagesHeaderBlock as ComparePackagesHeaderBlockProps } from '@/payload-types'

import { SectionWrapper } from '@/components/shared/SectionWrapper/SectionWrapper'
import Text from '@/components/shared/Text'
import { getLinkHref, type LinkData } from '@/utilities/links'
import { comparePackagesHeaderStyles as s } from './ComparePackagesHeader.styles'

export const ComparePackagesHeaderBlock: React.FC<ComparePackagesHeaderBlockProps> = ({
  title,
  descriptionPrimary,
  descriptionSecondaryBefore,
  descriptionLink,
  descriptionSecondaryAfter,
  sectionLayout,
}) => {
  const link = descriptionLink as LinkData | null | undefined
  const hasLink = Boolean(link?.label)

  return (
    <SectionWrapper {...sectionLayout} className={s.section}>
      <div className={s.inner}>
        {title && (
          <Text text={title} as="h2" textStyle="span" className={s.title} />
        )}
        <div className={s.description}>
          {descriptionPrimary && (
            <Text
              text={descriptionPrimary}
              as="p"
              textStyle="span"
              className={s.descriptionPrimary}
            />
          )}
          {(descriptionSecondaryBefore || hasLink || descriptionSecondaryAfter) && (
            <p>
              {descriptionSecondaryBefore}
              {hasLink && (
                <Link
                  href={getLinkHref(link)}
                  target={link?.newTab ? '_blank' : undefined}
                  rel={link?.newTab ? 'noopener noreferrer' : undefined}
                  className={s.descriptionLink}
                >
                  {link?.label}
                </Link>
              )}
              {descriptionSecondaryAfter}
            </p>
          )}
        </div>
      </div>
    </SectionWrapper>
  )
}
