'use client'

import * as React from 'react'
import { cn } from '@/utilities/ui'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import './SelectWithSeparator.css'

export interface SelectOption {
  value: string
  label: string
}

interface SelectWithSeparatorProps {
  options: SelectOption[]
  value?: string
  onValueChange: (value: string) => void
  placeholder?: string
  disabled?: boolean
  className?: string
  triggerClassName?: string
}

export const SelectWithSeparator: React.FC<SelectWithSeparatorProps> = ({
  options,
  value,
  onValueChange,
  placeholder = 'Select an option',
  disabled = false,
  className,
  triggerClassName,
}) => {
  return (
    <Select value={value} onValueChange={onValueChange} disabled={disabled}>
      <SelectTrigger className={cn('select-with-separator__trigger', triggerClassName)}>
        <SelectValue placeholder={placeholder} />
        <Separator orientation="vertical" className="select-with-separator__separator" />
      </SelectTrigger>
      <SelectContent className={cn('select-with-separator__content', className)}>
        {options.map(({ value, label }) => (
          <SelectItem key={value} value={value}>
            {label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
