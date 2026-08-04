import { TrustpilotWidget } from '@/components/shared/TrustpilotWidget'

export function TrustpilotCarousel() {
  return (
    <TrustpilotWidget
      template="carousel"
      height="240px"
      width="100%"
      stars="5"
      reviewLanguages="en"
      className="w-full min-h-[240px]"
    />
  )
}
