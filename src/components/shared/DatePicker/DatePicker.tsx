'use client'

import * as React from 'react'
import { ChevronDownIcon, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { cn } from '@/utilities/ui'
import './DatePicker.css'

export interface DatePickerProps {
  value?: Date
  onChange?: (date: Date | undefined) => void
  placeholder?: string
  disabled?: boolean
  className?: string
  triggerClassName?: string
  error?: string
  label?: string
  fromDate?: Date
  toDate?: Date
  background?: 'light' | 'dark'
}

export function DatePicker({
  value,
  onChange,
  placeholder = 'Select date',
  disabled = false,
  className,
  triggerClassName,
  error,
  label,
  fromDate,
  toDate,
  background = 'dark',
}: DatePickerProps) {
  const [open, setOpen] = React.useState(false)

  const handleSelect = (date: Date | undefined) => {
    onChange?.(date)
    setOpen(false)
  }

  const startMonth = fromDate || new Date(1925, 0)
  const endMonth = toDate || new Date(2050, 0)
  const defaultFromDate = fromDate || new Date(1925, 0, 1)
  const defaultToDate = toDate || new Date(2050, 11, 31)

  const disabledDates = (date: Date) => {
    const isBeforeMin = defaultFromDate && date < defaultFromDate
    const isAfterMax = defaultToDate && date > defaultToDate
    return isBeforeMin || isAfterMax
  }

  return (
    <div
      className={cn(
        'date-picker',
        disabled && 'date-picker--disabled',
        background === 'light' && 'date-picker--light',
        className,
      )}
    >
      {label && <label className="date-picker__label">{label}</label>}
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant={background === 'light' ? 'secondary-light' : 'secondary'}
            disabled={disabled}
            className={cn(
              'date-picker__trigger w-full justify-between font-normal',
              !value && 'text-[var(--text-placeholder)]',
              error && 'border-[var(--border-error)]',
              triggerClassName,
            )}
          >
            {value ? value.toLocaleDateString('en-GB') : placeholder}
            <div className="flex items-center justify-center h-full ml-2">
              <ChevronDownIcon className="h-4 w-4 text-[var(--icon-default)]" />
            </div>
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="w-auto overflow-hidden p-0 rounded-sm border border-[var(--border-subtle)] bg-[var(--surface-primary)]"
          align="start"
        >
          <Calendar
            mode="single"
            selected={value}
            captionLayout="dropdown"
            onSelect={handleSelect}
            startMonth={startMonth}
            endMonth={endMonth}
            disabled={disabledDates}
            defaultMonth={value || new Date()}
          />
        </PopoverContent>
      </Popover>
      {error && (
        <div className="date-picker__error" role="alert">
          <AlertCircle className="date-picker__error-icon" />
          <span>{error}</span>
        </div>
      )}
    </div>
  )
}
