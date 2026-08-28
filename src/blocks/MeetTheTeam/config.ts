import type { Block } from 'payload'

import { sectionLayoutField } from '@/fields/sectionLayout'

export const MeetTheTeam: Block = {
  slug: 'meetTheTeam',
  interfaceName: 'MeetTheTeamBlock',
  labels: {
    singular: 'Meet The Team',
    plural: 'Meet The Team',
  },
  admin: {
    group: 'About',
  },
  fields: [
    sectionLayoutField({ gap: true, defaults: { paddingTop: 'none', paddingBottom: 'none' } }),
  ],
}
