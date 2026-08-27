import type { Field, TextField, TextFieldSingleValidation } from 'payload'

import deepMerge from '@/utilities/deepMerge'

const HEX = /^#[0-9a-fA-F]{6}$/
const MESSAGE = 'Enter a six-digit hex colour, e.g. #00BCED'

export const isHexColour: TextFieldSingleValidation = (value, { required }) => {
  if (value === undefined || value === null || value === '') return required ? MESSAGE : true
  return typeof value === 'string' && HEX.test(value) ? true : MESSAGE
}

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
