/**
 * Crop offset for the repeating texture tiled behind a banking-partner card.
 *
 * The pattern is a 766x766 image drawn at its natural size behind a ~263x171 tile, so what
 * you actually see is one small crop of it. Live gives every card its OWN crop — both the
 * homepage hero strip and the "Our business banking partners" grid compute it the same way:
 *
 *   `${Math.floor(Math.random() * 80) + 10}% -${Math.floor(Math.random() * 291) + 100}px`
 *
 * i.e. x in 10-89%, y in -100 to -390px. We keep those exact ranges but derive the offset
 * from the card's index instead of Math.random(): these are server components, so a random
 * offset would be frozen by the route cache anyway (no per-load variety to gain) while making
 * every build render differently and adding needless visual-QA churn. The multipliers are
 * coprime with their moduli (37/80, 101/291) so consecutive cards land far apart, which is
 * the property that actually matters — no two neighbouring tiles showing the same crop.
 */
export function bankPatternPosition(index: number): string {
  const x = 10 + ((index * 37) % 80)
  const y = 100 + ((index * 101) % 291)
  return `${x}% -${y}px`
}
