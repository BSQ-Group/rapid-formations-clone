// Promo Tier 2 — full-bleed dark "highlight strip" banner: icon tile + title
// on the left, price + Buy now button on the right. Designed at five viewports
// (360 / 768 / 1024 / 1280 / 1800). Row layout from tablet up; mobile stacks
// into two rows (icon+title, then price+button).
export const promoTier2Styles = {
  // Full-bleed dark band. The bg is the QCF text-subtle slate (#3b3b49) — the
  // strip's own identity, not a generic section tone — so it overrides whatever
  // SectionWrapper background the CMS sets. Vertical padding still comes from
  // the CMS sectionLayout via SectionWrapper.
  section: 'bg-[var(--text-subtle)]',

  // Inner wrapper: capped at 1440 and centred with mx-auto so the content
  // sits in the middle of the full-bleed dark band (without mx-auto it
  // left-aligns once max-w kicks in below the wide breakpoint). Horizontal
  // padding matches Figma per tier (16 mobile / 32 tablet / 40 lg+); at wide
  // the centred 1440 box yields Figma's ~180px side gap on its own, so no
  // explicit padding there. Row from md up, column on mobile.
  inner:
    'flex w-full max-w-[1440px] mx-auto flex-col gap-8 md:flex-row md:items-center md:justify-between md:gap-8 px-4 md:px-8 lg:px-10 wide:px-0',

  // Left group — icon tile + title.
  left: 'flex items-center gap-8 md:flex-1 md:min-w-0',

  // Icon tile — translucent grey square with a rounded radius, green icon.
  // rgba literals match Figma's glass overlay (same pattern as PromoTier3 pills).
  iconTile:
    'shrink-0 flex items-center justify-center size-[88px] rounded-[20px] bg-[rgba(122,122,134,0.3)] border-[0.7px] border-[rgba(225,225,230,0.2)]',

  icon: 'text-[var(--surface-accent)] size-8',

  // Title — headline-2xl preset (20px mobile → 30px wide), white.
  title: 'text-[var(--text-inverse)] w-full',

  // Right group — price block + button. Mobile: full width, justify-end so the
  // price hugs the left and the button the right edge.
  right: 'flex flex-wrap items-center justify-end gap-4 w-full md:w-auto md:shrink-0',

  // Price block — prefix above the price. Mobile: left-aligned and flex-1 so it
  // fills the bottom row to the left of the button (Figma space-between layout).
  // md+: shrinks to content and right-aligns inside the right group.
  priceBlock: 'flex flex-col justify-center flex-1 items-start md:flex-none md:items-end',

  // "from" prefix — body-sm preset (14 → wide:16), muted inverse.
  pricePrefix: 'text-[var(--text-inverse-subtle)]',

  // Price — headline-2xl preset (20px mobile → 30px wide), white, semibold from
  // the preset. whitespace-nowrap so "£75.99 +VAT" never wraps.
  price: 'text-[var(--text-inverse)] whitespace-nowrap',

  // CTA button — green primary. Figma button text is 20px at wide, 16px below,
  // matching PromoTier2's button-large token; override xl+ to 20px.
  ctaLink: 'inline-block shrink-0',
  cta: 'xl:!text-[20px] xl:!leading-8',
} as const
