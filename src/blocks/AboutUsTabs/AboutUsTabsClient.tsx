'use client'

import * as TabsPrimitive from '@radix-ui/react-tabs'
import React, { useState } from 'react'

import Text from '@/components/shared/Text'
import { cn } from '@/utilities/ui'
import { aboutUsTabsStyles as s } from './AboutUsTabs.styles'

export type AboutUsTab = {
  label: string
  title: string
  isPageTitle: boolean
  panel: React.ReactNode
}

export const AboutUsTabsClient: React.FC<{ tabs: AboutUsTab[] }> = ({ tabs }) => {
  const [selected, setSelected] = useState(0)

  if (!tabs.length) return null

  const active = tabs[selected] ?? tabs[0]

  return (
    <TabsPrimitive.Root
      value={String(selected)}
      onValueChange={(value) => setSelected(Number(value))}
    >
      <Text
        as={active.isPageTitle ? 'h1' : 'h2'}
        textStyle="span"
        text={active.title}
        className={s.title}
      />
      <TabsPrimitive.List className={s.list}>
        {tabs.map((tab, index) => (
          <TabsPrimitive.Trigger
            key={index}
            value={String(index)}
            className={cn(s.tab, index === selected ? s.tabActive : s.tabIdle)}
          >
            {tab.label}
          </TabsPrimitive.Trigger>
        ))}
      </TabsPrimitive.List>
      {tabs.map((tab, index) => (
        <TabsPrimitive.Content
          key={index}
          value={String(index)}
          forceMount
          hidden={index !== selected}
          className={s.panel}
        >
          {tab.panel}
        </TabsPrimitive.Content>
      ))}
    </TabsPrimitive.Root>
  )
}
