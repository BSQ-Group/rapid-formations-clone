import type { SectionBackground, SectionSpacing } from '@/fields/sectionLayout'

export const sectionWrapperStyles = {
  base: 'w-full',
  background: {
    light: 'bg-[var(--surface-primary)]',
    dark: 'bg-[var(--surface-canvas)]',
    inverse: 'bg-[var(--surface-canvas-inverse)]',
  } satisfies Record<SectionBackground, string>,
  paddingTop: {
    none: 'pt-0',
    xs: 'pt-[var(--section-spacing-xs)]',
    s: 'pt-[var(--section-spacing-s)]',
    m: 'pt-[var(--section-spacing-m)]',
    l: 'pt-[var(--section-spacing-l)]',
    xl: 'pt-[var(--section-spacing-xl)]',
    xxl: 'pt-[var(--section-spacing-xxl)]',
  } satisfies Record<SectionSpacing, string>,
  paddingBottom: {
    none: 'pb-0',
    xs: 'pb-[var(--section-spacing-xs)]',
    s: 'pb-[var(--section-spacing-s)]',
    m: 'pb-[var(--section-spacing-m)]',
    l: 'pb-[var(--section-spacing-l)]',
    xl: 'pb-[var(--section-spacing-xl)]',
    xxl: 'pb-[var(--section-spacing-xxl)]',
  } satisfies Record<SectionSpacing, string>,
} as const
