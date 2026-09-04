'use client'

import React from 'react'
import Link from 'next/link'

import { buildCheckoutUrl } from '@/components/shared/NameCheck'
import { useCompanyName } from '@/hooks/useCompanyName'

export type OrderLinkProps = Omit<React.ComponentProps<typeof Link>, 'href'> & {
  /** The authored name-check href, used until a name has been checked. */
  href: string
  /** This package's path on the checkout host. Without it the href never re-aims. */
  checkoutPath?: string | null
}

/**
 * A Buy/Order link that skips the name-check step once a name has been checked and
 * found available, carrying that name into checkout — matching legacy, which re-aims
 * these hrefs from the `company-name` cookie on every page.
 */
export const OrderLink: React.FC<OrderLinkProps> = ({
  href,
  checkoutPath,
  children,
  ...rest
}) => {
  const name = useCompanyName()
  const resolved = name && checkoutPath ? buildCheckoutUrl(checkoutPath, name) : href

  return (
    <Link href={resolved} {...rest}>
      {children}
    </Link>
  )
}

export default OrderLink
