export enum Brand {
  FirstFormations = '1stformations',
  RapidFormations = 'rapidformations',
  QualityCompanyFormations = 'qualitycompanyformations',
}

export const VALID_BRANDS: Brand[] = [
  Brand.FirstFormations,
  Brand.RapidFormations,
  Brand.QualityCompanyFormations,
]

export const DEFAULT_BRAND = Brand.RapidFormations

export function isValidBrand(value: string | undefined): value is Brand {
  return !!value && VALID_BRANDS.includes(value as Brand)
}

export interface DomainConfig {
  alt: string
  logoPath: string
  logoOnDarkPath?: string
  siteName: string
  tenantId: string
}

export const domainsConfigMap: Record<Brand, DomainConfig> = {
  [Brand.FirstFormations]: {
    alt: '1st Formations',
    logoPath: '/images/1F-logo.svg',
    siteName: '1st Formations',
    tenantId: 'first-80qgf',
  },
  [Brand.QualityCompanyFormations]: {
    alt: 'Quality Company Formations',
    logoPath: '/images/QCF-logo-icon.svg',
    siteName: 'Quality Company Formations',
    tenantId: 'quality-company-7a0c3',
  },
  [Brand.RapidFormations]: {
    alt: 'Rapid Formations Ltd Logo',
    logoPath: '/images/RF-logo.png',
    logoOnDarkPath: '/images/RF-logo-on-dark.png',
    siteName: 'Rapid Formations',
    tenantId: 'rapid-90xzd',
  },
}

export function getLogoPath(config: DomainConfig, onDark: boolean): string {
  return onDark ? (config.logoOnDarkPath ?? config.logoPath) : config.logoPath
}

export function getDomainConfig(brand: Brand | string): DomainConfig {
  return domainsConfigMap[brand as Brand] ?? domainsConfigMap[DEFAULT_BRAND]
}

export function getBrand(): Brand {
  const envBrand = process.env.NEXT_PUBLIC_BRAND
  return isValidBrand(envBrand) ? envBrand : DEFAULT_BRAND
}
