import * as Icons from 'lucide-react'
import { type LucideIcon as LucideIconType } from 'lucide-react'

export const LucideIcon = ({
  name,
  size = 24,
  className = '',
}: {
  name: string
  size?: number | string
  className?: string
}) => {
  // Lucide icon names like `Building2` use trailing digits; the regex strips
  // any `-X` separator and uppercases a following letter (digits pass through).
  const iconName =
    name.charAt(0).toUpperCase() + name.slice(1).replace(/-(.)/g, (_, c) => c.toUpperCase())
  const Icon = (Icons as unknown as Record<string, LucideIconType>)[iconName]

  return Icon ? <Icon size={size} className={className} /> : null
}
