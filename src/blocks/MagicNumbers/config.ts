import type { ArrayFieldValidation, Block, NumberFieldSingleValidation } from 'payload'

import { hexColourField } from '@/fields/hexColour'
import { sectionLayoutField } from '@/fields/sectionLayout'
import { MAGIC_NUMBER_ICON_OPTIONS } from './icons'

const CONNECTOR_BASIS = 1170
const ICON_CENTRE = 25
const DRIFT_TOLERANCE = 6

type ConnectorRow = {
  placement?: { left?: number | null } | null
  connector?: {
    width?: number | null
    side?: 'left' | 'right' | null
    inset?: number | null
  } | null
}

const connectorsTrackTheirIcons: ArrayFieldValidation = (value) => {
  if (!Array.isArray(value) || value.length === 0) return true

  const rows = value as ConnectorRow[]

  const total = rows.reduce((sum, row) => sum + (row.connector?.width ?? 0), 0)
  if (Math.abs(total - 100) > 0.01) {
    return `Connector widths are shares of one row, so they have to add up to 100% — these add up to ${total}%.`
  }

  const drifted: string[] = []
  let cursor = 0

  rows.forEach((row, index) => {
    const width = row.connector?.width ?? 0
    const inset = row.connector?.inset ?? 0
    const start = (cursor / 100) * CONNECTOR_BASIS
    const span = (width / 100) * CONNECTOR_BASIS
    const line = row.connector?.side === 'right' ? start + span - inset : start + inset
    const icon = (row.placement?.left ?? 0) + ICON_CENTRE

    if (Math.abs(line - icon) > DRIFT_TOLERANCE) {
      drifted.push(`row ${index + 1} (line ${Math.round(line)}px, icon ${Math.round(icon)}px)`)
    }

    cursor += width
  })

  return drifted.length === 0
    ? true
    : `A connector no longer hangs under its icon: ${drifted.join(', ')}. Widths are measured in order from the left, so reordering, adding or deleting a row shifts every line after it while the items stay put.`
}

const oneVerticalEdge: NumberFieldSingleValidation = (value, { siblingData }) => {
  const hasBottom = typeof value === 'number'
  const hasTop = typeof (siblingData as { top?: unknown } | undefined)?.top === 'number'
  if (hasTop && hasBottom) {
    return 'Set Top or Bottom, not both. With both, CSS solves for height instead of position and the item pins to Top.'
  }
  return hasTop || hasBottom ? true : 'Set either Top or Bottom.'
}

export const MagicNumbers: Block = {
  slug: 'magicNumbers',
  interfaceName: 'MagicNumbersBlock',
  labels: { singular: 'Magic Numbers', plural: 'Magic Numbers' },
  fields: [
    {
      name: 'heading',
      type: 'text',
      required: true,
      defaultValue: "Rapid Formations' magic numbers",
    },
    { name: 'subheading', type: 'text' },
    {
      name: 'numbers',
      type: 'array',
      label: 'Numbers',
      minRows: 1,
      validate: connectorsTrackTheirIcons,
      admin: {
        initCollapsed: true,
        description:
          'A stacked list below 768px and a 2-up grid from there. From 1590px they are placed by hand at the offsets below, with the connector lines drawn between them.',
      },
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'icon',
              type: 'select',
              required: true,
              defaultValue: 'comments',
              options: MAGIC_NUMBER_ICON_OPTIONS,
              admin: {
                width: '50%',
                description:
                  'Add a new one by importing it in the block’s icons.ts; the list here follows.',
              },
            },
            hexColourField({
              admin: {
                width: '50%',
                description: 'Fills the icon circle and its connector line.',
              },
            }),
          ],
        },
        { name: 'heading', type: 'text', required: true },
        {
          name: 'body',
          type: 'textarea',
          admin: { description: 'Line breaks are preserved.' },
        },
        {
          name: 'placement',
          type: 'group',
          label: 'Placement from 1590px',
          admin: {
            description:
              'Ignored below 1590px, where the items are a plain grid. Set either Top or Bottom, not both.',
          },
          fields: [
            {
              type: 'row',
              fields: [
                { name: 'left', type: 'number', required: true, admin: { width: '34%' } },
                { name: 'top', type: 'number', admin: { width: '33%' } },
                {
                  name: 'bottom',
                  type: 'number',
                  validate: oneVerticalEdge,
                  admin: { width: '33%' },
                },
              ],
            },
          ],
        },
        {
          name: 'connector',
          type: 'group',
          label: 'Connector line',
          admin: {
            description:
              'The vertical rule under the row of items, drawn in the colour above. Also 1590px and up only.',
          },
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'width',
                  type: 'number',
                  required: true,
                  admin: { width: '25%', description: '% of the row' },
                },
                {
                  name: 'side',
                  type: 'select',
                  required: true,
                  defaultValue: 'left',
                  options: [
                    { label: 'From left', value: 'left' },
                    { label: 'From right', value: 'right' },
                  ],
                  admin: { width: '25%' },
                },
                { name: 'inset', type: 'number', required: true, admin: { width: '25%' } },
                { name: 'top', type: 'number', required: true, admin: { width: '25%' } },
              ],
            },
            { name: 'height', type: 'number', required: true },
          ],
        },
      ],
    },
    sectionLayoutField({
      gap: true,
      defaults: { background: 'light', paddingTop: 'none', paddingBottom: 'none', gap: 'lg' },
    }),
  ],
}
