import { CircleCheckBig, Check, Search, ShoppingCart, X, MapPin, PieChart } from 'lucide-react'

import { cn } from '@/utilities/ui'

import { stepCardOverlayStyles as s } from './StepCardOverlay.styles'

function NamecheckerOverlay() {
  return (
    <div aria-hidden="true" className={s.nc_root}>
      <div className={s.nc_widget}>
        <div className={s.nc_input}>
          <span className={s.nc_inputText}>Fern &amp; Folly Ltd</span>
          <div className={s.nc_searchBtn}>
            <Search className="h-4 w-4 text-[var(--text-strong)]" />
          </div>
        </div>
        <div className={s.nc_badge}>
          <CircleCheckBig className="h-3 w-3 text-[var(--surface-accent)]" />
          <span className={s.nc_badgeText}>Available</span>
        </div>
      </div>
    </div>
  )
}

function PackageCard() {
  return (
    <div className={s.pkg_card}>
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <span className={s.pkg_title}>Fully Inclusive</span>
          <div className={s.pkg_valueBadge}>
            <span className={s.pkg_valueBadgeText}>Best value</span>
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <div className={cn(s.pkg_skeleton, 'w-[169px]')} />
          <div className={cn(s.pkg_skeleton, 'w-[137px]')} />
        </div>
        <div className="flex items-baseline gap-1">
          <span className={s.pkg_price}>£9.99</span>
          <div className={s.pkg_priceAccent} />
        </div>
        <div className={s.pkg_orderBtn}>
          <span className={s.pkg_orderBtnText}>Order</span>
        </div>
      </div>
      <div className={s.pkg_divider} />
      <div className="flex flex-col gap-1.5">
        <div className={cn(s.pkg_skeleton, 'w-24')} />
        {[0, 1, 2].map((i) => (
          <div key={i} className="flex items-center gap-1 py-0.5">
            <div className={s.pkg_checkCircle}>
              <Check className="h-[8.8px] w-[8.8px] text-[var(--text-strong)]" />
            </div>
            <div className={cn(s.pkg_skeleton, 'flex-1')} />
          </div>
        ))}
      </div>
      <div className={s.pkg_footerSkeleton} />
    </div>
  )
}

function PackageCardsOverlay() {
  return (
    <div aria-hidden="true" className={s.pkg_root}>
      <div
        className="absolute"
        style={{ left: 'calc(50% + 13px)', top: '154px', transform: 'translateX(-50%)' }}
      >
        <PackageCard />
      </div>
      <div className="absolute left-1/2 -translate-x-1/2" style={{ top: '135px' }}>
        <PackageCard />
      </div>
    </div>
  )
}

function BasketOverlay() {
  return (
    <div aria-hidden="true" className={s.bsk_root}>
      <div className={s.bsk_card}>
        <div className={s.bsk_header}>
          <ShoppingCart className="h-[13.5px] w-[13.5px] shrink-0 text-[var(--text-muted)]" />
          <span className={s.bsk_headerText}>Your basket</span>
          <X className="h-[13.5px] w-[13.5px] shrink-0 text-[var(--text-muted)]" />
        </div>
        <div className={s.bsk_divider} />
        <div className={s.bsk_pkgRow}>
          <span className={s.bsk_pkgName}>Fully Inclusive Package</span>
          <div className={s.bsk_pill}>
            <div className={s.bsk_pillCheck}>
              <Check className="h-1.5 w-1.5 text-[var(--text-strong)]" />
            </div>
            <span className={s.bsk_pillText}>Added</span>
          </div>
        </div>
        <div className={s.bsk_skeletonRow}>
          <div className={cn(s.bsk_skeleton, 'w-[124px]')} />
          <div className={cn(s.bsk_skeleton, 'w-8')} />
        </div>
        <div className={s.bsk_skeletonRow}>
          <div className={cn(s.bsk_skeleton, 'w-[81px]')} />
          <div className={cn(s.bsk_skeleton, 'w-8')} />
        </div>
        <div className={s.bsk_checkoutBtn}>
          <span className={s.bsk_checkoutBtnText}>Checkout</span>
        </div>
      </div>
    </div>
  )
}

function CompanyDetailsOverlay() {
  return (
    <div aria-hidden="true" className={s.dtl_root}>
      <div className={s.dtl_container}>
        <div className={s.dtl_card1}>
          <div className={s.dtl_iconBg}>
            <MapPin
              className="h-[15.6px] w-[15.6px] text-[var(--icon-default)]"
              strokeWidth={1.5}
            />
          </div>
          <div className="flex flex-col gap-0.5">
            <span className={s.dtl_title}>Registered office</span>
            <span className={s.dtl_subtitle}>37 Mare Street, London E8</span>
          </div>
        </div>
        <div className={s.dtl_card2}>
          <div className={s.dtl_cardContent}>
            <div className={s.dtl_iconBg}>
              <PieChart
                className="h-[15.6px] w-[15.6px] text-[var(--icon-default)]"
                strokeWidth={1.5}
              />
            </div>
            <div className="flex flex-col gap-0.5">
              <span className={s.dtl_title}>Allocating shares…</span>
              <span className={s.dtl_subtitle}>60 of 100 ordinary shares</span>
            </div>
          </div>
          <div className={s.dtl_progressTrack}>
            <div className={s.dtl_progressFill} />
          </div>
        </div>
      </div>
    </div>
  )
}

const OVERLAYS = [
  <NamecheckerOverlay key="nc" />,
  <PackageCardsOverlay key="pkg" />,
  <BasketOverlay key="bsk" />,
  <CompanyDetailsOverlay key="dtl" />,
]

export function getStepOverlay(index: number): React.ReactNode | null {
  return OVERLAYS[index] ?? null
}
