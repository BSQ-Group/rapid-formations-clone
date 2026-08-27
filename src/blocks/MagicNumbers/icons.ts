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

export const MAGIC_NUMBER_ICONS = {
  comments: { label: 'Comments', icon: faComments },
  mapMarker: { label: 'Map marker', icon: faMapMarker },
  file: { label: 'File', icon: faFile },
  graduationCap: { label: 'Graduation cap', icon: faGraduationCap },
  shield: { label: 'Shield', icon: faShieldAlt },
  clock: { label: 'Clock', icon: faClock },
  phone: { label: 'Phone', icon: faPhone },
  university: { label: 'University', icon: faUniversity },
  thumbsUp: { label: 'Thumbs up', icon: faThumbsUp },
} satisfies Record<string, { label: string; icon: IconDefinition }>

export const MAGIC_NUMBER_ICON_OPTIONS = Object.entries(MAGIC_NUMBER_ICONS).map(
  ([value, { label }]) => ({ label, value }),
)
