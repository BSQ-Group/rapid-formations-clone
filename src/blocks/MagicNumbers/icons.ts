import type { IconDefinition } from '@fortawesome/fontawesome-svg-core'
import { faClock } from '@fortawesome/pro-solid-svg-icons/faClock'
import { faComments } from '@fortawesome/pro-solid-svg-icons/faComments'
import { faFile } from '@fortawesome/pro-solid-svg-icons/faFile'
import { faGraduationCap } from '@fortawesome/pro-solid-svg-icons/faGraduationCap'
import { faMapMarker } from '@fortawesome/pro-solid-svg-icons/faMapMarker'
import { faPhone } from '@fortawesome/pro-solid-svg-icons/faPhone'
import { faShieldAlt } from '@fortawesome/pro-solid-svg-icons/faShieldAlt'
import { faThumbsUp } from '@fortawesome/pro-solid-svg-icons/faThumbsUp'
import { faUniversity } from '@fortawesome/pro-solid-svg-icons/faUniversity'

export const magicNumberIcons = {
  comments: faComments,
  mapMarker: faMapMarker,
  file: faFile,
  graduationCap: faGraduationCap,
  shield: faShieldAlt,
  clock: faClock,
  phone: faPhone,
  university: faUniversity,
  thumbsUp: faThumbsUp,
} as const satisfies Record<string, IconDefinition>

export type MagicNumberIcon = keyof typeof magicNumberIcons

export const magicNumberIconOptions = [
  { label: 'Comments', value: 'comments' },
  { label: 'Map marker', value: 'mapMarker' },
  { label: 'File', value: 'file' },
  { label: 'Graduation cap', value: 'graduationCap' },
  { label: 'Shield', value: 'shield' },
  { label: 'Clock', value: 'clock' },
  { label: 'Phone', value: 'phone' },
  { label: 'University', value: 'university' },
  { label: 'Thumbs up', value: 'thumbsUp' },
]
