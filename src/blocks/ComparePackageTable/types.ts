import type { DefaultTypedEditorState } from '@payloadcms/richtext-lexical'

export type TablePackage = {
  id: string
  name: string
  slug: string
  price: string
  priceNote?: string | null
  ribbonText?: string | null
  whosItFor?: DefaultTypedEditorState | null
  shortDescription?: DefaultTypedEditorState | null
  buyHref: string
  buyNewTab?: boolean | null
  readMoreHref?: string | null
  readMoreLabel?: string | null
}

export type TableProduct = {
  id: string
  name: string
  tooltip?: DefaultTypedEditorState | null
  includedIn: string[]
}

export type TableData = {
  heading: string
  content?: DefaultTypedEditorState | null
  sameDayHeading?: string | null
  sameDayBody?: DefaultTypedEditorState | null
  footnote?: DefaultTypedEditorState | null
  packages: TablePackage[]
  products: TableProduct[]
}
