#!/usr/bin/env bun
/**
 * CORE-6965 re-measurement — effective DPR (naturalWidth / rendered CSS width)
 * at deviceScaleFactor 2, for the 17 instances of the 9 CMS assets that were
 * replaced (8 bank logos in BankAdsGrid + john-warbuton.webp in CustomerQuote).
 *
 * Uses the same withSlot concurrency gate + Chromium args as pw-capture.ts so
 * this doesn't contend with sibling lanes' browsers.
 */
import { chromium } from 'playwright'
import { withSlot } from '/Users/eugeniucozac/.claude/skills/clone-qa-tools/scripts/pw-slot.ts'

const URL = process.argv[2] || 'https://localhost:3001/'
const CHROMIUM_ARGS = ['--ignore-certificate-errors', '--allow-insecure-localhost', '--disable-dev-shm-usage']

const ALT_TARGETS = [
  'Barclays banking logo.',
  'NatWest banking logo.',
  'Starling banking logo.',
  'Monzo banking logo.',
  'Zempler banking logo.',
  'Anna banking logo.',
  'Wise banking logo.',
  'Lloyds logo',
  'Image of John Warbuton - CEO of Konsileo',
]

await withSlot(async () => {
  const browser = await chromium.launch({ headless: true, args: CHROMIUM_ARGS })
  try {
    const context = await browser.newContext({ ignoreHTTPSErrors: true, deviceScaleFactor: 2 })
    const page = await context.newPage()
    await page.goto(URL, { waitUntil: 'load', timeout: 45000 })
    await page.waitForTimeout(500)

    // Force-load every lazy img by scrolling the full page height in steps.
    await page.evaluate(async () => {
      const step = window.innerHeight
      const total = document.body.scrollHeight
      for (let y = 0; y < total; y += step) {
        window.scrollTo(0, y)
        await new Promise((r) => setTimeout(r, 150))
      }
      window.scrollTo(0, 0)
    })
    await page.waitForTimeout(1500)

    // Wait for every matching img to finish decoding (always attach fresh
    // listeners — do not short-circuit on img.complete, which can be true
    // for an in-flight next/image placeholder swap).
    await page.evaluate(async (alts) => {
      const imgs = Array.from(document.querySelectorAll('img')).filter((img) => alts.includes(img.alt))
      await Promise.all(
        imgs.map(
          (img) =>
            new Promise((resolve) => {
              const done = () => resolve(undefined)
              img.addEventListener('load', done, { once: true })
              img.addEventListener('error', done, { once: true })
              setTimeout(done, 6000)
            }),
        ),
      )
    }, ALT_TARGETS)
    await page.waitForTimeout(2000)

    const results = await page.evaluate((alts) => {
      const imgs = Array.from(document.querySelectorAll('img'))
      return alts.map((alt) => {
        const matches = imgs.filter((img) => img.alt === alt)
        return matches.map((img) => {
          const rect = img.getBoundingClientRect()
          const dpr = rect.width > 0 ? img.naturalWidth / rect.width : null
          return {
            alt,
            src: img.currentSrc || img.src,
            naturalWidth: img.naturalWidth,
            naturalHeight: img.naturalHeight,
            cssWidth: Number(rect.width.toFixed(1)),
            effectiveDPR: dpr ? Number(dpr.toFixed(2)) : null,
          }
        })
      })
    }, ALT_TARGETS)

    const flat = results.flat()
    console.log(JSON.stringify(flat, null, 2))
    const below = flat.filter((r) => r.effectiveDPR !== null && r.effectiveDPR < 1.9)
    console.log(`\nTotal instances found: ${flat.length}`)
    console.log(`Still below 1.9x: ${below.length}`)
    if (below.length) console.log(JSON.stringify(below, null, 2))
  } finally {
    await browser.close()
  }
})
