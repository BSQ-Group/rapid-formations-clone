import * as React from 'react'
import classNames from 'classnames'
import './Tabs.css'
import { Tabs as UITabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export interface TabsOption {
  value: string
  label: string
  content: React.ReactNode
  disabled?: boolean
}

export interface TabsProps {
  options: TabsOption[]
  value: string
  onValueChange: (value: string) => void
  disabled?: boolean
  className?: string
}

/**
 * Tabs component styled according to Figma and BEM/TailwindCSS conventions.
 * Uses Radix Tabs under the hood for accessibility and keyboard navigation.
 */
export const Tabs: React.FC<TabsProps> = ({
  options,
  value,
  onValueChange,
  disabled: isComponentDisabled = false,
  className = '',
}) => {
  return (
    <UITabs
      value={value}
      onValueChange={onValueChange}
      className={classNames('tabs', className)}
      orientation="horizontal"
      dir="ltr"
      activationMode="automatic"
    >
      <TabsList className="tabs__list">
        {options.map(({ label, value, disabled }) => (
          <TabsTrigger
            key={value}
            value={value}
            className={classNames('tabs__item', {
              'tabs__item--disabled': isComponentDisabled || disabled,
            })}
            disabled={isComponentDisabled || disabled}
            aria-disabled={isComponentDisabled || disabled}
          >
            {label}
          </TabsTrigger>
        ))}
      </TabsList>
      {options.map(({ value, content }) => (
        <TabsContent key={value} value={value} className="w-full">
          {content}
        </TabsContent>
      ))}
    </UITabs>
  )
}

export default Tabs
