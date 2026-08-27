import React from 'react'

import type { CompanyAddressGuideTableBlock as CompanyAddressGuideTableBlockProps } from '@/payload-types'

import { Container } from '@/components/shared/Container/Container'
import RichText from '@/components/RichText'
import { SectionWrapper } from '@/components/shared/SectionWrapper/SectionWrapper'
import Text from '@/components/shared/Text'
import { cn } from '@/utilities/ui'
import { companyAddressGuideTableStyles as s } from './CompanyAddressGuideTable.styles'

type Table = NonNullable<CompanyAddressGuideTableBlockProps['tables']>[number]
type Row = NonNullable<Table['rows']>[number]
type CellContent = Row['question']

const hasText = (node: unknown): boolean => {
  if (!node || typeof node !== 'object') return false
  const candidate = node as { text?: unknown; children?: unknown[] }
  if (typeof candidate.text === 'string' && candidate.text.trim() !== '') return true
  return Array.isArray(candidate.children) && candidate.children.some(hasText)
}

const Cell: React.FC<{ content: CellContent; className?: string }> = ({ content, className }) => (
  <div role="cell" className={cn(s.cell, className)}>
    <RichText data={content} enableGutter={false} enableProse={false} />
  </div>
)

export const CompanyAddressGuideTableBlockComponent: React.FC<
  CompanyAddressGuideTableBlockProps
> = ({ tables, sectionLayout }) => {
  const guides = tables ?? []

  if (!guides.length) return null

  return (
    <SectionWrapper {...sectionLayout} className={s.section}>
      <Container>
        {guides.map((table) => {
          const columns = [
            table.columnHeadings?.registeredOffice,
            table.columnHeadings?.serviceAddress,
            table.columnHeadings?.businessAddress,
          ]
          return (
            <div key={table.id}>
              <Text as="h2" textStyle="span" text={table.heading} className={s.heading} />
              <div className={s.scroller} tabIndex={0} role="region" aria-label={table.heading}>
                <div role="table" className={s.table}>
                  <div role="row" className={cn(s.row, s.headerRow)}>
                    <div role="columnheader" className={cn(s.cell, s.questionCell)}>
                      <span className="sr-only">Question</span>
                    </div>
                    {columns.map((heading, index) => (
                      <div key={index} role="columnheader" className={s.cell}>
                        <Text textStyle="span" text={heading} className={s.columnHeading} />
                      </div>
                    ))}
                  </div>
                  {(table.rows ?? []).map((row) => (
                    <div key={row.id} role="row" className={s.row}>
                      <Cell content={row.question} className={s.questionCell} />
                      <Cell content={row.registeredOffice} />
                      <Cell content={row.serviceAddress} />
                      <Cell content={row.businessAddress} />
                    </div>
                  ))}
                </div>
              </div>
              {table.footnote && hasText(table.footnote.root) && (
                <div className={s.footnote}>
                  <RichText data={table.footnote} enableGutter={false} enableProse={false} />
                </div>
              )}
            </div>
          )
        })}
      </Container>
    </SectionWrapper>
  )
}
