import React from 'react'
import configPromise from '@payload-config'
import { getPayload } from 'payload'

import type { ScholarshipProgrammeBlock as ScholarshipProgrammeBlockProps } from '@/payload-types'

import { byNumberMissingLast } from '@/utilities/sorting'
import { ScholarshipProgrammeView } from './ScholarshipProgrammeView'

// Winners are their own collection rather than page content, so the same list can
// be read from anywhere; the block supplies the heading and the copy around it.
export const ScholarshipProgrammeBlock: React.FC<ScholarshipProgrammeBlockProps> = async (
  props,
) => {
  const payload = await getPayload({ config: configPromise })
  const { docs } = await payload.find({
    collection: 'scholarship-winners',
    sort: 'createdAt',
    depth: 0,
    pagination: false,
    limit: 0,
  })

  const winners = [...docs]
    .sort(byNumberMissingLast((winner) => winner.displayOrder))
    .map((winner) => ({
      id: String(winner.id),
      year: winner.year,
      name: winner.name,
      courseName: winner.courseName,
      university: winner.university,
    }))

  return <ScholarshipProgrammeView {...props} winners={winners} />
}
