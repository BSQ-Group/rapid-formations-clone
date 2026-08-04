import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

import type { Footer as FooterType, Media as MediaType } from '@/payload-types'

import { getCachedGlobal } from '@/utilities/getGlobals'
import Text from '@/components/shared/Text'
import { footerStyles as s } from './Footer.styles'
import { FooterLinkColumn } from './FooterLinkColumn'
import { ScrollToTopButton } from './ScrollToTopButton'
import { socialIcons, type SocialPlatform } from './icons'

type MediaRef = MediaType | string | number | null | undefined

function asMedia(media: MediaRef): MediaType | null {
  return typeof media === 'object' && media !== null ? media : null
}

function isVector(media: MediaType): boolean {
  return media.mimeType?.includes('svg') ?? false
}

const NBSP = ' '

export async function Footer() {
  const footerData: FooterType = (await getCachedGlobal('footer', 2)()) as FooterType

  const {
    paymentIcons,
    socialLinks,
    linkColumns,
    parentCompanyPrefix,
    parentCompanyLogo,
    parentCompanyUrl,
    logo,
    companyName,
    registrationPrefix,
    address,
    addressUrl,
    companyNumber,
    icoNumber,
    vatNumber,
    accreditations,
    copyrightBrand,
    certificationPrefix,
    certificationLabel,
    certificationUrl,
  } = footerData || {}

  const brandLogo = asMedia(logo)
  const parentLogo = asMedia(parentCompanyLogo)
  const year = new Date().getFullYear()

  return (
    <footer className={s.section} itemType="https://schema.org/Organization">
      <ScrollToTopButton />
      <div className={s.container}>
        <div className={s.content}>
          <div className={s.iconsRow}>
            {paymentIcons && paymentIcons.length > 0 && (
              <div className={s.cardIcons}>
                {paymentIcons.map((card, i) => {
                  const icon = asMedia(card.icon)
                  if (!icon?.url) return null
                  return (
                    <Image
                      key={i}
                      src={icon.url}
                      alt={icon.alt || card.name}
                      title={icon.alt || card.name}
                      width={65}
                      height={45}
                      className={s.cardIcon}
                      unoptimized={isVector(icon)}
                    />
                  )
                })}
              </div>
            )}
            <div className={s.socialSlot}>
              {socialLinks && socialLinks.length > 0 && (
                <div className={s.socialIcons}>
                  {socialLinks.map((social, i) => {
                    const Icon = socialIcons[social.platform as SocialPlatform]
                    if (!Icon) return null
                    return (
                      <a
                        key={i}
                        href={social.url}
                        className={s.socialLink}
                        target="_blank"
                        rel="noreferrer"
                        title={`Social icon for ${social.platform}`}
                        aria-label={`Social icon for ${social.platform}`}
                        style={{ color: social.iconColor }}
                      >
                        <Icon className={s.socialIcon} />
                      </a>
                    )
                  })}
                </div>
              )}
            </div>
          </div>
          {linkColumns && linkColumns.length > 0 && (
            <div className={s.linkColumns}>
              {linkColumns.map((column, i) => (
                <FooterLinkColumn key={i} column={column} />
              ))}
            </div>
          )}
          <div className={s.companyRow}>
            <div className={s.company}>
              {parentLogo?.url && (
                <div className={s.companyBsq}>
                  <Text
                    text={parentCompanyPrefix ?? ''}
                    textStyle="span"
                    className="text-[var(--text-on-light-muted)]"
                  />
                  <Link
                    href={parentCompanyUrl || '#'}
                    target="_blank"
                    rel="noreferrer"
                    className={s.companyLogoLink}
                  >
                    <Image
                      src={parentLogo.url}
                      alt={parentLogo.alt || ''}
                      width={parentLogo.width || 333}
                      height={parentLogo.height || 62}
                      className={s.companyBsqLogo}
                      unoptimized={isVector(parentLogo)}
                    />
                  </Link>
                </div>
              )}
              {brandLogo?.url && (
                <Link href="/" title={companyName || undefined} className={s.companyLogoLink}>
                  <Image
                    src={brandLogo.url}
                    alt={brandLogo.alt || ''}
                    width={brandLogo.width || 560}
                    height={brandLogo.height || 56}
                    className={s.companyLogo}
                    unoptimized={isVector(brandLogo)}
                  />
                </Link>
              )}
              <div className={s.companyDetails}>
                <Text
                  text={`${companyName},${NBSP}`}
                  textStyle="span"
                  className={s.companyDetailLine}
                />
                <Text
                  text={registrationPrefix ?? ''}
                  textStyle="span"
                  className={s.companyDetailLine}
                />
                <div>
                  <Text
                    text={address ?? ''}
                    href={addressUrl || undefined}
                    textStyle="span"
                    className={s.companyDetailLink}
                  />
                </div>
                <Text
                  text={`Company Nr: ${companyNumber}.${NBSP}${NBSP}`}
                  textStyle="span"
                  className={s.companyDetailLine}
                />
                <Text
                  text={`ICO Registration Nr: <a class="${s.companyDetailLink}" href="https://ico.org.uk/ESDWebPages/Entry/${icoNumber}">${icoNumber}</a>.${NBSP}${NBSP}`}
                  textStyle="span"
                  className={s.companyDetailLine}
                />
                <Text
                  text={`VAT Registration Nr: ${vatNumber}${NBSP}`}
                  textStyle="span"
                  className={s.companyDetailLine}
                />
              </div>
            </div>
            <div aria-hidden="true" className={s.divider} />
            <div className={s.accreditationSlot}>
              {accreditations && accreditations.length > 0 && (
                <div className={s.accreditations}>
                  {accreditations.map((item, i) => {
                    const badge = asMedia(item.logo)
                    if (!badge?.url) return null
                    const width = item.displayWidth
                    const ratio = badge.width && badge.height ? badge.height / badge.width : 1
                    const image = (
                      <div className={s.accreditationBox} style={{ width: `${width}px` }}>
                        <Image
                          src={badge.url}
                          alt={badge.alt || item.name}
                          width={width}
                          height={Math.round(width * ratio)}
                          className={s.accreditationImage}
                          unoptimized={isVector(badge)}
                        />
                      </div>
                    )
                    return (
                      <div key={i} className={s.accreditation}>
                        {item.url ? (
                          <a
                            href={item.url}
                            target="_blank"
                            rel="noreferrer"
                            className={s.companyLogoLink}
                          >
                            {image}
                          </a>
                        ) : (
                          image
                        )}
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          </div>
          <div className={s.contacts}>
            <Text
              as="p"
              textStyle="span"
              className={s.copyright}
              text={`Copyright ${year} &copy; ${copyrightBrand} <span class="${s.copyrightReg}">&reg;</span><br />${certificationPrefix} <a class="${s.copyrightLink}" href="${certificationUrl}" rel="noreferrer">${certificationLabel}</a>`}
            />
          </div>
        </div>
      </div>
    </footer>
  )
}
