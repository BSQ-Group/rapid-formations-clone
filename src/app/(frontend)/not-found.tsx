import React from 'react'

import { NotFoundContent } from '@/components/shared/NotFoundContent/NotFoundContent'
import { Header } from '@/Header/Component'

export default function NotFound() {
  return (
    <>
      <Header />
      <main>
        <NotFoundContent />
      </main>
    </>
  )
}
