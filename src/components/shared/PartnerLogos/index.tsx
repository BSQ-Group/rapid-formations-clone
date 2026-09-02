import React from 'react'
import Image from 'next/image'

import type { PartnerLogo } from '@/utilities/shortcodes'

import { getMediaUrl } from '@/utilities/getMediaUrl'
import { cn } from '@/utilities/ui'
import { partnerLogosStyles as s } from './PartnerLogos.styles'

export type PartnerLogosProps = { partners: PartnerLogo[]; className?: string }

export const PartnerLogos: React.FC<PartnerLogosProps> = ({ partners, className }) => {
  if (!partners.length) return null

  return (
    <span className={cn(s.grid, className)}>
      {partners.map(({ name, url, width, height, tall }) => (
        <span key={name} className={s.cell}>
          <Image
            src={getMediaUrl(url)}
            alt={`${name} partner logo.`}
            width={width || 160}
            height={height || 40}
            className={cn(s.logo, tall && s.logoTall)}
            loading="lazy"
          />
        </span>
      ))}
    </span>
  )
}
