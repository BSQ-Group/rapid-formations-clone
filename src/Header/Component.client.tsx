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
import { Menu, X, ChevronRight, ChevronLeft } from 'lucide-react'

import type { Header } from '@/payload-types'

import { Logo } from '@/components/Logo/Logo'
import { CMSLink } from '@/components/Link'
import { Button } from '@/components/ui/button'
import { ThemeSwitcher } from '@/components/ThemeSwitcher'
import { OAuthRedirectHandler } from '@/components/shared/OAuthRedirectHandler'
import { IdleMount } from '@/components/shared/IdleMount'

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
import Text from '@/components/shared/Text'
import { cn } from '@/utilities/ui'
import { useToken } from '@/state/auth'
import { firebaseSignOut } from '@/lib/firebase'
import { headerStyles as s } from './Header.styles'

const isDev = process.env.NODE_ENV === 'development'
const MAX_COLUMN_ITEMS = 6

interface HeaderClientProps {
  data: Header
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ data }) => {
  const navItems = data?.navItems || []
  const secondaryNavItems = data?.secondaryNavItems || []
  const accountLinks = data?.accountLinks || []
  const loginLink = data?.loginLink
  const pathname = usePathname()

  // Login modal
  const [loginModalOpen, setLoginModalOpen] = useState(false)
  const [loginError, setLoginError] = useState<string | null>(null)

  const handleOAuthError = useCallback((message: string) => {
    setLoginError(message)
    setLoginModalOpen(true)
  }, [])

  // Desktop mega menu
  const [activeMegaMenu, setActiveMegaMenu] = useState<number | null>(null)
  const [navHovered, setNavHovered] = useState(false)
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Auth state — token is only readable on the client (cookie). To avoid a
  // flash of the logged-out UI on hydration for already-signed-in users, we
  // skip rendering the auth-dependent slot until after mount.
  const token = useToken()
  const hasMounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  )
  const isLoggedIn = typeof token === 'string'
  const showLoggedIn = hasMounted && isLoggedIn
  const showLoggedOut = hasMounted && !isLoggedIn

  // Account dropdown (desktop)
  const [accountOpen, setAccountOpen] = useState(false)

  // Mobile menu
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [mobileSubMenu, setMobileSubMenu] = useState<number | 'account' | null>(null)

  const headerRef = useRef<HTMLElement>(null)
  useEffect(() => {
    const el = headerRef.current
    if (!el) return

    // Publish header height for downstream sticky elements
    const publish = () => {
      const h = el.offsetHeight
      if (h > 0) document.documentElement.style.setProperty('--nav-height', `${h}px`)
    }
    publish()
    const ro = new ResizeObserver(publish)
    ro.observe(el)

    // Use a sentinel at the top of the document to detect scroll without
    // relying on which element fires the scroll event.
    const sentinel = document.createElement('div')
    sentinel.style.cssText =
      'position:absolute;top:0;left:0;width:1px;height:1px;pointer-events:none;'
    document.body.insertAdjacentElement('afterbegin', sentinel)

    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        el.removeAttribute('data-scrolled')
      } else {
        el.setAttribute('data-scrolled', '')
      }
    })
    io.observe(sentinel)

    return () => {
      ro.disconnect()
      io.disconnect()
      sentinel.remove()
    }
  }, [])

  // Close menus on route change
  useEffect(() => {
    startTransition(() => {
      setActiveMegaMenu(null)
      setAccountOpen(false)
      setMobileMenuOpen(false)
      setMobileSubMenu(null)
    })
  }, [pathname])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileMenuOpen])

  const handleMegaMenuEnter = useCallback((index: number) => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current)
      closeTimeoutRef.current = null
    }
    setActiveMegaMenu(index)
    setNavHovered(true)
    setAccountOpen(false)
  }, [])

  const handleMegaMenuLeave = useCallback(() => {
    closeTimeoutRef.current = setTimeout(() => {
      setActiveMegaMenu(null)
      setNavHovered(false)
    }, 150)
  }, [])

  const handlePlainLinkEnter = useCallback(() => {
    if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current)
    setActiveMegaMenu(null)
    setNavHovered(true)
  }, [])

  const handleMobileClose = useCallback(() => {
    setMobileMenuOpen(false)
    setMobileSubMenu(null)
  }, [])

  const handleMobileOpen = useCallback(() => {
    setMobileMenuOpen(true)
    setMobileSubMenu(null)
  }, [])

  const activeNavItem = activeMegaMenu !== null ? navItems[activeMegaMenu] : null
  const hasMegaMenu =
    activeNavItem?.megaMenuCategories && activeNavItem.megaMenuCategories.length > 0
  const mobileSubMenuData = typeof mobileSubMenu === 'number' ? navItems[mobileSubMenu] : null

  return (
    <>
      <header
        ref={headerRef}
        className={s.header}
        data-header
        {...(navHovered ? { 'data-nav-hovered': '' } : {})}
      >
        {/* ─────────── Desktop fixed nav ─────────── */}
        <div className={s.desktopNav} data-desktop-nav="" onMouseLeave={handleMegaMenuLeave}>
          <div className={s.desktopContainer}>
            <div className={s.navBar}>
              <div className={s.leftGroup}>
                <Link href="/">
                  <Logo className={cn(s.logo, s.logoIdle)} fill="black" />
                </Link>

                {navItems.length > 0 && (
                  <NavItems
                    items={navItems}
                    linkClass={s.navLinkWithBg}
                    activeMegaMenu={activeMegaMenu}
                    onMegaMenuEnter={handleMegaMenuEnter}
                    onPlainLinkEnter={handlePlainLinkEnter}
                  />
                )}
              </div>

              <div className={s.rightGroup}>
                {isDev && <ThemeSwitcher />}
                <SecondaryNav items={secondaryNavItems} linkClass={s.navLinkWithBg} />
                {showLoggedIn && (
                  <AccountMenu
                    open={accountOpen}
                    onOpenChange={setAccountOpen}
                    linkClass={s.navLinkWithBg}
                    onHover={handlePlainLinkEnter}
                    links={accountLinks}
                  />
                )}
                {showLoggedOut && (
                  <LoginButton loginLink={loginLink} onLogin={() => setLoginModalOpen(true)} />
                )}
              </div>
            </div>
          </div>

          {hasMegaMenu && activeMegaMenu !== null && (
            <div className={s.megaMenuDropdown}>
              <MegaMenuPanel
                activeNavItem={activeNavItem!}
                activeMegaMenu={activeMegaMenu}
                onEnter={handleMegaMenuEnter}
              />
            </div>
          )}
        </div>

        {/* ─────────── Mobile fixed bar ─────────── */}
        {!mobileMenuOpen && (
          <div className={s.mobileScrollNav}>
            <div className={s.mobileScrollBar}>
              <Link href="/">
                <Logo className={cn(s.logo, s.logoIdle)} fill="black" />
              </Link>
              <div className={s.mobileActions}>
                {showLoggedOut && (
                  <LoginButton loginLink={loginLink} onLogin={() => setLoginModalOpen(true)} />
                )}
                <HamburgerButton className={s.mobileScrollHamburger} onOpen={handleMobileOpen} />
              </div>
            </div>
          </div>
        )}

        {/* ─────────── Mobile overlay ─────────── */}
        {mobileMenuOpen && (
          <div className={s.mobileOverlay} onClick={handleMobileClose}>
            <div className={s.mobileContainer} onClick={(e) => e.stopPropagation()} style={{ '--header-logo-fill': 'rgb(var(--black))' } as React.CSSProperties}>
              <div className={s.mobileHeader}>
                <Link href="/" onClick={handleMobileClose}>
                  <Logo className={cn(s.logo, s.logoIdle)} fill="black" />
                </Link>
                <div className={s.mobileActions}>
                  {showLoggedOut && (
                    <LoginButton loginLink={loginLink} onLogin={() => setLoginModalOpen(true)} />
                  )}
                  <button
                    type="button"
                    className={s.mobileCloseButton}
                    aria-label="Close menu"
                    onClick={handleMobileClose}
                  >
                    <X size={24} />
                  </button>
                </div>
              </div>

              {mobileSubMenu === null ? (
                <div className={s.mobileMenuContent}>
                  {navItems.map((item, i) => {
                    const hasSubmenu = item.megaMenuCategories && item.megaMenuCategories.length > 0

                    if (hasSubmenu) {
                      return (
                        <button
                          key={i}
                          type="button"
                          className={s.mobileMenuItem}
                          onClick={() => setMobileSubMenu(i)}
                        >
                          <Text
                            text={item.link.label || ''}
                            textStyle="body-sm"
                            className={s.mobileMenuItemLabel}
                          />
                          <ChevronRight size={16} className="text-[var(--text-strong)]" />
                        </button>
                      )
                    }

                    return (
                      <div key={i} onClick={handleMobileClose}>
                        <CMSLink
                          {...item.link}
                          appearance="inline"
                          className={cn(s.mobileMenuItem, s.mobileMenuItemLabel)}
                        />
                      </div>
                    )
                  })}

                  <div className={s.mobileMenuDivider} />

                  {secondaryNavItems.map(({ link }, i) => (
                    <div key={i} className={s.mobileSecondaryItem} onClick={handleMobileClose}>
                      <CMSLink {...link} appearance="inline" className={s.mobileSecondaryLabel} />
                    </div>
                  ))}
                  {showLoggedIn && (
                    <>
                      <button
                        type="button"
                        className={cn(s.mobileSecondaryItem, 'w-full justify-start')}
                        onClick={() => setMobileSubMenu('account')}
                      >
                        <Text
                          text="Account"
                          textStyle="body-sm"
                          className={s.mobileSecondaryLabel}
                        />
                      </button>
                      <div className={s.mobileMenuDivider} />
                      <button
                        type="button"
                        className={cn(s.mobileSecondaryItem, 'w-full justify-start')}
                        onClick={() => {
                          firebaseSignOut()
                          handleMobileClose()
                        }}
                      >
                        <Text
                          text="Log out"
                          textStyle="body-sm"
                          className={s.mobileSecondaryLabel}
                        />
                      </button>
                    </>
                  )}
                </div>
              ) : mobileSubMenu === 'account' ? (
                <div className={s.mobileSubMenuContent}>
                  <button
                    type="button"
                    className={s.mobileBackButton}
                    onClick={() => setMobileSubMenu(null)}
                  >
                    <ChevronLeft size={16} className="text-[var(--text-muted)]" />
                    <Text text="Back" textStyle="body-sm" className={s.mobileBackLabel} />
                  </button>

                  <div className={s.mobileMenuDivider} />

                  <div className={s.mobileSubLinks}>
                    {accountLinks.map(({ link }, i) => (
                      <div key={i} onClick={handleMobileClose}>
                        <CMSLink {...link} appearance="inline" className={s.mobileSubLink} />
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className={s.mobileSubMenuContent}>
                  <button
                    type="button"
                    className={s.mobileBackButton}
                    onClick={() => setMobileSubMenu(null)}
                  >
                    <ChevronLeft size={16} className="text-[var(--text-muted)]" />
                    <Text text="Back" textStyle="body-sm" className={s.mobileBackLabel} />
                  </button>

                  <div className={s.mobileMenuDivider} />

                  {mobileSubMenuData?.megaMenuCategories?.map((category, catIdx) => (
                    <React.Fragment key={catIdx}>
                      {catIdx > 0 && <div className={s.mobileMenuDivider} />}
                      <div className={s.mobileSubCategory}>
                        <Text
                          as="h4"
                          text={category.title}
                          textStyle="body-sm"
                          className={s.mobileSubCategoryTitle}
                        />
                        <div className={s.mobileSubLinks}>
                          {(category.links || []).map((item, linkIdx) => (
                            <div key={linkIdx} onClick={handleMobileClose}>
                              <CMSLink
                                {...item.link}
                                appearance="inline"
                                className={s.mobileSubLink}
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    </React.Fragment>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </header>

      <OAuthRedirectHandler onError={handleOAuthError} />
      <IdleMount>
        <GoogleOneTapProvider />
      </IdleMount>
      <LoginModal open={loginModalOpen} onOpenChange={setLoginModalOpen} error={loginError} />
    </>
  )
}

/* ─── Sub-components ─── */

function LoginButton({
  loginLink,
  onLogin,
}: {
  loginLink: Header['loginLink']
  onLogin: () => void
}) {
  if (!loginLink?.label) return null
  return (
    <Button variant="primary" size="sm" onClick={onLogin}>
      {loginLink.label}
    </Button>
  )
}

interface AccountMenuProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  linkClass: string
  onHover: () => void
  links: NonNullable<Header['accountLinks']>
}

function AccountMenu({ open, onOpenChange, linkClass, onHover, links }: AccountMenuProps) {
  return (
    <div
      className={s.accountMenuWrapper}
      onMouseEnter={() => {
        onOpenChange(true)
        onHover()
      }}
      onMouseLeave={() => onOpenChange(false)}
    >
      <button type="button" className={cn(linkClass, open && s.navLinkActive)}>
        My Account
      </button>
      {open && (
        <div className={s.accountDropdown}>
          <div className={s.accountDropdownPanel}>
            <div className={s.accountDropdownLinks}>
              {links.map(({ link }, i) => (
                <CMSLink key={i} {...link} appearance="inline" className={s.accountDropdownLink} />
              ))}
            </div>
            <div className={s.accountDropdownDivider} />
            <button
              type="button"
              className={s.accountDropdownLogout}
              onClick={() => firebaseSignOut()}
            >
              Log out
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

type NavItemType = NonNullable<Header['navItems']>[number]

interface NavItemsProps {
  items: NavItemType[]
  linkClass: string
  activeMegaMenu: number | null
  onMegaMenuEnter: (index: number) => void
  onPlainLinkEnter: () => void
}

function NavItems({
  items,
  linkClass,
  activeMegaMenu,
  onMegaMenuEnter,
  onPlainLinkEnter,
}: NavItemsProps) {
  return (
    <nav className={s.mainNav}>
      {items.map((item, i) => {
        const hasSubmenu = item.megaMenuCategories && item.megaMenuCategories.length > 0
        const isActive = activeMegaMenu === i && hasSubmenu

        if (hasSubmenu) {
          return (
            <button
              key={i}
              type="button"
              className={cn(linkClass, isActive && s.navLinkActive)}
              onMouseEnter={() => onMegaMenuEnter(i)}
            >
              {item.link.label}
            </button>
          )
        }

        return (
          <div key={i} role="none" onMouseEnter={onPlainLinkEnter}>
            <CMSLink {...item.link} appearance="inline" className={linkClass} />
          </div>
        )
      })}
    </nav>
  )
}

function SecondaryNav({
  items,
  linkClass,
}: {
  items: Header['secondaryNavItems']
  linkClass: string
}) {
  if (!items || items.length === 0) return null
  return (
    <nav className={s.secondaryNav}>
      {items.map(({ link }, i) => (
        <CMSLink key={i} {...link} appearance="inline" className={linkClass} />
      ))}
    </nav>
  )
}

interface MegaMenuPanelProps {
  activeNavItem: NavItemType
  activeMegaMenu: number
  onEnter: (index: number) => void
}

function MegaMenuPanel({ activeNavItem, activeMegaMenu, onEnter }: MegaMenuPanelProps) {
  return (
    <div className={s.megaMenu} onMouseEnter={() => onEnter(activeMegaMenu)}>
      <div className={s.megaMenuLinks}>
        {activeNavItem.megaMenuCategories!.map((category, catIdx) => (
          <React.Fragment key={catIdx}>
            {catIdx > 0 && <div className={s.megaMenuDivider} />}
            <MegaMenuCategory category={category} />
          </React.Fragment>
        ))}
      </div>
    </div>
  )
}

function HamburgerButton({ className, onOpen }: { className: string; onOpen: () => void }) {
  return (
    <button type="button" className={className} aria-label="Open menu" onClick={onOpen}>
      <Menu size={24} />
    </button>
  )
}

interface MegaMenuCategoryProps {
  category: NonNullable<NonNullable<Header['navItems']>[number]['megaMenuCategories']>[number]
}

function MegaMenuCategory({ category }: MegaMenuCategoryProps) {
  const links = category.links || []
  const columns = splitIntoColumns(links, MAX_COLUMN_ITEMS)

  return (
    <div className={s.megaMenuCategory}>
      <Text as="h4" text={category.title} textStyle="body-sm" className={s.megaMenuCategoryTitle} />
      <div className={s.megaMenuLinkList}>
        {columns.map((column, colIdx) => (
          <div key={colIdx} className={s.megaMenuColumn}>
            {column.map((item, linkIdx) => (
              <CMSLink
                key={linkIdx}
                {...item.link}
                appearance="inline"
                className={s.megaMenuLink}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

/** Split an array into columns of the given max size */
function splitIntoColumns<T>(items: T[], maxPerColumn: number): T[][] {
  if (items.length <= maxPerColumn) return [items]
  const columns: T[][] = []
  for (let i = 0; i < items.length; i += maxPerColumn) {
    columns.push(items.slice(i, i + maxPerColumn))
  }
  return columns
}
