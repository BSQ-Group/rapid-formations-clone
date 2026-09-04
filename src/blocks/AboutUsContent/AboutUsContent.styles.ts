export const aboutUsContentStyles = {
  section: 'font-legacy-condensed w-full',

  wrapperPad: 'pt-10 min-[1023px]:py-0',

  grid: {
    imageRows: 'grid grid-cols-1 gap-[15px] md:gap-[30px]',
    twoColumn: 'grid grid-cols-1 gap-[15px] md:grid-cols-2 md:gap-[30px]',
  },

  item: {
    imageRows: 'grid grid-cols-1 items-start gap-[15px] md:grid-cols-[1fr_3fr] md:gap-[30px]',
    twoColumn: 'block',
  },

  itemHalf: 'pb-5',

  itemFull: 'md:col-start-1 md:col-end-[span_2]',

  panel:
    'border border-solid border-[color:var(--border-on-light-tile)] bg-[rgb(var(--white))] p-5 shadow-tile-raised transition-shadow duration-200 ease-in-out min-[1023px]:mt-[78px] min-[1023px]:self-start',

  title: 'mb-2.5 block text-[26px] leading-[32.11px] font-normal text-[var(--text-on-light-base)]',

  image: 'mb-4 block h-[180px] w-full object-cover md:h-auto',

  imageFlush: 'mb-0',

  copyFullRow: 'md:col-span-2',

  imagePicture: 'block w-full',

  imageSizesRow: '(min-width: 1230px) 285px, (min-width: 768px) 25vw, 100vw',

  imageSizesHalf: '(min-width: 1230px) 570px, (min-width: 768px) 48vw, 100vw',

  imageSizesFull: '(min-width: 1230px) 1170px, (min-width: 768px) 96vw, 100vw',

  body: 'block text-xl leading-[30px] text-[var(--text-on-light-muted)] [&_strong]:!font-bold [&_strong]:!text-[var(--text-on-light-strong)] [&_a]:!text-[var(--text-on-light-link-hover)] [&_a:hover]:!underline [&_p]:!mb-4 [&>p:last-child]:!mb-0',

  panelGroup: 'mb-5 text-xl leading-[30px] last:mb-0',

  panelIcon: 'mr-2.5 inline-block h-6 w-6 align-middle text-[var(--border-brand-cyan)]',

  panelHeading:
    'mb-2 inline align-middle text-[28px] leading-[34.58px] font-normal text-[var(--text-on-light-base)]',

  panelBody:
    'block text-xl leading-[30px] text-[var(--text-on-light-muted)] [&_strong]:!font-bold [&_strong]:!text-[var(--text-on-light-strong)] [&_a]:!text-[var(--text-on-light-link-hover)] [&_a:hover]:!underline [&_p]:!mb-4 [&_ul]:!mb-0 [&_ul]:list-none [&_ul]:pl-0 [&_ul>li]:grid [&_ul>li]:grid-cols-[20px_1fr] [&_ul>li]:gap-2',

  panelListIcon: 'mt-1.5 h-4 w-4 text-[var(--text-on-light-muted)]',
} as const
