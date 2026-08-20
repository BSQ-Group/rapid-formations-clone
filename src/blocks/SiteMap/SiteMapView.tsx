import React from 'react'
import { faAngleRight } from '@fortawesome/pro-solid-svg-icons/faAngleRight'

import type { DefaultTypedEditorState } from '@payloadcms/richtext-lexical'

import RichText from '@/components/RichText'
import { FaIcon } from '@/components/shared/FaIcon'
import Text from '@/components/shared/Text'
import { siteMapStyles as s } from './SiteMap.styles'

export type SiteMapSection = {
  id: string
  heading: string
  links: DefaultTypedEditorState
}

export const SiteMapView: React.FC<{ sections: SiteMapSection[] }> = ({ sections }) => (
  <div>
    {sections.map((section) => (
      <div key={section.id} className={s.item}>
        <Text as="h2" textStyle="span" text={section.heading} className={s.heading} />
        <RichText
          data={section.links}
          enableGutter={false}
          enableProse={false}
          className={s.links}
          listItemIcon={<FaIcon icon={faAngleRight} className={s.linkIcon} />}
        />
      </div>
    ))}
  </div>
)
