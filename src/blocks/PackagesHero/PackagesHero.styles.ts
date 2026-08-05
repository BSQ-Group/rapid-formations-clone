export const packagesHeroStyles = {
  section: 'w-full bg-[var(--surface-canvas)]',
  inner:
    'mx-auto max-w-[1200px] px-5 lg:px-10 lg:pr-24 pt-12 lg:pt-28 pb-20 flex flex-col lg:flex-row items-center gap-2',

  leftCol:
    'w-full lg:flex-1 flex flex-col gap-4 items-center lg:items-start text-center lg:text-left',
  heading: 'text-[var(--text-strong)]',
  subtitle: 'text-[var(--text-subtle)] lg:max-w-[472px]',

  benefitsList: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-y-1 gap-x-5 mt-2',
  benefitItem: 'flex items-center gap-3 py-1 text-left',
  benefitIconWrap:
    'shrink-0 w-8 h-8 rounded-full bg-[var(--surface-accent-light)] flex items-center justify-center',
  benefitText: 'font-medium text-[var(--text-subtle)]',

  rightCol: 'w-full lg:w-auto flex items-center justify-center',
  imageArea:
    'relative w-full max-w-[480px] md:max-w-[420px] lg:max-w-none lg:w-[390px] xl:w-[518px] md:shrink-0 pb-16 md:pb-0 mt-12 lg:mt-0',
  imageWrap: 'relative w-full aspect-[518/348] rounded-2xl lg:rounded-3xl overflow-hidden',
  imageInner:
    '!w-[188%] !h-[152%] !left-[-54%] !top-[-20%] !right-auto !bottom-auto !max-w-none object-cover',

  cardChrome:
    'flex absolute z-10 items-center bg-white shadow-2xl ring-white/15 ' +
    'rounded-[9px] ring-[6px] gap-[9px] p-[9px] pr-[15px] ' +
    'md:rounded-[11px] md:ring-[7px] md:gap-[11px] md:p-[11px] md:pr-[19px] ' +
    'lg:rounded-[9px] lg:ring-[6px] lg:gap-[9px] lg:p-[9px] lg:pr-[15px] ' +
    'xl:rounded-xl xl:ring-8 xl:gap-3 xl:p-3 xl:pr-5',

  topCard:
    'top-[243px] left-[89px] md:top-[50px] md:left-[281px] lg:top-[41px] lg:left-[250px] xl:top-[54px] xl:left-[300px]',

  bottomCard:
    'top-[187px] left-[27px] md:top-[165px] md:left-[-102px] lg:top-[165px] lg:left-[-83px] xl:top-[200px] xl:left-[-110px]',

  cardIconWrap:
    'shrink-0 bg-[var(--icon-background-accent)] flex items-center justify-center ' +
    'rounded-[3px] p-3 [&>svg]:size-[18px] ' +
    'md:rounded-[4px] md:p-[15px] md:[&>svg]:size-[22px] ' +
    'lg:rounded-[3px] lg:p-3 lg:[&>svg]:size-[18px] ' +
    'xl:rounded-[4px] xl:p-4 xl:[&>svg]:size-6',

  topCardContent: 'flex-1 flex flex-col gap-2 min-w-0',
  topCardTitleRow: 'flex items-center justify-between gap-2 whitespace-nowrap',
  topCardLabel:
    'font-medium text-[var(--text-subtle)] ' +
    'text-[10.4px] leading-[14.85px] ' +
    'md:text-[12.97px] md:leading-[18.53px] ' +
    'lg:text-[10.54px] lg:leading-[15.06px] ' +
    'xl:text-[14px] xl:leading-5',
  topCardDetail:
    'font-medium text-[var(--text-subtle)] shrink-0 ' +
    'text-[10.4px] leading-[14.85px] ' +
    'md:text-[12.97px] md:leading-[18.53px] ' +
    'lg:text-[10.54px] lg:leading-[15.06px] ' +
    'xl:text-[14px] xl:leading-5',
  topCardSubtitle:
    'font-medium text-[var(--text-muted)] ' +
    'text-[8.91px] leading-[11.88px] ' +
    'md:text-[11.12px] md:leading-[14.83px] ' +
    'lg:text-[9.04px] lg:leading-[12.05px] ' +
    'xl:text-[12px] xl:leading-4',
  progressBarTrack: 'w-full h-1 rounded-full bg-[var(--surface-canvas)] overflow-hidden',
  progressBarFill: 'h-full rounded-full bg-[var(--surface-accent)]',
  progressBarTrackSmall: 'w-full h-[2px] rounded-full bg-[var(--surface-canvas)] overflow-hidden',

  redactedLines: 'flex flex-col gap-[3px]',
  redactedLine: 'h-[3px] w-full rounded-full bg-[var(--surface-secondary)]',
  redactedLineShort: 'h-[3px] w-[75%] rounded-full bg-[var(--surface-secondary)]',

  bottomCardContent: 'flex flex-col gap-0.5 min-w-0',
  bottomCardTitle:
    'font-semibold text-[var(--text-subtle)] whitespace-nowrap ' +
    'text-[11.88px] leading-[17.82px] ' +
    'md:text-[14.83px] md:leading-[22.24px] ' +
    'lg:text-[12.05px] lg:leading-[18.07px] ' +
    'xl:text-[16px] xl:leading-6',
  bottomCardSubtitle:
    'font-medium text-[var(--text-muted)] whitespace-nowrap ' +
    'text-[8.91px] leading-[11.88px] ' +
    'md:text-[11.12px] md:leading-[14.83px] ' +
    'lg:text-[9.04px] lg:leading-[12.05px] ' +
    'xl:text-[12px] xl:leading-4',

  topCard4:
    'top-[246px] left-[92px] ' +
    'md:top-[103px] md:left-[274px] ' +
    'lg:top-[97px] lg:left-[253px] ' +
    'xl:top-[120px] xl:left-[311px]',
  bottomCard4:
    'top-[189px] left-[16px] ' +
    'md:top-[246px] md:left-[-84px] ' +
    'lg:top-[227px] lg:left-[-31px] ' +
    'xl:top-[280px] xl:left-[-38px]',

  // Small card chrome — absolute positioned, no 'flex' (comes from position styles below)
  cardChromeSmall: [
    'absolute z-10 items-center bg-white shadow-2xl ring-white/15',
    'rounded-[6px] ring-[4px] gap-[6px] p-[6px] pr-[10px]',
    'md:rounded-[7px] md:ring-[5px] md:gap-[7px] md:p-[7px] md:pr-[13px]',
    'lg:rounded-[6px] lg:ring-[4px] lg:gap-[6px] lg:p-[6px] lg:pr-[10px]',
    'xl:rounded-[8px] xl:ring-[5px] xl:gap-[8px] xl:p-[8px] xl:pr-[13px]',
  ].join(' '),

  topCardExtraPos:
    'hidden z-[5] ' + 'lg:flex lg:top-[46px] lg:left-[211px] ' + 'xl:top-[56px] xl:left-[260px]',
  bottomCardExtraPos:
    'hidden ' + 'lg:flex lg:top-[162px] lg:left-[-38px] ' + 'xl:top-[199px] xl:left-[-46px]',

  // Small icon wrap — ~67% the size of the primary icon wrap
  cardIconWrapSmall: [
    'shrink-0 bg-[var(--icon-background-accent)] flex items-center justify-center',
    'rounded-[2px] p-[9px] [&>svg]:size-[13px]',
    'md:rounded-[3px] md:p-[10px] md:[&>svg]:size-[15px]',
    'lg:rounded-[2px] lg:p-[9px] lg:[&>svg]:size-[13px]',
    'xl:rounded-[3px] xl:p-[11px] xl:[&>svg]:size-4',
  ].join(' '),

  smallTopCardContent: 'flex-1 flex flex-col gap-1 min-w-0',
  smallCardLabel: [
    'font-medium text-[var(--text-subtle)]',
    'text-[7.8px] leading-[11.1px]',
    'md:text-[9.75px] md:leading-[13.9px]',
    'lg:text-[7.9px] lg:leading-[11.3px]',
    'xl:text-[9.3px] xl:leading-[13.3px]',
  ].join(' '),
  smallCardTitle: [
    'font-semibold text-[var(--text-subtle)] whitespace-nowrap',
    'text-[8.91px] leading-[13.4px]',
    'md:text-[11.12px] md:leading-[16.7px]',
    'lg:text-[9.04px] lg:leading-[13.6px]',
    'xl:text-[12px] xl:leading-[18px]',
  ].join(' '),
  smallCardSubtitle: [
    'font-medium text-[var(--text-muted)] whitespace-nowrap',
    'text-[6.68px] leading-[8.91px]',
    'md:text-[8.34px] md:leading-[11.12px]',
    'lg:text-[6.78px] lg:leading-[9.04px]',
    'xl:text-[9px] xl:leading-[12px]',
  ].join(' '),
} as const
