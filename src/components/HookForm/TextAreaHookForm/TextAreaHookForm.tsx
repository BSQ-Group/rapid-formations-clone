import React from 'react'
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form'
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/utilities/ui'
import type { Control, FieldPath, FieldValues, RegisterOptions } from 'react-hook-form'

export type TextAreaHookFormProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  name: TName
  control: Control<TFieldValues>
  label?: string
  placeholder?: string
  rules?: RegisterOptions<TFieldValues, TName>
  className?: string
  textareaClassName?: string
  disabled?: boolean
  rows?: number
}

export function TextAreaHookForm<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  name,
  control,
  label,
  placeholder,
  rules,
  className,
  textareaClassName,
  disabled,
  rows,
}: TextAreaHookFormProps<TFieldValues, TName>) {
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
            <Textarea
              {...field}
              placeholder={placeholder}
              disabled={disabled}
              rows={rows}
              className={textareaClassName}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
