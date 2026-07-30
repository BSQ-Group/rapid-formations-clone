import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

import type { Footer as FooterType, Media as MediaType } from '@/payload-types'

import { getCachedGlobal } from '@/utilities/getGlobals'
import Text from '@/components/shared/Text'
import { CMSLink } from '@/components/Link'
import { cn } from '@/utilities/ui'
import { footerStyles as s } from './Footer.styles'

type PolicyLinkItem = NonNullable<FooterType['policyLinks']>[number]

function getMediaUrl(media: MediaType | string | number | null | undefined): string {
  if (typeof media === 'object' && media?.url) return media.url
  return ''
}

function getMediaAlt(media: MediaType | string | number | null | undefined): string {
  if (typeof media === 'object' && media?.alt) return media.alt
  return ''
}

function FooterLink({ item, className }: { item: PolicyLinkItem; className?: string }) {
  return (
    <CMSLink
      className={cn(s.linkItem, className)}
      label={item.link?.label}
      type={item.link?.type}
      reference={item.link?.reference}
      url={item.link?.url}
      newTab={item.link?.newTab}
      appearance="inline"
    />
  )
}

export async function Footer() {
  const footerData: FooterType = (await getCachedGlobal('footer', 1)()) as FooterType

  const {
    logo,
    companyAddress,
    registrationDetails,
    policyLinksHeading,
    policyLinks,
    navigationLinksHeading,
    navigationColumns,
    socialLinks,
    copyrightText,
    copyrightSubtext,
    paymentIcons,
    certificationLogos,
  } = footerData || {}

  const logoUrl = getMediaUrl(logo)
  const logoAlt = getMediaAlt(logo) || 'Quality Company Formations'

  const allNavLinks =
    navigationColumns?.flatMap((col) => col.links?.map((item) => item) ?? []) ?? []

  return (
    <footer className={s.section}>
      <div className={s.container}>
        <div className={s.inner}>
          {/* ============ DESKTOP LAYOUT ============ */}
          <div className={s.desktopLayout}>
            {/* Top half */}
            <div className={s.desktopTop}>
              <div className={s.desktopLogoAndLinks}>
                {/* Logo + company details */}
                <div className={s.logoSection}>
                  {logoUrl && (
                    <div className={s.logo}>
                      <Image
                        src={logoUrl}
                        alt={logoAlt}
                        fill
                        className="object-contain object-left"
                        unoptimized
                      />
                    </div>
                  )}
                  <div className={s.companyDetails}>
                    {companyAddress && (
                      <Text
                        text={companyAddress}
                        textStyle="body-xs"
                        className="whitespace-pre-line"
                      />
                    )}
                    {registrationDetails && (
                      <Text
                        text={registrationDetails}
                        textStyle="body-xs"
                        className="whitespace-pre-line"
                      />
                    )}
                  </div>
                </div>

                {/* Link columns */}
                <div className={s.desktopLinkColumns}>
                  {/* Policy links column */}
                  {policyLinks && policyLinks.length > 0 && (
                    <div className={s.linkColumn}>
                      <Text
                        as="h3"
                        text={policyLinksHeading || 'Company'}
                        textStyle="body-sm"
                        className={s.linkColumnHeading}
                      />
                      <div className={s.linkList}>
                        {policyLinks.map((item, i) => (
                          <FooterLink key={i} item={item} />
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Navigation links column (merged) */}
                  {allNavLinks.length > 0 && (
                    <div className={s.linkColumn}>
                      <Text
                        as="h3"
                        text={navigationLinksHeading || 'Useful Links'}
                        textStyle="body-sm"
                        className={s.linkColumnHeading}
                      />
                      <div className={s.linkList}>
                        {allNavLinks.map((item, i) => (
                          <FooterLink key={i} item={item} />
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Social icons */}
              {socialLinks && socialLinks.length > 0 && (
                <div className={s.socialLinks}>
                  {socialLinks.map((social, i) => {
                    const iconUrl = getMediaUrl(social.icon)
                    return (
                      <Link
                        key={i}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={social.platform}
                      >
                        <div className={s.socialIcon}>
                          {iconUrl && (
                            <Image
                              src={iconUrl}
                              alt={social.platform}
                              fill
                              className="object-contain"
                              unoptimized
                            />
                          )}
                        </div>
                      </Link>
                    )
                  })}
                </div>
              )}
            </div>

            {/* Bottom half */}
            <div className={s.desktopBottom}>
              {/* Copyright */}
              <div className={s.smallPrint}>
                {copyrightText && <Text text={copyrightText} textStyle="body-xs" />}
                {copyrightSubtext && <Text text={copyrightSubtext} textStyle="body-xs" />}
              </div>

              {/* Logos + bank cards */}
              <div className={s.logosAndCards}>
                {/* Payment icons */}
                {paymentIcons && paymentIcons.length > 0 && (
                  <div className={s.bankCards}>
                    {paymentIcons.map((card, i) => {
                      const iconUrl = getMediaUrl(card.icon)
                      return (
                        <div key={i} className={s.bankCard}>
                          {iconUrl && (
                            <Image
                              src={iconUrl}
                              alt={card.name}
                              fill
                              className="object-contain"
                              unoptimized
                            />
                          )}
                        </div>
                      )
                    })}
                  </div>
                )}

                {/* Certification logos */}
                {certificationLogos && certificationLogos.length > 0 && (
                  <div className={s.certLogos}>
                    {certificationLogos.map((cert, i) => {
                      const certUrl = getMediaUrl(cert.logo)
                      return (
                        <div key={i} className={s.certLogoWrapper}>
                          {certUrl && (
                            <Image
                              src={certUrl}
                              alt={cert.name}
                              width={65}
                              height={76}
                              className="object-contain"
                              unoptimized
                            />
                          )}
                        </div>
                      )
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* ============ MOBILE LAYOUT ============ */}
          <div className={s.mobileLayout}>
            {/* Logo + company details */}
            <div className={s.logoSection}>
              {logoUrl && (
                <div className={s.logo}>
                  <Image
                    src={logoUrl}
                    alt={logoAlt}
                    fill
                    className="object-contain object-left"
                    unoptimized
                  />
                </div>
              )}
              <div className={s.companyDetails}>
                {companyAddress && (
                  <Text text={companyAddress} textStyle="body-xs" className="whitespace-pre-line" />
                )}
                {registrationDetails && (
                  <Text
                    text={registrationDetails}
                    textStyle="body-xs"
                    className="whitespace-pre-line"
                  />
                )}
              </div>
            </div>

            {/* Navigation link columns */}
            {navigationColumns && navigationColumns.length > 0 && (
              <div className={s.mobileLinkColumns}>
                {navigationColumns.map((col, i) => (
                  <div key={i} className={s.linkColumn}>
                    <Text
                      as="h3"
                      text={col.heading}
                      textStyle="body-sm"
                      className={s.linkColumnHeading}
                    />
                    <div className={s.linkList}>
                      {col.links?.map((item, j) => (
                        <FooterLink key={j} item={item} />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Certification logos grid */}
            {certificationLogos && certificationLogos.length > 0 && (
              <div className={s.mobileCertLogos}>
                {certificationLogos.map((cert, i) => {
                  const certUrl = getMediaUrl(cert.logo)
                  return (
                    <div key={i} className={s.mobileCertLogoCell}>
                      {certUrl && (
                        <Image
                          src={certUrl}
                          alt={cert.name}
                          width={100}
                          height={100}
                          className="object-contain"
                          unoptimized
                        />
                      )}
                    </div>
                  )
                })}
              </div>
            )}

            {/* Payment icons + Social links (tablet: same row) */}
            <div className={s.bankCardsAndSocial}>
              {paymentIcons && paymentIcons.length > 0 && (
                <div className={s.bankCards}>
                  {paymentIcons.map((card, i) => {
                    const iconUrl = getMediaUrl(card.icon)
                    return (
                      <div key={i} className={s.bankCard}>
                        {iconUrl && (
                          <Image
                            src={iconUrl}
                            alt={card.name}
                            fill
                            className="object-contain"
                            unoptimized
                          />
                        )}
                      </div>
                    )
                  })}
                </div>
              )}

              {socialLinks && socialLinks.length > 0 && (
                <div className={s.socialLinks}>
                  {socialLinks.map((social, i) => {
                    const iconUrl = getMediaUrl(social.icon)
                    return (
                      <Link
                        key={i}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={social.platform}
                      >
                        <div className={s.socialIcon}>
                          {iconUrl && (
                            <Image
                              src={iconUrl}
                              alt={social.platform}
                              fill
                              className="object-contain"
                              unoptimized
                            />
                          )}
                        </div>
                      </Link>
                    )
                  })}
                </div>
              )}
            </div>

            {/* Copyright + policy links */}
            <div className={s.mobileSmallPrint}>
              {copyrightText && <Text text={copyrightText} textStyle="body-xs" />}
              {copyrightSubtext && <Text text={copyrightSubtext} textStyle="body-xs" />}

              {/* Policy links (underlined) */}
              {policyLinks && policyLinks.length > 0 && (
                <div className={s.mobilePolicyLinks}>
                  {policyLinks.map((item, i) => (
                    <FooterLink key={i} item={item} className={s.policyLink} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
