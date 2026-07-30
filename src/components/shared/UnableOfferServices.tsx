'use client'

import React from 'react'
import { EarthLock } from 'lucide-react'
import { ServiceRestricted } from '@/components/shared/ServiceRestricted'

export default function UnableOfferServices({ withHeader = false }: { withHeader?: boolean }) {
  const actions = [
    {
      label: 'Customer support',
      variant: 'secondary' as const,
      href: 'https://www.companyformationsdirect.co.uk/contact',
      external: true,
    },
    {
      label: 'My companies',
      variant: 'primary' as const,
      href: '/',
    },
  ]

  return (
    <ServiceRestricted
      withHeader={withHeader}
      icon={EarthLock}
      title="Unfortunately, we are unable to offer our services for this company"
      description="Based on the information you provided, we are unable to offer our services for this company. Your order will be refunded as soon as possible. If you have not received the refund in the next 2 business days, please reach out to our customer support."
      actions={actions}
    />
  )
}
