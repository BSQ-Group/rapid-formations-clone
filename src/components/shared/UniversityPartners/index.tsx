import React from 'react'

import type { Media as MediaDoc } from '@/payload-types'

import { Media } from '@/components/Media'
import Text from '@/components/shared/Text'
import { cn } from '@/utilities/ui'
import { universityPartnersStyles as s } from './UniversityPartners.styles'

export type UniversityPartner = {
  id?: string | null
  name: string
  logo?: (string | null) | MediaDoc
}

export type UniversityPartnersProps = {
  heading?: string | null
  universities: UniversityPartner[]
  layout?: 'rail' | 'row'
  className?: string
}

type PartnerWithLogo = UniversityPartner & { logo: MediaDoc }

const hasLogo = (partner: UniversityPartner): partner is PartnerWithLogo =>
  typeof partner.logo === 'object' && partner.logo !== null

export const UniversityPartners: React.FC<UniversityPartnersProps> = ({
  heading,
  universities,
  layout = 'row',
  className,
}) => {
  const shown = universities.filter(hasLogo)

  if (!shown.length) return null

  return (
    <div className={cn(s.group, className)}>
      {heading && <Text as="h3" textStyle="span" text={heading} className={s.heading} />}
      <div className={s[layout]}>
        {shown.map(({ id, name, logo }, index) => (
          <div key={id ?? `${name}-${index}`} className={s.partner}>
            <Media
              resource={logo}
              htmlElement={null}
              pictureClassName={s.picture}
              imgClassName={s.logo}
              size={s.logoSizes}
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </div>
  )
}
