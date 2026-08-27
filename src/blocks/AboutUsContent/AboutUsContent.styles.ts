export const aboutUsContentStyles = {
  section: 'font-legacy-condensed w-full bg-[var(--surface-canvas)]',

  wrapperPad: 'pt-10 min-[1023px]:py-5',

  grid: {
    imageRows: 'grid grid-cols-1 gap-[15px] md:gap-[30px]',
    twoColumn: 'grid grid-cols-1 gap-[15px] md:grid-cols-2 md:gap-[30px]',
  },

  item: {
    imageRows: 'grid grid-cols-1 items-start gap-[15px] md:grid-cols-[1fr_3fr] md:gap-[30px]',
    twoColumn: 'block pb-5',
  },

  itemFull: 'md:col-start-1 md:col-end-[span_2]',

  panel:
    'border border-solid border-[color:var(--border-on-light-tile)] bg-[rgb(var(--white))] p-5 shadow-tile-raised transition-shadow duration-200 ease-in-out min-[1023px]:mt-[78px] min-[1023px]:self-start',

  title: 'mb-2.5 block text-[26px] leading-[1.15] font-normal text-[var(--text-on-light-base)]',

  titleFlush: 'mb-0',

  image: 'mb-4 block h-[180px] w-full object-cover md:h-auto',

  imageFlush: 'mb-0',

  imagePicture: 'block w-full',

  imageSizes: '(min-width: 768px) 480px, 100vw',

  body:
    'block text-xl leading-[30px] text-[var(--text-on-light-muted)] [&_a]:!text-[var(--text-on-light-link-hover)] [&_a:hover]:!underline [&_p]:!mb-4 [&>p:last-child]:!mb-0',

  panelGroup: 'mb-5 last:mb-0',

  panelIcon: 'mr-2.5 inline-block h-6 w-6 align-middle text-[var(--border-brand-cyan)]',

  panelHeading:
    'mb-2.5 inline align-middle text-[26px] leading-[1.15] font-normal text-[var(--text-on-light-base)]',

  panelBody:
    'block text-xl leading-[30px] text-[var(--text-on-light-muted)] [&_a]:!text-[var(--text-on-light-link-hover)] [&_a:hover]:!underline [&_p]:!mb-4 [&_ul]:!mb-5 [&_ul]:list-disc [&_ul]:pl-5 [&_ul:last-child]:!mb-0 [&>*:last-child]:!mb-0',
} as const
