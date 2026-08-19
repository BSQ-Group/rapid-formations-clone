import type { Field, GroupField } from 'payload'

import deepMerge from '@/utilities/deepMerge'

export const SECTION_BACKGROUND_VALUES = ['light', 'dark', 'inverse'] as const
export const SECTION_SPACING_VALUES = ['none', 'xs', 's', 'm', 'l', 'xl', 'xxl'] as const

export const SECTION_GAP_VALUES = ['inherit', 'xs', 'sm', 's', 'm', 'l'] as const
export type SectionGap = (typeof SECTION_GAP_VALUES)[number]

export type SectionBackground = (typeof SECTION_BACKGROUND_VALUES)[number]
export type SectionSpacing = (typeof SECTION_SPACING_VALUES)[number]

export type SectionLayoutValue = {
  background?: SectionBackground | null
  paddingTop?: SectionSpacing | null
  paddingBottom?: SectionSpacing | null
  gap?: SectionGap | null
}

type SectionLayoutOptions = {
  gap?: boolean
  defaults?: Partial<{
    background: SectionBackground
    paddingTop: SectionSpacing
    paddingBottom: SectionSpacing
    gap: SectionGap
  }>
  overrides?: Partial<GroupField>
}

const spacingOptions = SECTION_SPACING_VALUES.map((value) => ({
  label: value.toUpperCase(),
  value,
}))

const gapField = (defaultValue: SectionGap = 'inherit'): Field => ({
  name: 'gap',
  type: 'select',
  label: 'Gap below section',
  defaultValue,
  options: [...SECTION_GAP_VALUES],
  admin: {
    description:
      "Space between this section and the next, reproducing the source page wrapper. INHERIT keeps the block's own margin; XS 25px, SM 30px, S 75px, M 50/75/110, L 70/140.",
  },
})

export const sectionLayoutField = ({
  gap,
  defaults,
  overrides,
}: SectionLayoutOptions = {}): Field => {
  const base: GroupField = {
    name: 'sectionLayout',
    type: 'group',
    label: 'Section layout',
    admin: {
      description:
        'Outer background tone + top/bottom section padding (BSQ Spacing/Section tokens, responsive).',
    },
    fields: [
      {
        name: 'background',
        type: 'select',
        label: 'Background',
        defaultValue: defaults?.background ?? 'light',
        required: true,
        options: [
          { label: 'Light', value: 'light' },
          { label: 'Dark', value: 'dark' },
          { label: 'Inverse', value: 'inverse' },
        ],
      },
      {
        name: 'paddingTop',
        type: 'select',
        label: 'Padding top',
        defaultValue: defaults?.paddingTop ?? 'm',
        required: true,
        options: spacingOptions,
      },
      {
        name: 'paddingBottom',
        type: 'select',
        label: 'Padding bottom',
        defaultValue: defaults?.paddingBottom ?? 'm',
        required: true,
        options: spacingOptions,
      },
      ...(gap ? [gapField(defaults?.gap)] : []),
    ],
  }

  return overrides ? deepMerge(base, overrides) : base
}
