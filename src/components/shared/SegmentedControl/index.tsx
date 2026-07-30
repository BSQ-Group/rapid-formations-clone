import * as React from 'react'
import { cn } from '@/utilities/ui'
import './SegmentedControl.css'
import { TabsContent, TabsList, TabsTrigger, Tabs as UITabs } from '@/components/ui/tabs'

export interface SegmentedControlOption {
  value: string
  label: string
  content: React.ReactNode
  disabled?: boolean
}

export interface SegmentedControlProps {
  options: SegmentedControlOption[]
  value: string
  onValueChange: (value: string) => void
  disabled?: boolean
  className?: string
}

export const SegmentedControl: React.FC<SegmentedControlProps> = ({
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
      className={cn('segmented-control', className)}
      orientation="horizontal"
      dir="ltr"
      activationMode="automatic"
    >
      <TabsList className="segmented-control__list">
        {options.map(({ value, label, disabled }) => (
          <TabsTrigger
            key={value}
            value={value}
            className={cn('segmented-control__item', {
              'segmented-control__item--disabled': isComponentDisabled || disabled,
            })}
            disabled={isComponentDisabled || disabled}
            aria-disabled={isComponentDisabled || disabled}
          >
            {label}
          </TabsTrigger>
        ))}
      </TabsList>
      {options.map(({ value, content }) => (
        <TabsContent key={value} value={value}>
          {content}
        </TabsContent>
      ))}
    </UITabs>
  )
}

export default SegmentedControl
