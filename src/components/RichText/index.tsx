import React from 'react'

import { MediaBlock } from '@/blocks/MediaBlock/Component'
import {
  DefaultNodeTypes,
  SerializedBlockNode,
  SerializedLinkNode,
  type DefaultTypedEditorState,
} from '@payloadcms/richtext-lexical'
import {
  JSXConvertersFunction,
  LinkJSXConverter,
  RichText as ConvertRichText,
} from '@payloadcms/richtext-lexical/react'

import { CodeBlock, CodeBlockProps } from '@/blocks/Code/Component'
import { DocumentsListDialog } from '@/components/shared/DocumentsListDialog'
import { EligibleCountriesDialog } from '@/components/shared/EligibleCountriesDialog'
import { LiveChatButton } from '@/blocks/ContactUs/LiveChatButton'
import {
  DOCUMENT_LIBRARY_HREF,
  ELIGIBLE_COUNTRIES_HREF,
  LIVE_CHAT_HREF,
  TELEPHONE_HREF,
  type DocumentList,
  type EligibleCountries,
} from '@/utilities/shortcodes'
import { faPhoneFlip } from '@fortawesome/pro-solid-svg-icons/faPhoneFlip'
import { FaIcon } from '@/components/shared/FaIcon'

import type {
  BannerBlock as BannerBlockProps,
  CallToActionBlock as CTABlockProps,
  MediaBlock as MediaBlockProps,
} from '@/payload-types'
import { BannerBlock } from '@/blocks/Banner/Component'
import { CallToActionBlock } from '@/blocks/CallToAction/Component'
import { cn } from '@/utilities/ui'

type NodeTypes =
  | DefaultNodeTypes
  | SerializedBlockNode<CTABlockProps | MediaBlockProps | BannerBlockProps | CodeBlockProps>

const internalDocToHref = ({ linkNode }: { linkNode: SerializedLinkNode }) => {
  const { value, relationTo } = linkNode.fields.doc!
  if (typeof value !== 'object') {
    throw new Error('Expected value to be an object')
  }
  const slug = value.slug
  return relationTo === 'posts' ? `/posts/${slug}` : `/${slug}`
}

const inlineTrigger =
  'inline cursor-pointer border-none bg-transparent p-0 font-[inherit] [font-size:inherit] [line-height:inherit] text-[var(--text-brand-cyan)]'

const linkConverters = LinkJSXConverter({ internalDocToHref })

type LinkConverter = (args: { node: SerializedLinkNode }) => React.ReactNode

const convertLink = linkConverters.link as LinkConverter | undefined

const sentinelLinks: Record<string, (label: string, payload?: unknown) => React.ReactNode> = {
  [LIVE_CHAT_HREF]: (label) => <LiveChatButton label={label} className={inlineTrigger} />,
  [ELIGIBLE_COUNTRIES_HREF]: (label, payload) => {
    const { lastUpdated, countries } = (payload ?? { countries: [] }) as EligibleCountries
    return (
      <EligibleCountriesDialog
        label={label}
        lastUpdated={lastUpdated}
        countries={countries}
        className={inlineTrigger}
      />
    )
  },
  [DOCUMENT_LIBRARY_HREF]: (label, payload) => {
    const { sections } = (payload ?? { sections: [] }) as DocumentList
    return <DocumentsListDialog label={label} sections={sections} className={inlineTrigger} />
  },
}

// The source styles a telephone that stands alone in its paragraph as a
// call-to-action — phone icon, 28px, cyan — while one sitting inside a sentence
// stays an ordinary inline link. The distinction is structural, not authored, so
// it is derived here rather than needing a second shortcode.
const telephoneLead = 'flex items-center text-[28px] leading-none text-[var(--text-brand-cyan)]'
const telephoneLeadIcon = 'mr-2 h-[21px] w-[21px] shrink-0'

