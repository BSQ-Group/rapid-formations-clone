// Sizes derived from Figma at every viewport: 360, 768, 1024, 1280, 1800.
// Section uses BSQ Spacing/Section S vertical padding via SectionWrapper.
// Below lg cards stack. From lg onwards layout adapts to the card count
// inside each group: 2 cards = side-by-side row (each flex-1); 3+ cards
// render as a 3-column wrap row with the trailing partial row left-aligned
// at the same card width.
export const serviceCardsStyles = {
  // Section + title used by the NEW groups path. Figma's updated design
  // dropped the 24px description container from the section header, so
  // the effective h2-to-grid gap is now just the section's `gap-14`
  // (56px). Reverted to the legacy spacing to match.
  section:
    'flex flex-col items-center w-full mx-auto gap-8 px-4 md:gap-14 md:px-8 lg:px-10 xl:max-w-[1280px] wide:max-w-[1800px] wide:px-[180px]',

  // Figma uses heading-500 (48px / 56px / 800 / tracking -1px) at every
  // viewport — no responsive shrink — so we can't use the auto-scaling
  // Text preset here. Component passes textStyle="span" so no preset
  // sizes apply; these classes are the source of truth.
  // text-5xl now carries 56px line-height at the token level (CORE-3721), so no leading override needed.
  title: 'text-[var(--text-strong)] font-extrabold w-full text-5xl tracking-[-1px]',

  // Section + title used by the LEGACY fallback path (top-level `cards`
  // field, rendered as a single anonymous group). These intentionally
  // keep the pre-CORE-3571 values so pages still on legacy data
  // (`/confirmation-statement`, `/renewals` before the post-merge
  // migration) render identically to current production. Remove these
  // variants when the legacy `cards` field is dropped.
  sectionLegacy:
    'flex flex-col items-center w-full mx-auto gap-8 px-4 md:gap-14 md:px-8 lg:px-10 xl:max-w-[1280px] wide:max-w-[1800px] wide:px-[180px]',

  titleLegacy: 'text-[var(--text-strong)] font-bold w-full wide:leading-[56px]',

  groupsList: 'flex flex-col items-stretch gap-10 w-full',

  group: 'flex flex-col items-start gap-6 w-full',

  // headline-2xl preset jumps to text-3xl (30px) at wide, but Figma's
  // group subtitle stays at heading-2xl (24px / leading-32) at every
  // viewport. Override wide back down to text-2xl / leading-8.
  groupSubtitle: 'text-[var(--text-subtle)] font-semibold w-full wide:text-2xl wide:leading-8 wide:tracking-[-0.25px]',

  // Legacy single-row layout — used when rendering the deprecated top-level
  // `cards` field (pre-Groups data). Preserves the pre-CORE-3571 visual:
  // all cards in one row at lg+, each flex-1, no wrap. Remove when the
  // legacy `cards` field is dropped.
  cardsListLegacy: 'flex flex-col items-stretch gap-6 w-full lg:flex-row',

  // Layout when the group has exactly 2 cards — side-by-side row at lg+.
  cardsListTwoUp: 'flex flex-col items-stretch gap-6 w-full lg:flex-row',

  // Layout for 1 card and for 3+ cards — wrap row at lg+ so trailing cards
  // left-align at the standard 1/3 column width (Figma's "partial row"
  // behavior). Below lg, stacks like the 2-up.
  cardsListMultiUp: 'flex flex-col items-stretch gap-6 w-full lg:flex-row lg:flex-wrap',

  // Card sizing for the 2-up layout — fills 50% at lg+.
  cardTwoUp:
    'flex flex-col items-start w-full gap-6 p-6 rounded-3xl bg-[var(--surface-tertiary)] border border-[var(--border-subtle)] md:gap-5 md:p-8 lg:flex-1 lg:justify-between lg:self-stretch xl:gap-7',

  // Card sizing for the multi-up layout — fixed at calc(33.333% - 16px)
  // at lg+ so 3 cards fill a row exactly (24px gap × 2 = 48px, / 3 = 16px)
  // and any trailing card keeps the same width left-aligned.
  // Internal gap matches Figma per viewport: 20px at ≤lg, 16px at xl+.
  cardMultiUp:
    'flex flex-col items-start w-full gap-5 p-6 rounded-3xl bg-[var(--surface-tertiary)] border border-[var(--border-subtle)] md:p-8 lg:w-[calc(33.333%-16px)] lg:flex-none lg:justify-between lg:self-stretch xl:gap-4',

  iconTile:
    'flex items-center justify-center shrink-0 w-12 h-12 p-3 rounded-lg bg-[var(--surface-accent-light)]',

  iconSvg: 'w-6 h-6 text-[var(--text-strong)]',

  body:
    'flex flex-col items-start gap-6 w-full md:flex-row md:items-end md:gap-8 lg:flex-col lg:items-start lg:gap-5 lg:flex-1 lg:w-full xl:gap-7',

  textCol:
    'flex flex-col items-start gap-1 w-full md:flex-1 md:gap-2 md:min-w-0 md:w-auto lg:w-full lg:gap-4',

  // Figma's heading-300 token resolves to:
  //   - 20px / 28 lh / Bold / 0 tracking      at 360 (mobile)
  //   - 24px / 32 lh / Bold / -0.25 tracking  at 768 (tablet)
  //   - 30px / 36 lh / Bold / -0.25 tracking  at 1024+ (desktop)
  // The headline-3xl preset auto-grows further at wide; flat per
  // viewport here matches Figma's token resolution. Component passes
  // textStyle="span" so no preset sizes leak in.
  cardTitle:
    'text-[var(--text-strong)] font-bold text-xl leading-7 md:text-2xl md:leading-8 md:tracking-[-0.25px] lg:text-3xl lg:leading-9',

  // Figma's body-300 token is 16px / 24px at every viewport — does NOT
  // jump to text-lg at wide the way the body-base preset does. Used by
  // the NEW groups path.
  description: 'text-[var(--text-muted)] w-full text-base leading-6',

  // Legacy card title + description — preserve the pre-CORE-3571 behaviour
  // for pages still on `cards[]` data (`/confirmation-statement`,
  // `/renewals` until the post-merge migration). Component passes
  // `textStyle="headline-3xl"` and `textStyle="body-base"` for legacy so
  // the preset's auto-scaling (20→24→30→36 for title, 16→18 for
  // description) ships unchanged. These classes only carry color +
  // weight overrides — sizes come from the preset. Remove when the
  // legacy `cards` field is dropped.
  cardTitleLegacy: 'text-[var(--text-strong)] font-bold',

  descriptionLegacy: 'text-[var(--text-muted)] w-full leading-6 wide:leading-6',

  // 2-up + legacy: at lg+ the card is wide enough to put price + button on
  // one row (price flex-1, button right-aligned via justify-between).
  priceCol:
    'flex flex-col items-start gap-2 w-full md:w-[159px] md:items-end md:gap-4 md:shrink-0 lg:w-full lg:flex-row lg:items-center lg:justify-between lg:gap-4',

  // Multi-up cards (3+ per row): card width at lg / xl is ~1/3 of content
  // (~299px at 1024, ~384px at 1280), too narrow for a side-by-side
  // price+button — Figma stacks them at both. At wide (1800) the multi-up
  // card jumps to ~464px content area and Figma switches to row layout
  // with the price on the left and the Order button on the right
  // (justify-between).
  priceColMultiUp:
    'flex flex-col items-start gap-2 w-full md:w-[159px] md:items-end md:gap-4 md:shrink-0 lg:w-full lg:items-start lg:gap-4 wide:flex-row wide:items-center wide:justify-between',

  // `whitespace-nowrap` keeps "£XX.XX +VAT" on one line — Figma's price
  // spec includes it, and at narrow widths (e.g. 768 where price col is
  // 159px, or 360 with the longer £149.99 / £139.99 prices) without
  // nowrap the "+VAT" suffix breaks onto its own line.
  price:
    'text-[var(--text-strong)] font-bold tracking-[-0.25px] text-2xl leading-8 md:text-2xl md:leading-8 md:text-right whitespace-nowrap lg:text-3xl lg:leading-9 lg:text-left lg:flex-1 lg:tracking-[-0.25px] wide:text-4xl wide:leading-10 wide:tracking-[-1px]',

  // Multi-up price: flat per viewport like Figma's heading-300 token —
  // 24px / 32 / 700 at ≤768, 30px / 36 / 700 at ≥1024. Tracking stays
  // -0.25px everywhere (NOT the `-1px` the legacy `price` style applies
  // at wide). Drops `lg:flex-1` because priceColMultiUp is flex-col at
  // lg+ — flex-1 inside a column would stretch the price block
  // vertically.
  priceMultiUp:
    'text-[var(--text-strong)] font-bold tracking-[-0.25px] text-2xl leading-8 md:text-right whitespace-nowrap lg:text-3xl lg:leading-9 lg:text-left',

  orderBtn: 'w-full md:w-auto',
} as const
