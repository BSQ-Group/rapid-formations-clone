'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, {
  useState,
  useRef,
  useCallback,
  useEffect,
  startTransition,
  useSyncExternalStore,
} from 'react'
import dynamic from 'next/dynamic'

import type { Header } from '@/payload-types'
import type { Page, Post } from '@/payload-types'

import { Button } from '@/components/ui/button'
import { OAuthRedirectHandler } from '@/components/shared/OAuthRedirectHandler'
import { IdleMount } from '@/components/shared/IdleMount'
import { faAngleDown } from '@fortawesome/pro-light-svg-icons/faAngleDown'
import { faChevronRight } from '@fortawesome/pro-light-svg-icons/faChevronRight'
import { faMinus } from '@fortawesome/pro-light-svg-icons/faMinus'
import { faPlus } from '@fortawesome/pro-light-svg-icons/faPlus'
import { faLayerGroup } from '@fortawesome/pro-solid-svg-icons/faLayerGroup'
import { faLock } from '@fortawesome/pro-solid-svg-icons/faLock'
import { FaIcon } from '@/components/shared/FaIcon'
import Text from '@/components/shared/Text'
import { cn } from '@/utilities/ui'
import { ACCOUNT_LINKS, hasEfilingSession, isEfilingLoginHref } from '@/lib/efiling'
import { getBrand, getDomainConfig, getLogoPath, Brand } from '@/lib/brand'
import { headerStyles as s } from './Header.styles'

const LoginModal = dynamic(
  () => import('@/components/shared/LoginModal/LoginModal').then((m) => m.LoginModal),
  { ssr: false },
)

const GoogleOneTapProvider = dynamic(
  () =>
    import('@/components/shared/GoogleOneTap/GoogleOneTapProvider').then(
      (m) => m.GoogleOneTapProvider,
    ),
  { ssr: false },
)

const DESKTOP_NAV_QUERY = '(min-width: 1200px)'

const ACCOUNT_NAV_ITEM: NavItem = {
  link: { type: 'custom', label: 'My Account' },
  icon: 'none',
  dropdownColumns: [
    {
      links: ACCOUNT_LINKS.map(({ label, href }) => ({
        link: { type: 'custom', url: href, label },
      })),
    },
  ],
}

const LOGO_INTRINSIC: Record<Brand, { width: number; height: number }> = {
  [Brand.RapidFormations]: { width: 560, height: 56 },
  [Brand.QualityCompanyFormations]: { width: 44, height: 44 },
  [Brand.FirstFormations]: { width: 44, height: 44 },
}

type NavItem = NonNullable<Header['navItems']>[number]
type CMSLinkValue = Omit<NavItem['link'], 'label'>

function resolveHref(link: CMSLinkValue | undefined | null): string | null {
  if (!link) return null
  if (
    link.type === 'reference' &&
    typeof link.reference?.value === 'object' &&
    link.reference.value !== null
  ) {
    const value = link.reference.value as Page | Post
    if (!value.slug) return null
    return `${link.reference.relationTo !== 'pages' ? `/${link.reference.relationTo}` : ''}/${value.slug}`
  }
  return link.url || null
}

function isDesktopNav(): boolean {
  return typeof window !== 'undefined' && window.matchMedia(DESKTOP_NAV_QUERY).matches
}

