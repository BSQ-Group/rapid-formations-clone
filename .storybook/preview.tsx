import React, { useEffect } from 'react'
import type { Preview } from '@storybook/react'
import { Inter, Work_Sans, Montserrat } from 'next/font/google'
import '../src/app/(frontend)/globals.css'

// Mirror the next/font setup from src/app/(frontend)/layout.tsx so Storybook
// renders typography with the same Inter / Work Sans / Montserrat the live
// site loads — otherwise stories fall back to the browser default serif.
// Display strategies mirror src/app/(frontend)/layout.tsx exactly so
// Storybook renders fonts under the same CLS/swap behaviour as the live
// site — Inter uses 'optional' (no swap on slow networks; sticks with
// the fallback rather than re-laying-out) and Work Sans / Montserrat
// use 'swap' to match the live setup.
const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-inter',
  display: 'optional',
})

const workSans = Work_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--font-work-sans',
  display: 'swap',
})

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--font-montserrat',
  display: 'swap',
})

const fontVariableClasses = `${inter.variable} ${workSans.variable} ${montserrat.variable}`

const THEME_RF = 'theme-rapidformations'
const THEME_QCF = 'theme-qualitycompanyformations'

const SURFACE_CANVAS = {
  rf: 'rgb(4 4 41)',
  qcf: 'rgb(245 245 245)',
} as const

function ThemeWrapper({ children, theme }: { children: React.ReactNode; theme: 'rf' | 'qcf' }) {
  useEffect(() => {
    const html = document.documentElement
    html.classList.remove(THEME_RF, THEME_QCF)
    html.classList.add(theme === 'qcf' ? THEME_QCF : THEME_RF)
    // Carry the next/font variables onto <html> so CSS that reads
    // var(--font-inter) etc. resolves identically to the live site.
    for (const cls of fontVariableClasses.split(' ').filter(Boolean)) {
      html.classList.add(cls)
    }

    const managerDoc = typeof window !== 'undefined' ? window.parent?.document : null
    const styleId = 'storybook-theme-canvas-bg'
    if (managerDoc) {
      let style = managerDoc.getElementById(styleId)
      if (!style) {
        style = managerDoc.createElement('style')
        style.id = styleId
        managerDoc.head.appendChild(style)
      }
      style.textContent = `.sb-show-main { background: ${SURFACE_CANVAS[theme]} !important; }`
    }

    return () => {
      html.classList.remove(THEME_RF, THEME_QCF)
      for (const cls of fontVariableClasses.split(' ').filter(Boolean)) {
        html.classList.remove(cls)
      }
      managerDoc?.getElementById(styleId)?.remove()
    }
  }, [theme])
  return <>{children}</>
}

const preview: Preview = {
  globalTypes: {
    theme: {
      description: 'Brand theme (RF / QCF)',
      toolbar: {
        title: 'Theme',
        icon: 'paintbrush',
        items: [
          { value: 'rf', title: 'Rapid Formations', right: 'RF' },
          { value: 'qcf', title: 'Quality Company Formations', right: 'QCF' },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: {
    theme: 'rf',
  },
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    backgrounds: { disable: true },
    layout: 'centered',
    nextjs: {
      appDirectory: true,
    },
  },
  decorators: [
    (Story, context) => {
      const theme = (context.globals.theme as 'rf' | 'qcf') ?? 'rf'
      return (
        <ThemeWrapper theme={theme}>
          <div className="min-h-screen" style={{ background: 'var(--surface-canvas)', color: 'var(--text-strong)' }}>
            <Story />
          </div>
        </ThemeWrapper>
      )
    },
  ],
}

export default preview
