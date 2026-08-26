export const videoModalStyles = {
  trigger: 'group relative cursor-pointer',

  playIcon:
    'pointer-events-none absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 text-[rgb(var(--white))]',

  // CORE-6964: match live — playing a video must not darken the whole page,
  // so the video dialog uses a transparent backdrop (other modals keep theirs).
  overlay: 'bg-transparent',

  dialogContent:
    'w-[calc(100%-30px)] max-w-none border-0 bg-[rgb(var(--black))] p-0 focus:outline-none sm:rounded-none md:w-[85%] min-[1023px]:w-[65%]',

  dialogTitle: 'sr-only',

  videoFrame: 'relative aspect-video w-full bg-[rgb(var(--black))]',

  videoEmbed: 'absolute inset-0 h-full w-full border-0',
} as const
