'use client'

import { Brand, DEFAULT_BRAND, VALID_BRANDS } from '@/lib/brand'
import { Switch } from '@/components/ui/switch'
import React, { useCallback, useEffect, useState } from 'react'

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

export const ThemeSwitcher: React.FC = () => {
  const [brand, setBrand] = useState<Brand | null>(null)

  useEffect(() => {
    setBrand(getCurrentBrand())
  }, [])

  const handleToggle = useCallback((checked: boolean) => {
    const next = checked ? Brand.QualityCompanyFormations : Brand.RapidFormations
    setBrand(next)
    applyTheme(next)
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
