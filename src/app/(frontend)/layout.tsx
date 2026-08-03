import type { Metadata } from 'next'

import { cn } from '@/utilities/ui'
import { Inter, Work_Sans, Encode_Sans } from 'next/font/google'
import React from 'react'

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-inter',
  display: 'optional',
  preload: false,
})

const workSans = Work_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--font-work-sans',
  display: 'swap',
  preload: false,
})

const encodeSans = Encode_Sans({
  subsets: ['latin'],
  axes: ['wdth'],
  variable: '--font-legacy-condensed',
  display: 'swap',
})

import Script from 'next/script'
import { Footer } from '@/Footer/Component'
import { Providers } from '@/providers'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import { getBrand } from '@/lib/brand'
import { draftMode } from 'next/headers'
import { SpeedInsights } from '@vercel/speed-insights/next'

import './globals.css'
import { getServerSideURL } from '@/utilities/getURL'

const adobeFontProjectId = process.env.NEXT_PUBLIC_ADOBE_FONT_PROJECT_ID

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const { isEnabled } = await draftMode()
  const brand = getBrand()
  const themeClass = `theme-${brand}`

  return (
    <html
      className={cn(inter.variable, workSans.variable, encodeSans.variable, themeClass)}
      lang="en"
    >
      <head>
        <link href="/favicon.ico" rel="icon" sizes="32x32" />
        <link href="/favicon.svg" rel="icon" type="image/svg+xml" />
        {adobeFontProjectId && (
          <>
            <link rel="preconnect" href="https://use.typekit.net" />
            <link rel="preconnect" href="https://p.typekit.net" />
            <link rel="stylesheet" href={`https://use.typekit.net/${adobeFontProjectId}.css`} />
          </>
        )}
        <Script
          id="Cookiebot"
          src="https://consent.cookiebot.com/uc.js"
          data-cbid="04695da6-ca51-46fe-923e-144ccc7854e1"
          strategy="beforeInteractive"
        />
      </head>
      <body>
        <Providers>
          {children}
          <Footer />
        </Providers>
        <SpeedInsights />
      </body>
    </html>
  )
}

export const metadata: Metadata = {
  metadataBase: new URL(getServerSideURL()),
  openGraph: mergeOpenGraph(),
  twitter: {
    card: 'summary_large_image',
    creator: '@payloadcms',
  },
}
