import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'
import { Brand, VALID_BRANDS, domainsConfigMap } from '@/lib/brand'

const globalsCss = readFileSync(join(process.cwd(), 'src/app/(frontend)/globals.css'), 'utf8')

function brandCyanFor(brand: Brand): string | null {
  const blockStart = globalsCss.indexOf(`.theme-${brand} {`)
  if (blockStart === -1) return null
  const declaration = /--surface-brand-cyan:\s*([^;]+);/.exec(globalsCss.slice(blockStart))
  return declaration ? declaration[1].trim() : null
}

function toHex(colour: string): string {
  const channels = /^rgb\(\s*(\d+)[\s,]+(\d+)[\s,]+(\d+)\s*\)$/.exec(colour)
  if (!channels) throw new Error(`unsupported colour syntax: ${colour}`)
  return `#${channels
    .slice(1)
    .map((c) => Number(c).toString(16).padStart(2, '0'))
    .join('')}`
}

describe('brand themeColor', () => {
  it('matches the --surface-brand-cyan token for Rapid Formations', () => {
    const token = brandCyanFor(Brand.RapidFormations)
    expect(token).not.toBeNull()
    expect(domainsConfigMap[Brand.RapidFormations].themeColor).toBe(toHex(token!))
  })

  it('is a lowercase 6-digit hex wherever it is set', () => {
    for (const brand of VALID_BRANDS) {
      const themeColor = domainsConfigMap[brand].themeColor
      if (themeColor !== undefined) expect(themeColor).toMatch(/^#[0-9a-f]{6}$/)
    }
  })
})
