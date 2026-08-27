export const byNumberMissingLast =
  <T>(pick: (item: T) => number | null | undefined) =>
  (a: T, b: T) =>
    (pick(a) ?? Number.MAX_SAFE_INTEGER) - (pick(b) ?? Number.MAX_SAFE_INTEGER)
