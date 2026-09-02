import React from 'react'

import Text from '@/components/shared/Text'
import { cn } from '@/utilities/ui'
import { scholarshipWinnersStyles as s } from './ScholarshipWinners.styles'

export type ScholarshipWinner = {
  id?: string | null
  year: string
  name: string
  courseName?: string | null
  university?: string | null
}

export type ScholarshipWinnersProps = {
  heading?: string | null
  winners: ScholarshipWinner[]
  className?: string
}

/**
 * The course line. courseName and university are independently optional, so render
 * whichever the editor filled in rather than dropping the line unless both are set.
 */
const courseLine = ({ courseName, university }: ScholarshipWinner): React.ReactNode => {
  if (courseName && university)
    return (
      <>
        {courseName} student at
        <br />
        {university}
      </>
    )
  if (courseName) return `${courseName} student`
  return university
}

const byYearDescending = (winners: ScholarshipWinner[]) => {
  const years = winners.reduce((acc, winner) => {
    const year = winner.year.trim()
    if (!year) return acc
    const bucket = acc.get(year) ?? []
    bucket.push(winner)
    return acc.set(year, bucket)
  }, new Map<string, ScholarshipWinner[]>())

  return [...years.entries()].sort(([a], [b]) => b.localeCompare(a, undefined, { numeric: true }))
}

export const ScholarshipWinners: React.FC<ScholarshipWinnersProps> = ({
  heading,
  winners,
  className,
}) => {
  const grouped = byYearDescending(winners)

  if (!grouped.length) return null

  return (
    <div className={cn(s.wrapper, className)}>
      {heading && <Text as="h2" textStyle="span" text={heading} className={s.heading} />}
      <div className={s.grid}>
        {grouped.map(([year, entries]) => (
          <div key={year}>
            <Text as="h3" textStyle="span" text={year} className={s.year} />
            {entries.map((winner, index) => (
              <div key={winner.id ?? `${year}-${index}`} className={s.winner}>
                <Text as="h4" textStyle="span" text={winner.name} className={s.name} />
                {(winner.courseName || winner.university) && (
                  <Text asChild className={s.detail}>
                    <span>{courseLine(winner)}</span>
                  </Text>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
