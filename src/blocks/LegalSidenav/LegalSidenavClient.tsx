'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { cn } from '@/utilities/ui'
import { legalSidenavStyles as s } from './LegalSidenav.styles'
import type { LegalNavLink } from './fetchLegalNavLinks'

// py-4 (32px) + leading-6 (24px) + border-t + border-b (2px) = 58px
const DROPDOWN_BAR_HEIGHT = 58

export function LegalSidenavClient({ links }: { links: LegalNavLink[] }) {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  const isActive = (slug: string) => pathname === `/${slug}`
  const activeLink = links.find((link) => isActive(link.slug))

  return (
    <>
      <style>{`@media (max-width: 1023px) { html { scroll-padding-top: calc(var(--header-height) + ${DROPDOWN_BAR_HEIGHT}px + 0.75rem); } }`}</style>
      {/* Desktop sticky sidenav (lg+) */}
      <aside className={s.sidenavWrapper}>
        <nav className={s.navContainer} aria-label="Legal pages">
          <ul className={s.navGroup}>
            {links.map(({ slug, label }) => {
              const active = isActive(slug)
              return (
                <li key={slug} className="w-full">
                  <Link
                    href={`/${slug}`}
                    aria-current={active ? 'page' : undefined}
                    className={cn(
                      s.navLink,
                      active ? s.navLinkActive : s.navLinkInactive,
                    )}
                  >
                    {label}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>
      </aside>

      {/* Mobile / tablet dropdown (<lg) */}
      <div className={s.dropdownWrapper}>
        <button
          type="button"
          aria-expanded={open}
          aria-controls="legal-sidenav-panel"
          className={cn(s.dropdownTrigger, open && s.dropdownTriggerOpen)}
          onClick={() => setOpen((v) => !v)}
        >
          <span>{activeLink?.label ?? 'Legal pages'}</span>
          {open ? (
            <ChevronUp size={24} aria-hidden strokeWidth={2} />
          ) : (
            <ChevronDown size={24} aria-hidden strokeWidth={2} />
          )}
        </button>

        {open && (
          <ul id="legal-sidenav-panel" className={s.dropdownPanel}>
            {links.map(({ slug, label }) => {
              const active = isActive(slug)
              return (
                <li key={slug} className="w-full">
                  <Link
                    href={`/${slug}`}
                    aria-current={active ? 'page' : undefined}
                    className={cn(s.dropdownItem, active && s.dropdownItemActive)}
                    onClick={() => setOpen(false)}
                  >
                    <span>{label}</span>
                    {active && (
                      <span className={s.dropdownCurrentLabel}>Current</span>
                    )}
                  </Link>
                </li>
              )
            })}
          </ul>
        )}
      </div>
    </>
  )
}
