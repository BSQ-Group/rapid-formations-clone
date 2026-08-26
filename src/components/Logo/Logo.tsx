import { getDomainConfig } from '@/lib/brand'
import { cn } from '@/utilities/ui'
import RFLogoSvg from '@/public/images/RF-logo.svg'

interface Props {
  className?: string
  fill?: string
}

export const Logo = ({ className, fill = 'white' }: Props) => {
  const config = getDomainConfig()

  return <RFLogoSvg aria-label={config.alt} fill={fill} className={cn('h-11 w-auto', className)} />
}
