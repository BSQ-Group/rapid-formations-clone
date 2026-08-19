export type SemanticTag =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'p'
  | 'span'
  | 'div'
  | 'section'
  | 'article'
  | 'aside'
  | 'label'
  | 'a'
  | 'dt'
  | 'dd'

export type TextProps = {
  asChild?: boolean
  as?: SemanticTag
  text?: string | string[]
  textStyle?:
    | 'headline-xl'
    | 'headline-2xl'
    | 'headline-3xl'
    | 'headline-4xl'
    | 'headline-5xl'
    | 'headline-6xl'
    | 'headline-7xl'
    | 'headline-8xl'
    | 'headline-9xl'
    | 'statistic-5xl'
    | 'statistic-7xl'
    | 'statistic-8xl'
    | 'body-xs'
    | 'body-sm'
    | 'body-base'
    | 'body-lg'
    | 'h1'
    | 'h2'
    | 'h3'
    | 'h4'
    | 'h5'
    | 'h6'
    | 'p-sm'
    | 'p'
    | 'p-lg'
    | 'span'
    | 'a'
    | 'animatedSpan'
    | 'label'
    | 'display-lg'
    | 'display-sm'
    | 'button'
  href?: string
  ref?: React.Ref<any>
  variant?: any
  className?: any | any[]
  onClick?: () => void
  'aria-hidden'?: React.AriaAttributes['aria-hidden']
  children?: React.ReactNode
  icons?: {
    iconBefore?: React.ReactNode
    iconAfter?: React.ReactNode
  }
}

export const usePTag = [
  'button',
  'p-sm',
  'p',
  'p-lg',
  'display-sm',
  'display-lg',
  'headline-xl',
  'headline-2xl',
  'headline-3xl',
  'headline-4xl',
  'headline-5xl',
  'headline-6xl',
  'headline-7xl',
  'headline-8xl',
  'headline-9xl',
  'statistic-5xl',
  'statistic-7xl',
  'statistic-8xl',
  'body-xs',
  'body-sm',
  'body-base',
  'body-lg',
]
export type TextTag = Omit<TextProps['textStyle'], (typeof usePTag)[number]>
