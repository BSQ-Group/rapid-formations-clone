export const styles = {
  // FAQs block layout
  section: 'flex flex-col items-center gap-14 px-4 md:px-8 lg:px-10',
  faqList: 'flex w-full max-w-[904px] flex-col gap-3',

  // Section heading
  heading: 'w-full max-w-[904px] text-center text-[var(--text-strong)]',

  // Individual accordion card — padding lives on the trigger/answer so the whole
  // card surface (including padding) is part of the clickable button
  card: 'flex flex-col rounded-[14px] bg-[var(--surface-primary)]',

  // Trigger row: question text + chevron. Padded so clicking anywhere in the
  // card's top area (text, chevron, surrounding padding) toggles the panel.
  trigger: 'flex w-full items-center gap-4 px-6 py-5 text-left',
  triggerLabel: 'flex-1 font-medium text-[var(--text-strong)]',

  // Chevron icon — rotate-180 applied conditionally when open
  chevronBase: 'h-4 w-4 shrink-0 text-[var(--icon-default)] transition-transform duration-200',
  chevronOpen: 'rotate-180',

  // Answer panel: grid-rows 0fr → 1fr collapses/expands without a fixed height
  answerGrid: 'grid transition-[grid-template-rows] duration-300 ease-in-out',
  answerGridOpen: 'grid-rows-[1fr]',
  answerGridClosed: 'grid-rows-[0fr]',

  // overflow-hidden on the inner div is required for the 0fr collapse to work
  answerInner: 'overflow-hidden',

  // horizontal padding matches the trigger (px-6); the pb-5 restores the card's
  // bottom padding that moved off the card wrapper. pt-0 because the trigger's
  // py-5 already supplies the gap above. Both live inside overflow-hidden so the
  // closed panel collapses fully with no residual gap.
  answerText:
    'px-6 pb-5 leading-6 text-[var(--text-muted)] [&_a]:text-[var(--text-link)]',
}
