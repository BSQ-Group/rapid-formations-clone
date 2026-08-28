import Link from 'next/link'
import React from 'react'

import { Button } from '@/components/ui/button'
import Text from '@/components/shared/Text'
import { Header } from '@/Header/Component'

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="container py-28">
        <Text as="h1" textStyle="headline-4xl" text="404" className="mb-2" />
        <Text as="p" textStyle="body-lg" text="This page could not be found." className="mb-6" />
        <Button asChild variant="primary">
          <Link href="/">Go home</Link>
        </Button>
      </main>
    </>
  )
}
