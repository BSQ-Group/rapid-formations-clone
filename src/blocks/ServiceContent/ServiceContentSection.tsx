import React from 'react'
import { faAngleRight } from '@fortawesome/pro-solid-svg-icons/faAngleRight'
import { faCheck } from '@fortawesome/pro-solid-svg-icons/faCheck'

import type { ServiceContentBlock } from '@/payload-types'

import RichText from '@/components/RichText'
import { FaIcon } from '@/components/shared/FaIcon'
import { Media } from '@/components/Media'
import { VideoModal } from '@/components/shared/VideoModal'
import { cn } from '@/utilities/ui'
import { serviceContentStyles as s } from './ServiceContent.styles'

type Section = NonNullable<ServiceContentBlock['sections']>[number]

const icons = { check: faCheck, chevron: faAngleRight } as const

type LexicalNode = { type?: string; text?: string; children?: LexicalNode[] }

/** First heading in the section's copy, used to name the video when no title is set. */
const firstHeading = (content: Section['content']): string => {
  const nodes = (content?.root?.children ?? []) as LexicalNode[]
  for (const node of nodes) {
    if (node.type !== 'heading') continue
    const text = (node.children ?? [])
      .map((child) => (typeof child.text === 'string' ? child.text : ''))
      .join('')
      .trim()
    if (text) return text
  }
  return ''
}

const colours = {
  green: s.iconGreen,
  subtle: s.iconSubtle,
  inherit: s.iconInherit,
} as const

export const ServiceContentSection: React.FC<{ section: Section; lead?: boolean }> = ({
  section,
  lead,
}) => {
  const name = section.icon && section.icon !== 'none' ? section.icon : undefined
  const icon = name ? icons[name] : undefined

  const still = section.videoStill ? (
    <Media
      resource={section.videoStill}
      htmlElement={null}
      pictureClassName={s.stillPicture}
      imgClassName={s.still}
      size={s.stillSizes}
    />
  ) : null
  const videoLabel = section.videoTitle?.trim() || firstHeading(section.content)

  const video = still && (
    <div className={cn(s.videoWrap, section.videoPosition === 'above' && s.videoWrapLead)}>
      {section.videoUrl ? (
        <VideoModal
          videoUrl={section.videoUrl}
          title={videoLabel}
          triggerLabel={`Play video: ${videoLabel}`}
          playIconClassName={s.playIcon}
        >
          {still}
        </VideoModal>
      ) : (
        still
      )}
    </div>
  )

  return (
    <div className={s.item}>
      {section.videoPosition === 'above' && video}
      <RichText
        data={section.content}
        enableGutter={false}
        enableProse={false}
        className={cn(s.content, lead && s.leadHeading, icon ? s.iconList : s.bulleted)}
        listItemIcon={
          icon ? (
            <FaIcon
              icon={icon}
              className={cn(s.icon, colours[section.iconColour ?? 'inherit'] ?? s.iconInherit)}
            />
          ) : undefined
        }
      />
      {section.videoPosition !== 'above' && video}
    </div>
  )
}