const isLoneTelephone = (node: { children?: unknown[] }) => {
  const meaningful = (node.children ?? []).filter((child) => {
    const item = child as { type?: string; text?: string }
    return item.type !== 'text' || Boolean(item.text?.trim())
  })
  if (meaningful.length !== 1) return false
  const only = meaningful[0] as SerializedLinkNode
  return only?.type === 'link' && only.fields?.url === TELEPHONE_HREF
}

const INDENT_STEP_PX = 16

const indentStyle = (node: { indent?: number }) => {
  const indent = Number(node.indent) || 0
  return indent ? { paddingInlineStart: `${indent * INDENT_STEP_PX}px` } : undefined
}

const buildConverters =
  (listItemIcon?: React.ReactNode): JSXConvertersFunction<NodeTypes> =>
  ({ defaultConverters }) => ({
    ...defaultConverters,
    ...linkConverters,
    link: (args) => {
      const sentinel = sentinelLinks[args.node.fields?.url ?? '']
      if (!sentinel) return convertLink?.(args as { node: SerializedLinkNode })
      return sentinel(
        args.node.children.map((child) => (child as { text?: string }).text ?? '').join(''),
        (args.node.fields as { payload?: unknown }).payload,
      )
    },
    listitem: ({ node, nodesToJSX }) => {
      const children = nodesToJSX({ nodes: node.children })
      const isNestedListWrapper =
        node.children.length > 0 && node.children.every((child) => child.type === 'list')
      if (isNestedListWrapper) {
        return (
          <li className="nestedListItem" style={{ listStyleType: 'none' }}>
            {children}
          </li>
        )
      }
      if (!listItemIcon) return <li>{children}</li>
      return (
        <li>
          {listItemIcon}
          <span>{children}</span>
        </li>
      )
    },
    paragraph: ({ node, nodesToJSX }) => {
      const children = nodesToJSX({ nodes: node.children })
      if (isLoneTelephone(node)) {
        return (
          <p style={indentStyle(node)} className={telephoneLead}>
            <FaIcon icon={faPhoneFlip} className={telephoneLeadIcon} />
            {children}
          </p>
        )
      }
      return <p style={indentStyle(node)}>{children?.length ? children : <br />}</p>
    },
    list: (args) => {
      const convertList = defaultConverters.list as
        | ((a: typeof args) => React.ReactNode)
        | undefined
      const rendered = convertList?.(args)
      return React.isValidElement<{ style?: React.CSSProperties }>(rendered)
        ? React.cloneElement(rendered, { style: indentStyle(args.node) })
        : rendered
    },
    blocks: {
      banner: ({ node }) => <BannerBlock className="col-start-2 mb-4" {...node.fields} />,
      mediaBlock: ({ node }) => (
        <MediaBlock
          className="col-start-1 col-span-3"
          imgClassName="m-0"
          {...node.fields}
          captionClassName="mx-auto max-w-[48rem]"
          enableGutter={false}
          disableInnerContainer={true}
        />
      ),
      code: ({ node }) => <CodeBlock className="col-start-2" {...node.fields} />,
      cta: ({ node }) => <CallToActionBlock {...node.fields} />,
    },
  })

const defaultJsxConverters = buildConverters()

type Props = {
  data: DefaultTypedEditorState
  enableGutter?: boolean
  enableProse?: boolean
  listItemIcon?: React.ReactNode
} & React.HTMLAttributes<HTMLDivElement>

export default function RichText(props: Props) {
  const { className, enableProse = true, enableGutter = true, listItemIcon, ...rest } = props
  return (
    <ConvertRichText
      converters={listItemIcon ? buildConverters(listItemIcon) : defaultJsxConverters}
      className={cn(
        'payload-richtext',
        {
          container: enableGutter,
          'max-w-none': !enableGutter,
          'mx-auto prose md:prose-md dark:prose-invert': enableProse,
        },
        className,
      )}
      {...rest}
    />
  )
}
