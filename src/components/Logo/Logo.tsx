import { getBrand, getDomainConfig, Brand } from '@/lib/brand'
import { cn } from '@/utilities/ui'
import type { FC, SVGProps } from 'react'
import QCFLogoSvg from '@/public/images/QCF-logo-icon.svg'
import RFLogoSvg from '@/public/images/RF-logo.svg'
import FirstFormationsLogoSvg from '@/public/images/1F-logo.svg'

type SvgComponent = FC<SVGProps<SVGSVGElement>>

const brandLogoMap: Record<Brand, SvgComponent> = {
  [Brand.QualityCompanyFormations]: QCFLogoSvg,
  [Brand.RapidFormations]: RFLogoSvg,
  [Brand.FirstFormations]: FirstFormationsLogoSvg,
}

interface Props {
  className?: string
  fill?: string
}

export const Logo = ({ className, fill = 'white' }: Props) => {
  const brand = getBrand()
  const config = getDomainConfig(brand)
  const LogoSvg = brandLogoMap[brand]

  return <LogoSvg aria-label={config.alt} fill={fill} className={cn('h-11 w-auto', className)} />
}
