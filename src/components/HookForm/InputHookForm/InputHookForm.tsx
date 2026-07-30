import React from 'react'
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { cn } from '@/utilities/ui'
import type { Control, FieldPath, FieldValues, RegisterOptions } from 'react-hook-form'

export type InputHookFormProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  name: TName
  control: Control<TFieldValues>
  label?: string
  placeholder?: string
  type?: React.HTMLInputTypeAttribute
  rules?: RegisterOptions<TFieldValues, TName>
  className?: string
  inputClassName?: string
  disabled?: boolean
  autoFocus?: boolean
}

export function InputHookForm<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  name,
  control,
  label,
  placeholder,
  type = 'text',
  rules,
  className,
  inputClassName,
  disabled,
  autoFocus,
}: InputHookFormProps<TFieldValues, TName>) {
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
            <Input
              {...field}
              type={type}
              placeholder={placeholder}
              disabled={disabled}
              autoFocus={autoFocus}
              className={inputClassName}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
