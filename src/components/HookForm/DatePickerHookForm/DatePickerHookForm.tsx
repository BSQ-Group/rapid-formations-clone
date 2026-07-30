'use client'

import React from 'react'
import { FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { DatePicker } from '@/components/shared/DatePicker/DatePicker'
import { cn } from '@/utilities/ui'
import type { Control, Controller, FieldPath, FieldValues } from 'react-hook-form'
import { Controller as RHFController } from 'react-hook-form'
import type { DatePickerProps } from '@/components/shared/DatePicker/DatePicker'

export type DatePickerHookFormProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = Omit<DatePickerProps, 'value' | 'onChange' | 'error'> & {
  name: TName
  control: Control<TFieldValues>
  label?: string
  error?: string
  className?: string
}

const parseDate = (dateString?: string): Date | undefined => {
  if (!dateString) return undefined

  if (dateString.match(/^\d{4}-\d{2}-\d{2}$/)) {
    const parts = dateString.split('-')
    return new Date(
      parseInt(parts[0] ?? '0', 10),
      parseInt(parts[1] ?? '0', 10) - 1,
      parseInt(parts[2] ?? '0', 10),
    )
  }

  return undefined
}

const formatDate = (date?: Date): string => {
  if (!date) return ''
  const year = date.getFullYear().toString()
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const day = date.getDate().toString().padStart(2, '0')
  return `${year}-${month}-${day}`
}

export function DatePickerHookForm<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  name,
  control,
  label,
  error,
  className,
  ...datePickerProps
}: DatePickerHookFormProps<TFieldValues, TName>) {
  return (
    <FormItem className={cn('w-full', className)}>
      {label && (
        <FormLabel className="text-sm font-medium text-[var(--text-strong)]">{label}</FormLabel>
      )}
      <RHFController
        name={name}
        control={control}
        render={({ field }) => (
          <DatePicker
            {...datePickerProps}
            value={parseDate(field.value)}
            onChange={(date) => field.onChange(formatDate(date))}
            error={error}
          />
        )}
      />
      <FormMessage />
    </FormItem>
  )
}
