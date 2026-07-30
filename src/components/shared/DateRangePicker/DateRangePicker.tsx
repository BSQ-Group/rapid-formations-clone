'use client'

import * as React from 'react'
import { DateRange } from 'react-day-picker'
import { Calendar } from '@/components/ui/calendar'
import { cn } from '@/utilities/ui'
import { Select, SelectOption } from '@/components/shared/Select'
import './DateRangePicker.css'

type DateRangeValue = 'last-30-days' | 'last-7-days' | 'yesterday' | 'today' | 'custom' | string

const baseDateRangeOptions: SelectOption[] = [
  { value: 'last-30-days', label: 'Last 30 days' },
  { value: 'last-7-days', label: 'Last 7 days' },
  { value: 'yesterday', label: 'Yesterday' },
  { value: 'today', label: 'Today' },
  { value: 'custom', label: 'Custom' },
]

export interface DateRangePickerProps {
  value?: DateRange
  onChange?: (range: DateRange | undefined) => void
  placeholder?: string
  disabled?: boolean
  className?: string
}

export function DateRangePicker({
  value,
  onChange,
  placeholder = 'Select date range',
  disabled = false,
  className,
}: DateRangePickerProps) {
  const [calendarOpen, setCalendarOpen] = React.useState(false)
  const [selectedValue, setSelectedValue] = React.useState<DateRangeValue>('last-30-days')
  const calendarRef = React.useRef<HTMLDivElement>(null)

  const formatDateRange = React.useCallback(
    (range?: DateRange): string => {
      if (!range?.from) return placeholder

      if (!range.to) {
        return range.from.toLocaleDateString('en-GB', {
          day: 'numeric',
          month: 'short',
        })
      }

      const fromStr = range.from.toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short',
      })
      const toStr = range.to.toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short',
      })

      return `${fromStr} - ${toStr}`
    },
    [placeholder],
  )

  // Create dynamic options that include custom date range when selected
  const dateRangeOptions = React.useMemo(() => {
    const options = [...baseDateRangeOptions]

    // If we have a custom date range selected, replace the 'custom' option with the formatted range
    if (selectedValue === 'custom' && value && value.from && value.to) {
      const customIndex = options.findIndex((opt) => opt.value === 'custom')
      if (customIndex !== -1) {
        options[customIndex] = {
          value: 'custom',
          label: formatDateRange(value),
        }
      }
    }

    return options
  }, [selectedValue, value, formatDateRange])

  // Close calendar when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (calendarRef.current && !calendarRef.current.contains(event.target as Node)) {
        setCalendarOpen(false)
      }
    }

    if (calendarOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }

    return () => {} // No-op cleanup when calendar is closed
  }, [calendarOpen])

  // Calculate date ranges for predefined options
  const getDateRange = (option: string): DateRange | undefined => {
    const today = new Date()
    const yesterday = new Date(today)
    yesterday.setDate(yesterday.getDate() - 1)

    switch (option) {
      case 'last-30-days':
        const thirtyDaysAgo = new Date(today)
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
        return { from: thirtyDaysAgo, to: today }
      case 'last-7-days':
        const sevenDaysAgo = new Date(today)
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)
        return { from: sevenDaysAgo, to: today }
      case 'yesterday':
        return { from: yesterday, to: yesterday }
      case 'today':
        return { from: today, to: today }
      default:
        return undefined
    }
  }

  const handleSelectChange = (newValue: string) => {
    // If user clicks on a custom date range (formatted dates), treat it as selecting custom
    if (newValue === 'custom' && selectedValue === 'custom' && value) {
      setCalendarOpen(true)
      return
    }

    const rangeValue = newValue as DateRangeValue
    setSelectedValue(rangeValue)

    if (rangeValue === 'custom') {
      setCalendarOpen(true)
    } else {
      const range = getDateRange(rangeValue)
      onChange?.(range)
      setCalendarOpen(false)
    }
  }

  const handleCalendarSelect = (range: DateRange | undefined) => {
    onChange?.(range)
    // Close calendar only when we have a complete range (different from and to dates)
    if (range?.from && range?.to && range.from.getTime() !== range.to.getTime()) {
      setCalendarOpen(false)
    }
  }

  // Determine the current select value
  const getCurrentSelectValue = (): string => {
    // Always return a value that's in the options array
    // For custom ranges, keep it as 'custom' so Select shows "Custom"
    return selectedValue
  }

  return (
    <div className={cn('date-range-picker', disabled && 'date-range-picker--disabled', className)}>
      <div className="date-range-picker__select-wrapper">
        <Select
          options={dateRangeOptions}
          value={getCurrentSelectValue()}
          onValueChange={handleSelectChange}
          placeholder={placeholder}
          size="small"
          disabled={disabled}
          triggerClassName="date-range-picker__trigger"
          contentClassName="date-range-picker__dropdown"
          itemClassName="date-range-picker__option"
        />

        {selectedValue === 'custom' && calendarOpen && (
          <div ref={calendarRef} className="date-range-picker__calendar-wrapper">
            <div className="date-range-picker__popover">
              <Calendar
                mode="range"
                selected={value}
                onSelect={handleCalendarSelect}
                numberOfMonths={1}
                defaultMonth={value?.from || new Date()}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
