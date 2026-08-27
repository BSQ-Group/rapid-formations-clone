import React from 'react'
import configPromise from '@payload-config'
import { getPayload } from 'payload'

import type { MeetTheTeamBlock as MeetTheTeamBlockProps } from '@/payload-types'

import { Container } from '@/components/shared/Container/Container'
import { SectionWrapper } from '@/components/shared/SectionWrapper/SectionWrapper'
import { byNumberMissingLast } from '@/utilities/sorting'
import { MemberCard } from './MemberCard'
import { meetTheTeamStyles as s } from './MeetTheTeam.styles'

export const MeetTheTeamBlockComponent: React.FC<MeetTheTeamBlockProps> = async ({
  sectionLayout,
}) => {
  const payload = await getPayload({ config: configPromise })
  const { docs } = await payload.find({
    collection: 'staff',
    depth: 1,
    pagination: false,
    limit: 0,
  })

  const members = [...docs].sort(byNumberMissingLast((member) => member.displayOrder))

  if (!members.length) return null

  return (
    <SectionWrapper {...sectionLayout} className={s.section}>
      <Container>
        <div className={s.grid}>
          {members.map((member) => (
            <MemberCard
              key={member.id}
              fullName={member.fullName}
              jobTitle={member.jobTitle}
              photo={member.photo}
              facts={member.facts}
            />
          ))}
        </div>
      </Container>
    </SectionWrapper>
  )
}
