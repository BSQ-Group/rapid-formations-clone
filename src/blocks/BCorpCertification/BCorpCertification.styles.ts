export const bCorpCertificationStyles = {
  // Section: SectionWrapper provides bg + vertical padding via sectionLayout.
  // Horizontal padding: px-4 (16px mobile) → md:px-10 (40px tablet/laptop) → xl:px-0
  // (desktop+, where banner self-limits via max-w-[1200px] / wide:max-w-[1440px]).
  section: 'w-full px-4 md:px-10 xl:px-0',

  // Banner: fluid with 1200:640 aspect-ratio on mobile/tablet so the height
  // scales naturally with the available width.
  // At lg (1024px): switches to fixed 640px height — the section still has
  // 40px padding each side, giving a 944px-wide banner at 1024px viewport.
  // At xl (1280px): max-w-[1200px] + mx-auto → 40px gutters each side.
  // At wide (1800px): max-w-[1440px] → 180px gutters: (1800−80)/2 − 1440/2 = 180px.
  banner:
    'relative w-full rounded-3xl aspect-[1200/640] lg:aspect-auto lg:h-[640px] xl:max-w-[1200px] wide:max-w-[1440px] xl:mx-auto overflow-hidden',

  backgroundImage: 'object-cover',

  // Dark overlay: 20% black tint over the background photo (Figma: rgba(0,0,0,0.2)).
  darkOverlay: 'absolute inset-0 bg-black/20',

  // Badge: centered inside the banner.
  // Mobile: 244 × 123px; tablet/desktop (md+): 485 × 244px.
  badgeWrapper: 'absolute inset-0 flex items-center justify-center',
  badgeImage: 'relative w-[244px] h-[123px] md:w-[485px] md:h-[244px] shrink-0',
} as const
