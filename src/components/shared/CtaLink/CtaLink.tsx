import React from 'react'
import Link from 'next/link'

import { cn } from '@/utilities/ui'
import { ctaLinkStyles as s } from './CtaLink.styles'

export type CtaLinkProps = {
  href: string
  label: string
  newTab?: boolean | null
  size?: keyof typeof s.size
  tone?: keyof typeof s.tone
  block?: boolean
  icon?: React.ReactNode
  className?: string
}

export const CtaLink: React.FC<CtaLinkProps> = ({
  href,
  label,
  newTab,
  size = 'lg',
  tone = 'cyan',
  block = false,
  icon,
  className,
}) => (
  <Link
    href={href}
    target={newTab ? '_blank' : undefined}
    rel={newTab ? 'noopener noreferrer' : undefined}
    className={cn(s.base, s.tone[tone], s.size[size], block && s.block, className)}
  >
    {icon ? (
      <>
        <span className={s.icon}>{icon}</span>
        <span>{label}</span>
      </>
    ) : (
      label
    )}
  </Link>
)

export default CtaLink
