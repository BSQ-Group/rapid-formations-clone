import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'
import { RF_CONFIG, THEME_CLASS } from '@/lib/brand'

const globalsCss = readFileSync(join(process.cwd(), 'src/app/(frontend)/globals.css'), 'utf8')

function brandCyan(): string | null {
  const blockStart = globalsCss.indexOf(`.${THEME_CLASS} {`)
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
  it('matches the --surface-brand-cyan token', () => {
    const token = brandCyan()
    expect(token).not.toBeNull()
    expect(RF_CONFIG.themeColor).toBe(toHex(token!))
  })

  it('is a lowercase 6-digit hex', () => {
    expect(RF_CONFIG.themeColor).toMatch(/^#[0-9a-f]{6}$/)
  })

  it('declares a theme class that globals.css defines', () => {
    expect(globalsCss).toContain(`.${THEME_CLASS} {`)
  })
})
