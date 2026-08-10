import React from 'react'

import type { NameCheckPackagesBlock as NameCheckPackagesProps } from '@/payload-types'

import { Container } from '@/components/shared/Container/Container'
import { NameCheck } from '@/components/shared/NameCheck'
import { OrderSteps } from '@/components/shared/OrderSteps'
import Text from '@/components/shared/Text'
import { nameCheckPackagesStyles as s } from './NameCheckPackages.styles'

export const NameCheckPackagesBlock: React.FC<NameCheckPackagesProps> = ({
  packageName,
  checkoutPath,
  searchPlaceholder,
}) => {
  const name = packageName?.trim()

  return (
    <section className={s.section}>
      <Container>
        <div className={s.stack}>
          <OrderSteps currentStep={1} />
          <div className={s.container}>
            <Text as="h1" textStyle="span" className={s.title}>
              You have chosen the <span className={s.packageName}>{name} Package</span>.
              <br />
              Now choose your company name.
            </Text>
            <NameCheck
              variant="package"
              checkoutPath={checkoutPath}
              placeholder={searchPlaceholder}
            />
          </div>
        </div>
      </Container>
    </section>
  )
}
