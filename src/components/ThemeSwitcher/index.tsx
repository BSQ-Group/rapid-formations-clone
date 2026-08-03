'use client'

import { Brand, DEFAULT_BRAND, VALID_BRANDS } from '@/lib/brand'
import { Switch } from '@/components/ui/switch'
import React, { useCallback, useSyncExternalStore } from 'react'

function getCurrentBrand(): Brand {
  const classList = document.documentElement.classList
  for (const cls of classList) {
    if (cls.startsWith('theme-')) {
      const brand = cls.replace('theme-', '')
      if (VALID_BRANDS.includes(brand as Brand)) return brand as Brand
    }
  }
  return DEFAULT_BRAND
}

function applyTheme(brand: Brand) {
  const html = document.documentElement
  for (const b of VALID_BRANDS) {
    html.classList.remove(`theme-${b}`)
  }
  html.classList.add(`theme-${brand}`)
}

function subscribeToBrand(onChange: () => void) {
  const observer = new MutationObserver(onChange)
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
  return () => observer.disconnect()
}

export const ThemeSwitcher: React.FC = () => {
  const brand = useSyncExternalStore(subscribeToBrand, getCurrentBrand, () => null)

  const handleToggle = useCallback((checked: boolean) => {
    applyTheme(checked ? Brand.QualityCompanyFormations : Brand.RapidFormations)
  }, [])

  if (!brand) return null

  const isQCF = brand === Brand.QualityCompanyFormations

  return (
    <div className="flex items-center gap-2">
      <span className="text-xs hidden lg:inline" style={{ color: 'var(--text-inverse)' }}>
        {isQCF ? 'QCF' : 'RF'}
      </span>
      <Switch checked={isQCF} onCheckedChange={handleToggle} />
    </div>
  )
}
