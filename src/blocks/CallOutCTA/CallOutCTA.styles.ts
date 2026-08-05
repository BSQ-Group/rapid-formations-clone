export const callOutCTAStyles = {
  section: 'flex flex-col items-center w-full px-4 lg:px-6',

  card: [
    'flex flex-col lg:flex-row-reverse',
    'gap-0',
    'bg-[var(--surface-primary)] rounded-3xl p-5',
    'w-full max-w-[1200px] lg:min-h-[440px]',
    'overflow-hidden',
  ].join(' '),

  imageWrapper: 'relative w-full h-[212px] lg:h-auto lg:flex-1 rounded-lg overflow-hidden shrink-0',
  image: 'object-cover',

  // Content — bottom on mobile, left column on desktop
  content: [
    'flex flex-col gap-5 lg:gap-8 justify-center',
    'py-5 lg:py-0',
    'px-0 lg:px-10',
    'lg:w-[55%] lg:shrink-0',
  ].join(' '),

  heading: 'text-[var(--text-strong)]',

  searchInput:
    'flex items-center bg-[var(--surface-secondary)] rounded-xl pl-5 lg:pl-6 pr-2 py-2 w-full',
  searchInputField:
    'flex-1 min-w-0 bg-transparent border-none outline-none font-medium text-md text-[var(--text-strong)] placeholder:text-[var(--text-placeholder)]',
  searchButton: 'flex-shrink-0 rounded size-[46px]',
  searchButtonIcon: 'text-white',
} as const
