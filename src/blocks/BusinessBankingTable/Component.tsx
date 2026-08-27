import React from 'react'

import { faCheck } from '@fortawesome/pro-solid-svg-icons/faCheck'
import { faTimes } from '@fortawesome/pro-solid-svg-icons/faTimes'

import type { BusinessBankingTableBlock as BusinessBankingTableBlockProps } from '@/payload-types'

import { Container } from '@/components/shared/Container/Container'
import { FaIcon } from '@/components/shared/FaIcon'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'
import { SectionWrapper } from '@/components/shared/SectionWrapper/SectionWrapper'
import Text from '@/components/shared/Text'
import { businessBankingTableStyles as s } from './BusinessBankingTable.styles'

type Bank = NonNullable<BusinessBankingTableBlockProps['rows']>[number]
type ColumnHeadings = BusinessBankingTableBlockProps['columnHeadings']

const BankCell: React.FC<{ bank: Bank }> = ({ bank }) => (
  <div className={s.logoCell}>
    {typeof bank.logo === 'object' && bank.logo !== null ? (
      <Media
        resource={bank.logo}
        htmlElement={null}
        pictureClassName={s.logoPicture}
        imgClassName={s.logo}
        size={s.logoSizes}
        loading="lazy"
      />
    ) : (
      bank.bankName
    )}
    {bank.footnoteMarker && <sup className={s.marker}>{bank.footnoteMarker}</sup>}
  </div>
)

const OverdraftCell: React.FC<{ available?: boolean | null }> = ({ available }) =>
  available ? (
    <FaIcon icon={faCheck} className={s.iconYes} title="Yes" />
  ) : (
    <FaIcon icon={faTimes} className={s.iconNo} title="No" />
  )

const columns: { key: keyof ColumnHeadings; cell: (bank: Bank) => React.ReactNode }[] = [
  { key: 'bank', cell: (bank) => <BankCell bank={bank} /> },
  { key: 'type', cell: (bank) => bank.type },
  { key: 'freeBankingPeriod', cell: (bank) => bank.freeBankingPeriod },
  { key: 'overdraft', cell: (bank) => <OverdraftCell available={bank.overdraft} /> },
  { key: 'accountingIntegration', cell: (bank) => bank.accountingIntegration },
  { key: 'keyFeatures', cell: (bank) => bank.keyFeatures },
]

export const BusinessBankingTableBlock: React.FC<BusinessBankingTableBlockProps> = ({
  heading,
  intro,
  columnHeadings,
  rows,
  footnotes,
  sectionLayout,
}) => (
  <SectionWrapper {...sectionLayout} className={s.section}>
    <Container className={s.wrapperPad}>
      <div className={s.inner}>
        <Text as="h2" textStyle="span" text={heading} className={s.heading} />
        {intro && <RichText data={intro} enableGutter={false} className={s.copy} />}
        <div className={s.scroller} tabIndex={0}>
          <table className={s.table}>
            <thead>
              <tr className={s.headRow}>
                {columns.map(({ key }) => (
                  <th key={key} scope="col" className={s.th}>
                    {columnHeadings?.[key]}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {(rows ?? []).map((bank) => (
                <tr key={bank.id} className={s.row}>
                  {columns.map(({ key, cell }) => (
                    <td key={key} className={s.td}>
                      {cell(bank)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {footnotes && <RichText data={footnotes} enableGutter={false} className={s.copy} />}
      </div>
    </Container>
  </SectionWrapper>
)
