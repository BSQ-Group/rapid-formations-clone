import React from 'react'

import { Container } from '@/components/shared/Container/Container'
import { NameCheck } from '@/components/shared/NameCheck'
import { OrderSteps } from '@/components/shared/OrderSteps'
import Text from '@/components/shared/Text'
import { nameCheckPanelStyles as s } from './NameCheckPanel.styles'

export type NameCheckPanelProps = {
  /** Without the word "Package" — "Basic" renders as "You have chosen the BASIC PACKAGE." */
  packageName: string
  /** Path on client.rapidformations.co.uk, e.g. /buy/basic-package/. */
  checkoutPath: string
  placeholder?: string | null
}

export const NameCheckPanel: React.FC<NameCheckPanelProps> = ({
  packageName,
  checkoutPath,
  placeholder,
}) => (
  <section className={s.section}>
    <Container>
      <div className={s.stack}>
        <OrderSteps currentStep={1} />
        <div className={s.container}>
          <Text as="h1" textStyle="span" className={s.title}>
            You have chosen the <span className={s.packageName}>{packageName.trim()} Package</span>
            .
            <br />
            Now choose your company name.
          </Text>
          <NameCheck variant="package" checkoutPath={checkoutPath} placeholder={placeholder} />
        </div>
      </div>
    </Container>
  </section>
)

export default NameCheckPanel
