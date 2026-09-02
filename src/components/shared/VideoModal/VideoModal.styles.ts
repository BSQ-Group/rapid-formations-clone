export const videoModalStyles = {
  trigger: 'group relative block w-full cursor-pointer',

  playIcon:
    'pointer-events-none absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 text-[rgb(var(--white))]',

  overlay: 'bg-transparent',

  overlayLightbox: 'bg-black/70',

  dialogContent: 'max-w-none border-0 p-0 focus:outline-none sm:rounded-none',

  dialogContentInline:
    'w-[calc(100%-30px)] bg-[rgb(var(--black))] md:w-[85%] min-[1023px]:w-[65%]',

  dialogContentLightbox:
    'w-[calc(100%-30px)] bg-white md:w-[calc((100%-30px)*0.85)] min-[1023px]:w-[65%]',

  dialogTitle: 'sr-only',

  videoFrame: 'relative aspect-video w-full',

  videoFrameInline: 'bg-[rgb(var(--black))]',

  videoFrameLightbox: 'bg-white',

  videoEmbed: 'absolute inset-0 h-full w-full border-0',

  close:
    'absolute right-[15px] top-[15px] z-10 cursor-pointer text-[var(--icon-dialog-close)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--border-focus)]',

  closeIcon: 'h-[28px] w-[18px]',
} as const