interface HeaderClientProps {
  data: Header
  onDark?: boolean
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ data, onDark = false }) => {
  const navItems = data?.navItems || []
  const secondaryNavItems = data?.secondaryNavItems || []
  const loginLink = data?.loginLink
  const pathname = usePathname()

  const brand = getBrand()
  const domain = getDomainConfig(brand)
  const logoSize = LOGO_INTRINSIC[brand] ?? LOGO_INTRINSIC[Brand.RapidFormations]

  const [loginModalOpen, setLoginModalOpen] = useState(false)
  const [loginError, setLoginError] = useState<string | null>(null)

  const handleOAuthError = useCallback(
    (message: string) => {
      setLoginError(message)
      setLoginModalOpen(true)
    },
    [setLoginModalOpen],
  )

  const [menuOpen, setMenuOpen] = useState(false)
  const [openKey, setOpenKey] = useState<string | null>(null)
  const navRef = useRef<HTMLDivElement>(null)

  const isLoggedIn = useSyncExternalStore(
    () => () => {},
    () => hasEfilingSession(document.cookie),
    () => false,
  )

  const headerRef = useRef<HTMLElement>(null)
  useEffect(() => {
    const el = headerRef.current
    if (!el) return

    const publish = () => {
      const h = el.offsetHeight
      if (h > 0) document.documentElement.style.setProperty('--nav-height', `${h}px`)
    }
    publish()
    const ro = new ResizeObserver(publish)
    ro.observe(el)

    const onScroll = () => {
      if (window.scrollY > 0) el.setAttribute('data-scrolled', '')
      else el.removeAttribute('data-scrolled')
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })

    return () => {
      ro.disconnect()
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  useEffect(() => {
    startTransition(() => {
      setMenuOpen(false)
      setOpenKey(null)
    })
  }, [pathname])

  useEffect(() => {
    if (!menuOpen) return

    const query = window.matchMedia(DESKTOP_NAV_QUERY)
    if (query.matches) return

    const closeOnDesktop = (event: MediaQueryListEvent) => {
      if (event.matches) setMenuOpen(false)
    }
    query.addEventListener('change', closeOnDesktop)

    const { body } = document
    const previousOverflow = body.style.overflow
    const previousTop = body.style.top
    const previousPosition = body.style.position
    const previousWidth = body.style.width
    const scrollY = window.scrollY

    body.style.overflow = 'hidden'
    body.style.position = 'fixed'
    body.style.top = `-${scrollY}px`
    body.style.width = '100%'

    return () => {
      query.removeEventListener('change', closeOnDesktop)
      body.style.overflow = previousOverflow
      body.style.position = previousPosition
      body.style.top = previousTop
      body.style.width = previousWidth
      window.scrollTo(0, scrollY)
    }
  }, [menuOpen, setMenuOpen])

  useEffect(() => {
    if (!openKey) return

    const handlePointerDown = (event: PointerEvent) => {
      if (!isDesktopNav()) return
      if (navRef.current?.contains(event.target as Node)) return
      setOpenKey(null)
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return
      const trigger = navRef.current?.querySelector<HTMLButtonElement>(
        'button[aria-expanded="true"]',
      )
      setOpenKey(null)
      trigger?.focus()
    }

    document.addEventListener('pointerdown', handlePointerDown)
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('pointerdown', handlePointerDown)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [openKey])

  const handleToggle = useCallback((key: string) => {
    setOpenKey((current) => (current === key ? null : key))
  }, [])

  const closeEverything = useCallback(() => {
    setMenuOpen(false)
    setOpenKey(null)
  }, [setMenuOpen])

  const renderRow = (item: NavItem, key: string, isLast: boolean, inMainNav = false) => (
    <NavRow
      key={key}
      item={item}
      rowKey={key}
      isLast={isLast}
      inMainNav={inMainNav}
      isOpen={openKey === key}
      onToggle={handleToggle}
      onNavigate={closeEverything}
    />
  )

  return (
    <>
      <header
        ref={headerRef}
        data-on-light={onDark ? undefined : ''}
        className={cn(s.header, onDark && s.headerScrolled)}
      >
        <div className={cn(s.container, onDark && s.containerScrolled)}>
          <div className={s.topRow}>
            <div className={s.logoCell}>
              <Link href="/" className={s.logoLink} onClick={closeEverything}>
                <img
                  src={getLogoPath(domain, onDark)}
                  alt={domain.alt}
                  width={logoSize.width}
                  height={logoSize.height}
                  loading="eager"
                  className={s.logoImage}
                />
              </Link>
            </div>
            <div className={s.burgerCell}>
              <Button
                type="button"
                variant="tertiary"
                size="icon"
                className={s.burgerButton}
                aria-expanded={menuOpen}
                aria-controls="header-nav"
                aria-label="Toggle navigation"
                onClick={() => setMenuOpen((open) => !open)}
              >
                <span className={s.burgerBox}>
                  <span
                    className={cn(s.burgerBar, s.burgerBarTop, menuOpen && s.burgerBarTopOpen)}
                  />
                  <span
                    className={cn(
                      s.burgerBar,
                      s.burgerBarMiddle,
                      menuOpen && s.burgerBarMiddleOpen,
                    )}
                  />
                  <span
                    className={cn(
                      s.burgerBar,
                      s.burgerBarBottom,
                      menuOpen && s.burgerBarBottomOpen,
                    )}
                  />
                </span>
              </Button>
            </div>
          </div>
          <div id="header-nav" ref={navRef}>
            <div className={cn(s.bottomWrap, menuOpen && s.bottomWrapOpen)}>
              <nav
                className={cn(s.siteNav, menuOpen ? 'flex' : 'hidden')}
                aria-label="Main navigation"
              >
                <ul className={cn(s.navList, s.siteNavListOffset)}>
                  {navItems.map((item, i) => renderRow(item, `main-${i}`, false, true))}
                </ul>
              </nav>
              <nav
                className={cn(s.userNav, menuOpen ? 'flex' : 'hidden')}
                aria-label="Secondary navigation"
              >
                <ul className={cn(s.navList, s.userNavListOffset)}>
                  {secondaryNavItems.map((item, i) => {
                    const isLast = i === secondaryNavItems.length - 1
                    const isAccountRow = isLoggedIn && isEfilingLoginHref(resolveHref(item.link))
                    return renderRow(
                      isAccountRow ? ACCOUNT_NAV_ITEM : item,
                      `secondary-${i}`,
                      isLast,
                    )
                  })}
                  {!isLoggedIn && loginLink?.label && (
                    <li className={cn(s.navRow, s.navRowPlain, s.navRowLast)}>
                      <button
                        type="button"
                        className={cn(s.navLink, s.navLinkFlushRight)}
                        onClick={() => setLoginModalOpen(true)}
                      >
                        <FaIcon icon={faLock} className={s.navLinkIcon} />
                        <Text text={loginLink.label} textStyle="span" />
                      </button>
                    </li>
                  )}
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </header>
      <OAuthRedirectHandler onError={handleOAuthError} />
      <IdleMount>
        <GoogleOneTapProvider />
      </IdleMount>
      <LoginModal open={loginModalOpen} onOpenChange={setLoginModalOpen} error={loginError} />
    </>
  )
}

interface NavRowProps {
  item: NavItem
  rowKey: string
  isLast: boolean
  inMainNav: boolean
  isOpen: boolean
  onToggle: (key: string) => void
  onNavigate: () => void
}

function NavRow({ item, rowKey, isLast, inMainNav, isOpen, onToggle, onNavigate }: NavRowProps) {
  const columns = item.dropdownColumns || []
  const href = resolveHref(item.link)
  const label = item.link?.label || ''
  const icon = item.icon === 'lock' ? <FaIcon icon={faLock} className={s.navLinkIcon} /> : null

  if (columns.length === 0) {
    if (!href) return null
    return (
      <li
        className={cn(
          s.navRow,
          s.navRowPlain,
          isLast && s.navRowLast,
          inMainNav && s.navRowNoBorder,
        )}
      >
        <Text
          href={href}
          text={label}
          textStyle="span"
          className={cn(s.navLink, isLast && s.navLinkFlushRight)}
          onClick={onNavigate}
          {...(icon ? { icons: { iconBefore: icon } } : {})}
          {...(item.link?.newTab ? { rel: 'noopener noreferrer', target: '_blank' } : {})}
        />
      </li>
    )
  }

  return (
    <li className={cn(s.navRow, isLast && s.navRowLast)}>
      <div className={s.dropdown}>
        <button
          type="button"
          className={s.dropdownTrigger}
          aria-expanded={isOpen}
          onClick={() => onToggle(rowKey)}
        >
          <Text text={label} textStyle="span" className={s.dropdownTitle} />
          <FaIcon icon={faAngleDown} className={s.dropdownCaret} />
          <span className={s.dropdownToggle}>
            <span className={s.dropdownToggleIcon}>
              <FaIcon icon={isOpen ? faMinus : faPlus} className={s.dropdownToggleGlyph} />
            </span>
          </span>
        </button>
        <DropdownPanel
          columns={columns}
          cta={item.dropdownCta}
          isOpen={isOpen}
          onNavigate={onNavigate}
        />
      </div>
    </li>
  )
}

interface DropdownPanelProps {
  columns: NonNullable<NavItem['dropdownColumns']>
  cta?: NavItem['dropdownCta']
  isOpen: boolean
  onNavigate: () => void
}

function DropdownPanel({ columns, cta, isOpen, onNavigate }: DropdownPanelProps) {
  const ctaHref = resolveHref(cta)
  const ctaLabel = cta?.label || ''
  const showCta = Boolean(ctaHref && ctaLabel)

  const ctaLink = showCta ? (
    <Text
      href={ctaHref!}
      text={ctaLabel}
      textStyle="span"
      className={s.panelCtaLink}
      onClick={onNavigate}
      icons={{ iconBefore: <FaIcon icon={faLayerGroup} className={s.panelCtaIcon} /> }}
    />
  ) : null

  return (
    <ul className={cn(s.panel, isOpen ? 'flex' : 'hidden')}>
      {showCta && <li className={s.panelCtaTop}>{ctaLink}</li>}
      <li
        className={cn(
          s.panelColumns,
          columns.length === 2 && s.panelColumnsTwo,
          columns.length >= 3 && s.panelColumnsThree,
        )}
      >
        {columns.map((column, colIdx) => (
          <div key={colIdx} className={cn(s.panelColumn, showCta && s.panelColumnSpaced)}>
            {column.heading && (
              <Text as="h4" text={column.heading} textStyle="span" className={s.panelHeading} />
            )}
            {(column.links || []).map((entry, linkIdx) => {
              const href = resolveHref(entry.link)
              if (!href) return null
              return (
                <Text
                  key={linkIdx}
                  href={href}
                  text={entry.link?.label || ''}
                  textStyle="span"
                  className={s.panelLink}
                  onClick={onNavigate}
                  icons={{
                    iconBefore: <FaIcon icon={faChevronRight} className={s.panelLinkIcon} />,
                  }}
                  {...(entry.link?.newTab ? { rel: 'noopener noreferrer', target: '_blank' } : {})}
                />
              )
            })}
          </div>
        ))}
      </li>
      {showCta && <li className={s.panelCtaBottom}>{ctaLink}</li>}
    </ul>
  )
}
