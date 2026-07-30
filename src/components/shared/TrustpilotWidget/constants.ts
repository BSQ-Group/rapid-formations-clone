export const TRUSTPILOT_BUSINESS_UNIT_ID = '5714e6d50000ff00058baea3'

export const TRUSTPILOT_TEMPLATE_IDS = {
  mini: '53aa8807dec7e10d38f59f32',
  microCombo: '5406e65db0d04a09e042d5fc',
  microTrustScore: '5419b637fa0340045cd0c936',
  carousel: '54ad5defc6454f065c28af8b',
} as const

export type TrustpilotTemplate = keyof typeof TRUSTPILOT_TEMPLATE_IDS

export const TRUSTPILOT_REVIEW_URL =
  'https://uk.trustpilot.com/review/www.qualitycompanyformations.co.uk'
