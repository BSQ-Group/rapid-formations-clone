import type { IconDefinition } from '@fortawesome/fontawesome-svg-core'

import { faBuildingShield } from '@fortawesome/pro-solid-svg-icons/faBuildingShield'
import { faChartPie } from '@fortawesome/pro-solid-svg-icons/faChartPie'
import { faClipboardListCheck } from '@fortawesome/pro-solid-svg-icons/faClipboardListCheck'
import { faGlobe } from '@fortawesome/pro-solid-svg-icons/faGlobe'
import { faHandHoldingHand } from '@fortawesome/pro-solid-svg-icons/faHandHoldingHand'
import { faPhone } from '@fortawesome/pro-solid-svg-icons/faPhone'
import { faPiggyBank } from '@fortawesome/pro-solid-svg-icons/faPiggyBank'
import { faSlidersUp } from '@fortawesome/pro-solid-svg-icons/faSlidersUp'
import { faThumbsUp } from '@fortawesome/pro-solid-svg-icons/faThumbsUp'

export const whyUseAgentIcons: Record<string, IconDefinition> = {
  'building-shield': faBuildingShield,
  'chart-pie': faChartPie,
  'clipboard-list-check': faClipboardListCheck,
  globe: faGlobe,
  'hand-holding-hand': faHandHoldingHand,
  phone: faPhone,
  'piggy-bank': faPiggyBank,
  'sliders-up': faSlidersUp,
  'thumbs-up': faThumbsUp,
}

export const whyUseAgentIconNames = Object.keys(whyUseAgentIcons)
