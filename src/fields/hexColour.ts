import type { Field, TextField, TextFieldSingleValidation } from 'payload'

import deepMerge from '@/utilities/deepMerge'

const HEX = /^#[0-9a-fA-F]{6}$/

export const isHexColour: TextFieldSingleValidation = (value) =>
  typeof value === 'string' && HEX.test(value) ? true : 'Enter a six-digit hex colour, e.g. #00BCED'

export const hexColourField = (overrides: Partial<TextField> = {}): Field =>
  deepMerge<TextField, Partial<TextField>>(
    {
      name: 'colour',
      type: 'text',
      label: 'Colour',
      required: true,
      maxLength: 7,
      validate: isHexColour,
    },
    overrides,
  )
