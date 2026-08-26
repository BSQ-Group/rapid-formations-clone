export const videoLibraryStyles = {
  section: 'font-legacy-condensed w-full bg-[var(--surface-canvas)]',

  nav: 'my-8 md:my-12',

  navMobile: 'block md:hidden',
  navDesktop: 'hidden md:block',

  dropdown:
    'w-full cursor-pointer appearance-none rounded-lg border-2 border-solid border-[color:var(--border-on-light-select)] bg-[var(--surface-canvas)] py-3 pr-10 pl-4 text-lg text-[var(--text-on-light-base)] focus:border-[color:var(--border-on-light-select)] focus:outline-none',

  buttonGrid: 'mx-auto grid max-w-[1200px] grid-cols-4 gap-4',

  categoryButton:
    'cursor-pointer rounded-none border-none bg-[var(--surface-on-light-inverse)] px-6 py-4 text-lg leading-[23px] font-medium text-[var(--text-strong)] transition-colors hover:bg-[var(--surface-on-light-inverse-hover)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--border-focus)]',

  sections: 'my-12',

  categorySection: 'mb-12 scroll-mt-[100px] md:mb-16 min-[1023px]:mb-20',

  categoryTitle:
    'mb-8 block text-left text-[30px] leading-[1.2] font-bold text-[var(--text-on-light-base)] md:text-[36px]',

  videosGrid:
    'grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-x-6 md:gap-y-8 min-[1023px]:grid-cols-3',

  card: 'bg-[var(--surface-canvas)]',

  thumbnailTrigger: 'relative block w-full cursor-pointer',

  thumbnail: 'relative mb-4 w-full overflow-hidden',

  thumbnailImage: 'h-full w-full rounded object-cover transition-all duration-300',

  playIconHidden: 'hidden',

  videoTitle:
    'mb-4 block text-[22px] leading-[1.1] font-semibold text-[var(--text-on-light-base)] md:min-h-[70px]',

  meta: 'mt-2 flex items-center justify-between text-lg text-[var(--text-on-light-muted)]',

  duration: 'm-0 flex items-center gap-2',

  clockIcon: 'h-4 w-4',

  publishedDate: 'm-0',
} as const
