'use client'

import React, { useId, useState, useSyncExternalStore } from 'react'

import type { Footer as FooterType } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import Text from '@/components/shared/Text'
import { cn } from '@/utilities/ui'
import { footerStyles as s } from './Footer.styles'
import { MinusIcon, PlusIcon } from './icons'

type LinkColumn = NonNullable<FooterType['linkColumns']>[number]

const DESKTOP_QUERY = '(min-width: 1023px)'

const subscribeToDesktop = (onChange: () => void) => {
  const query = window.matchMedia(DESKTOP_QUERY)
  query.addEventListener('change', onChange)
  return () => query.removeEventListener('change', onChange)
}

const getIsDesktop = () => window.matchMedia(DESKTOP_QUERY).matches

const getIsDesktopOnServer = () => false

export function FooterLinkColumn({ column }: { column: LinkColumn }) {
  const [isOpen, setIsOpen] = useState(false)
  const panelId = useId()
  const isDesktop = useSyncExternalStore(subscribeToDesktop, getIsDesktop, getIsDesktopOnServer)
  const heading = <Text text={column.heading} textStyle="span" className={s.columnTitle} />

  return (
    <div className={s.column}>
      <h2>
        {isDesktop ? (
          <span className={s.columnHeader}>{heading}</span>
        ) : (
          <button
            type="button"
            className={s.columnHeader}
            onClick={() => setIsOpen((open) => !open)}
            aria-expanded={isOpen}
            aria-controls={panelId}
          >
            {heading}
            <span className={s.columnToggle}>
              <span className={s.columnToggleIcon}>
                {isOpen ? <MinusIcon title="Collapse" /> : <PlusIcon title="Expand" />}
              </span>
            </span>
          </button>
        )}
      </h2>
      <ul id={panelId} className={cn(s.columnList, isOpen ? s.columnListOpen : s.columnListClosed)}>
        {column.links?.map((item, i) => (
          <li key={i}>
            <CMSLink
              className={s.columnLink}
              label={item.link?.label}
              type={item.link?.type}
              reference={item.link?.reference}
              url={item.link?.url}
              newTab={item.link?.newTab}
              appearance="inline"
            />
          </li>
        ))}
      </ul>
    </div>
  )
}
