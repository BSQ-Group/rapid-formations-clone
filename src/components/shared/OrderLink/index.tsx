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
 * Skips the name-check step once a name is saved available, as legacy does by
 * re-aiming these hrefs from the `company-name` cookie.
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
