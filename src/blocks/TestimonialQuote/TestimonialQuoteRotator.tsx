'use client'

import React, { useSyncExternalStore } from 'react'

import { TestimonialQuoteCard } from './TestimonialQuoteCard'

export interface TestimonialQuoteRotatorProps {
  pool: { quote: string; customerName: string }[]
  initialIndex: number
}

const loadSeed = Math.random()

const subscribe = () => () => {}

export const TestimonialQuoteRotator: React.FC<TestimonialQuoteRotatorProps> = ({
  pool,
  initialIndex,
}) => {
  const index = useSyncExternalStore(
    subscribe,
    () => Math.floor(loadSeed * pool.length),
    () => initialIndex,
  )

  const chosen = pool[index] ?? pool[0]

  if (!chosen) return null

  return <TestimonialQuoteCard quote={chosen.quote} customerName={chosen.customerName} />
}
