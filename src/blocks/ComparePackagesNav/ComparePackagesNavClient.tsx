'use client'

import React from 'react'
import { usePathname } from 'next/navigation'

import { ComparePackagesNavList, type ComparePackagesNavTab } from './ComparePackagesNavList'

export const ComparePackagesNavClient: React.FC<{ tabs: ComparePackagesNavTab[] }> = ({ tabs }) => (
  <ComparePackagesNavList tabs={tabs} activeHref={usePathname() ?? ''} />
)
