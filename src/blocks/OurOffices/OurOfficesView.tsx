import React from 'react'
import Link from 'next/link'
import { faMapMarkerAlt } from '@fortawesome/pro-solid-svg-icons/faMapMarkerAlt'

import type { Media as MediaType } from '@/payload-types'

import { FaIcon } from '@/components/shared/FaIcon'
import { Media } from '@/components/Media'
import Text from '@/components/shared/Text'
import { ourOfficesStyles as s } from './OurOffices.styles'

export type OurOffice = {
  id: string
  image: MediaType | string | number
  focalX?: number | null
  address: string
  mapHref?: string
  mapLabel?: string | null
  mapNewTab?: boolean | null
}

export const OurOfficesView: React.FC<{ heading: string; offices: OurOffice[] }> = ({
  heading,
  offices,
}) => (
  <div>
    <div className={s.titleWrap}>
      <Text as="h2" textStyle="span" text={heading} className={s.heading} />
    </div>
    <div className={s.grid}>
      {offices.map((office) => (
        <div key={office.id} className={s.office}>
          <div
            className={s.imageWrap}
            style={{ '--photo-focus': `${office.focalX ?? 50}% 50%` } as React.CSSProperties}
          >
            <Media
              resource={office.image}
              imgClassName={s.image}
              size="(min-width: 768px) 338px, 100vw"
            />
          </div>
          <div className={s.content}>
            <Text as="p" textStyle="span" text={office.address} className={s.address} />
            {office.mapLabel && (
              <div className={s.linkWrap}>
                <FaIcon icon={faMapMarkerAlt} className={s.marker} />
                <Link
                  href={office.mapHref ?? '#'}
                  target={office.mapNewTab ? '_blank' : undefined}
                  rel={office.mapNewTab ? 'noopener noreferrer' : undefined}
                  className={s.link}
                >
                  {office.mapLabel}
                </Link>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  </div>
)
