export const landingHeroStyles = {
  // Section wrapper
  section:
    'relative w-full flex flex-col items-center -mt-[var(--header-height)] md:pt-0 justify-center min-h-[900px] bg-[var(--surface-canvas-inverse)] overflow-hidden',

  // Background image — hidden on mobile, covers full area on tablet+
  backgroundWrapper: 'absolute inset-0 hidden md:block',
  backgroundImg: 'object-cover object-right-top size-full',

  // Main content container
  container:
    'relative flex flex-col gap-9 items-start w-full max-w-[1200px] wide:max-w-[1440px] mx-auto px-4 md:px-8 lg:px-10 xl:px-0 pt-10 md:pt-0',

  // Content group (headline + CTAs)
  content: 'flex flex-col gap-6 w-full',

  // Headline block (eyebrow + heading + benefits)
  headlineBlock: 'flex flex-col gap-5 w-full',
  headlineGroup: 'flex flex-col gap-3 max-w-[670px]',

  // Eyebrow
  eyebrow: 'font-medium opacity-80 text-[var(--text-inverse)]',

  // Heading
  heading: 'text-[var(--text-inverse)]',

  // Benefits list
  benefitsList: 'flex flex-col max-w-[670px]',
  benefitItem: 'flex items-center gap-3 py-1',
  benefitIconContainer:
    'flex-shrink-0 size-8 rounded-full flex items-center justify-center bg-[var(--surface-accent)]',
  benefitIcon: 'text-[var(--icon-default)]',
  benefitText: 'font-medium text-[var(--text-inverse)]',

  // CTAs container (search input + pricing link)
  ctaContainer: 'flex flex-col gap-3 w-full max-w-[500px]',

  // Search input
  searchInput: 'flex items-center bg-[var(--surface-primary)] rounded-xl pl-6 pr-2 py-2 w-full',
  searchPlaceholder:
    'flex-1 min-w-0 bg-transparent border-none outline-none font-medium text-md text-[var(--text-strong)] placeholder:text-[var(--text-placeholder)]',
  searchButton: 'flex-shrink-0 rounded size-[46px]',
  searchButtonIcon: 'text-[var(--icon-default)]',

  // Pricing link
  pricingLink: 'text-sm font-normal text-[var(--text-inverse)] underline hover:opacity-80',

  // ─── Result states (available / unavailable) ────────────────────────────────

  // Status badge — shared chrome
  resultBadge:
    'flex items-center gap-1.5 w-fit rounded-full px-4 py-2 border text-sm font-semibold',
  resultBadgeAvailable:
    'bg-[rgba(121,217,133,0.1)] border-[rgba(121,217,133,0.4)] text-[var(--surface-accent)]',
  resultBadgeUnavailable:
    'bg-[rgba(231,71,39,0.1)] border-[rgba(231,71,39,0.4)] text-[var(--border-error)]',

  // Result eyebrow ("COMPANY NAME CHECK")
  resultEyebrow: 'text-[var(--text-inverse-muted)] text-xs font-semibold uppercase tracking-wider',

  // Company name + decorative bar
  resultNameBlock: 'flex flex-col gap-1.5',
  resultName: 'text-[var(--text-inverse)] uppercase',
  resultNameUnavailable: 'line-through decoration-[rgba(234,61,61,0.6)]',
  resultBarAvailable: 'h-[3px] w-16 rounded-sm bg-[var(--surface-accent)]',
  resultBarUnavailable: 'h-[3px] w-16 rounded-sm bg-[var(--border-error)]',

  // Description
  resultDescription: 'text-[var(--text-inverse)]',

  // Available state CTAs
  availableCtaRow: 'flex flex-col sm:flex-row items-stretch sm:items-center gap-3',
  searchAgainLink:
    'text-[var(--text-inverse-muted)] text-sm font-medium underline cursor-pointer whitespace-nowrap hover:opacity-80 text-center sm:text-left',

  // Unavailable state search row
  unavailableSearchRow: 'flex flex-col sm:flex-row items-stretch w-full max-w-[500px] gap-4',
  unavailableInput:
    'flex-1 min-w-0 px-4 py-3 bg-transparent border border-[rgba(255,255,255,0.2)] rounded sm:rounded-r-none text-[var(--text-inverse)] placeholder:text-[var(--text-inverse-muted)] outline-none focus:border-[rgba(255,255,255,0.5)] transition-colors',
  unavailableSearchButton: 'sm:rounded-l-none',

  // Reviews section — Figma centre-aligns the Trustpilot and Google blocks
  // (their star rows/text line up); the live Trustpilot Mini iframe is a fixed
  // 100px tall while the Google block is ~89px, so `items-end` pushed Google
  // ~5px below the Figma Y. `items-center` lands the Google stars/text on the
  // Figma row. Figma's inter-block gap is ~7px; `gap-1` (4px) matches once the
  // Trustpilot iframe's own right padding is accounted for (CORE-3494).
  reviews: 'flex gap-1 md:gap-2 items-center',

  // Trustpilot — wraps the official Trustpilot Mini widget (logo + stars + score).
  // Figma sizes the Mini lock-up at ~179px wide; the live widget previously got a
  // 200px container, which (plus the -ml-2 nudge) pushed the Google column past the
  // 328px content area at 360px and clipped "Rated 4.9 | 462 reviews". Constraining
  // the container to the Figma width lets the full-size Google stars fit (CORE-3494).
  trustpilotContainer: 'w-[180px] -ml-2',

  // Google — gold-star glyph is 24px at every breakpoint per Figma (re-measured
  // CORE-3494): the gold stars are SMALLER than the Trustpilot green squares
  // (~32px) — the prior `size-7`/28px oversized them (5-star span rendered ~144px
  // vs Figma's ~132px mobile / ~136px desktop). `size-6` (24px) + `gap-1` (4px)
  // gives a 136px span (5×24 + 4×4), an exact desktop match and within tolerance
  // of mobile (the 25×24 viewBox glyph occupies ~23px, so the visible span lands
  // ~132px). Stars→text gap: Figma sits the "Rated…" line directly under the star
  // band (~2px); `gap-0` on the container + an `h-6` box that hugs the 24px glyph
  // lands the text top on the Figma Y. Logo→stars gap (`googleInner gap-1.5`) kept.
  googleContainer: 'flex flex-col gap-0 items-start pt-[12px]',
  googleInner: 'flex flex-col gap-1.5 items-start',
  googleLogo: 'h-5 w-auto',
  googleStars: 'flex items-center h-6 gap-1 mb-[9px]',
  googleStar: 'size-6',
  googleText: 'whitespace-nowrap text-[var(--text-inverse)] text-[11px]',
} as const
