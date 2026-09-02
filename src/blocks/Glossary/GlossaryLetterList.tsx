import React from 'react'
import { faChevronRight } from '@fortawesome/pro-solid-svg-icons/faChevronRight'

import type { GlossaryBlock, ServiceAd } from '@/payload-types'

import RichText from '@/components/RichText'
import { FaIcon } from '@/components/shared/FaIcon'
import Text from '@/components/shared/Text'
import { ServiceAdCard } from '@/blocks/ServiceAds/ServiceAdCard'
import { glossaryStyles as s } from './Glossary.styles'

export type GlossaryGroup = NonNullable<GlossaryBlock['groups']>[number]
export type GlossaryTerm = NonNullable<GlossaryGroup['terms']>[number]

const byLetter = (terms: GlossaryTerm[]) =>
  terms.reduce((groups, term) => {
    const letter = (term.letter ?? '').trim().toUpperCase()
    return groups.set(letter, [...(groups.get(letter) ?? []), term])
  }, new Map<string, GlossaryTerm[]>())

export const GlossaryLetterList: React.FC<{ terms: GlossaryTerm[] }> = ({ terms }) => (
  <div>
    {[...byLetter(terms)].map(([letter, letterTerms]) => (
      <div key={letter} className={s.letterGroup}>
        <div className={s.letterHeading}>
          <Text as="h4" textStyle="span" text={letter} className={s.letterChip} />
        </div>
        <dl className={s.terms}>
          {letterTerms.map((term, index) => {
            const ad =
              typeof term.ad === 'object' && term.ad !== null ? (term.ad as ServiceAd) : undefined

            return (
              <React.Fragment key={term.id ?? index}>
                <Text as="dt" textStyle="span" text={term.term} className={s.term} />
                <dd className={s.definition}>
                  <RichText
                    data={term.definition}
                    enableGutter={false}
                    enableProse={false}
                    className={s.definitionBody}
                    listItemIcon={<FaIcon icon={faChevronRight} className={s.listIcon} />}
                  />
                </dd>
                {ad && (
                  <div className={s.adWrap}>
                    <ServiceAdCard ad={ad} wide />
                  </div>
                )}
              </React.Fragment>
            )
          })}
        </dl>
      </div>
    ))}
  </div>
)
