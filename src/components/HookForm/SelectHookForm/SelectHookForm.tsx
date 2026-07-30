import React from 'react'
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { cn } from '@/utilities/ui'
import type { Control, FieldPath, FieldValues, RegisterOptions } from 'react-hook-form'

export interface SelectOption {
  label: string
  value: string
}

export type SelectHookFormProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  name: TName
  control: Control<TFieldValues>
  label?: string
  placeholder?: string
  options: SelectOption[]
  rules?: RegisterOptions<TFieldValues, TName>
  className?: string
  triggerClassName?: string
  disabled?: boolean
  onValueChange?: (value: string) => void
}

export function SelectHookForm<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  name,
  control,
  label,
  placeholder,
  options,
  rules,
  className,
  triggerClassName,
  disabled,
  onValueChange,
}: SelectHookFormProps<TFieldValues, TName>) {
  return (
    <FormField
      control={control}
      name={name}
      rules={rules}
      render={({ field }) => (
        <FormItem className={cn('w-full', className)}>
          {label && (
            <FormLabel className="text-sm font-medium text-[var(--text-strong)]">{label}</FormLabel>
          )}
          <FormControl>
            <Select
              value={field.value}
              onValueChange={(value) => {
                field.onChange(value)
                onValueChange?.(value)
              }}
              disabled={disabled}
            >
              <SelectTrigger className={triggerClassName}>
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
              <SelectContent>
                {options.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
