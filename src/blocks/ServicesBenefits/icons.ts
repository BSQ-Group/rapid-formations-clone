import type { IconDefinition } from '@fortawesome/fontawesome-svg-core'
import { faBusinessTime } from '@fortawesome/pro-regular-svg-icons/faBusinessTime'
import { faCalendarCheck } from '@fortawesome/pro-regular-svg-icons/faCalendarCheck'
import { faFileCircleCheck } from '@fortawesome/pro-regular-svg-icons/faFileCircleCheck'
import { faHeadset } from '@fortawesome/pro-regular-svg-icons/faHeadset'

export const BENEFIT_ICONS = {
  businessTime: { label: 'Briefcase and clock', icon: faBusinessTime },
  fileCircleCheck: { label: 'Document with tick', icon: faFileCircleCheck },
  headset: { label: 'Headset', icon: faHeadset },
  calendarCheck: { label: 'Calendar with tick', icon: faCalendarCheck },
} satisfies Record<string, { label: string; icon: IconDefinition }>

export type BenefitIcon = keyof typeof BENEFIT_ICONS

export const BENEFIT_ICON_OPTIONS = Object.entries(BENEFIT_ICONS).map(([value, { label }]) => ({
  label,
  value,
}))
