import type {
  LegacySectionGap,
  SectionBackground,
  SectionGap,
  SectionSpacing,
} from '@/fields/sectionLayout'

const flatGap = {
  xs: 'mb-[25px]',
  sm: 'mb-[30px]',
  md: 'mb-10',
  lg: 'mb-[50px]',
  xl: 'mb-[75px]',
  '2xl': 'mb-[100px]',
}

const responsiveGap = {
  section: 'mb-[50px] min-[1023px]:mb-[75px] min-[1590px]:mb-[110px]',
  sectionLarge: 'mb-[70px] md:mb-[140px]',
}

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
  gap: {
    inherit: '',
    ...flatGap,
    ...responsiveGap,
    s40: flatGap.md,
    s50: flatGap.lg,
    s: flatGap.xl,
    s100: flatGap['2xl'],
    m: responsiveGap.section,
    l: responsiveGap.sectionLarge,
  } satisfies Record<SectionGap | LegacySectionGap, string>,
} as const
