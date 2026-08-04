import React from 'react'
import type { IconDefinition } from '@fortawesome/fontawesome-svg-core'

import { cn } from '@/utilities/ui'

interface FaIconProps {
  icon: IconDefinition
  className?: string
  secondaryClassName?: string
  title?: string
}

export const FaIcon: React.FC<FaIconProps> = ({ icon, className, secondaryClassName, title }) => {
  const [width, height, , , pathData] = icon.icon
  const paths = Array.isArray(pathData) ? pathData : [pathData]
  const isDuotone = paths.length > 1

  return (
    <svg
      className={cn('shrink-0', className)}
      viewBox={`0 0 ${width} ${height}`}
      xmlns="http://www.w3.org/2000/svg"
      role={title ? 'img' : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
    >
      {paths.map((d, i) => (
        <path
          key={i}
          fill="currentColor"
          className={isDuotone && i === 0 ? cn('opacity-40', secondaryClassName) : undefined}
          d={d}
        />
      ))}
    </svg>
  )
}
