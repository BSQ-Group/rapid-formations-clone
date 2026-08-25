export function bankPatternPosition(index: number): string {
  const x = 10 + ((index * 37) % 80)
  const y = 100 + ((index * 101) % 291)
  return `${x}% -${y}px`
}
