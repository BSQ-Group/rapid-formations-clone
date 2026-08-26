import type { EmailField } from '@payloadcms/plugin-form-builder/types'
import type { FieldErrorsImpl, FieldValues, UseFormRegister } from 'react-hook-form'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React from 'react'

import { Error } from '../Error'
import { Width } from '../Width'

export const Email: React.FC<
  EmailField & {
    errors: Partial<FieldErrorsImpl>
    placeholder?: string
    register: UseFormRegister<FieldValues>
  }
> = ({ name, defaultValue, errors, label, placeholder, register, required, width }) => {
  return (
    <Width width={width}>
      <Label htmlFor={name} variant="onLight">
        {label}
        {label && ':'}
      </Label>
      <Input
        aria-required={required || undefined}
        defaultValue={defaultValue}
        id={name}
        placeholder={placeholder || undefined}
        type="text"
        {...register(name, { pattern: /^\S[^\s@]*@\S+$/, required })}
        variant="onLight"
      />
      {errors[name] && <Error name={name} />}
    </Width>
  )
}
