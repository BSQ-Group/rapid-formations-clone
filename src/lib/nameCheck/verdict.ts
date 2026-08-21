export interface NameCheckVerdict {
  NameRequested?: string
  NameStatus?: 'GREEN' | 'AMBER' | 'RED' | string
  MatchName?: string | null
  SensitiveWords?: { Word: string }[]
  SimilarNames?: { Name: string }[]
}

export interface NameCheckOutcome {
  name: string
  available: boolean
  description: string
}

export const ERROR_DESCRIPTION = 'Something has went wrong. Please try again later.'
export const EMPTY_DESCRIPTION = 'You forgot to type a company name.'
export const ERROR_NAME = 'Oops...'

const listOf = (items: { Word?: string; Name?: string }[] | undefined, key: 'Word' | 'Name') =>
  (items ?? [])
    .map((item) => item[key])
    .filter(Boolean)
    .join(', ')

export function isAvailable(verdict: NameCheckVerdict): boolean {
  if (verdict.NameStatus === 'GREEN') return true
  return verdict.NameStatus === 'AMBER' && (verdict.SensitiveWords?.length ?? 0) > 0
}

export function describe(verdict: NameCheckVerdict, fallbackName: string): NameCheckOutcome {
  const name = verdict.NameRequested || fallbackName

  if (verdict.NameStatus === 'GREEN') {
    return {
      name,
      available: true,
      description:
        "Congratulations! Your company name is available. Let's get your business started.",
    }
  }

  if (verdict.NameStatus === 'AMBER') {
    if ((verdict.SensitiveWords?.length ?? 0) > 0) {
      return {
        name,
        available: true,
        description: `Please note: The word(s) ${listOf(verdict.SensitiveWords, 'Word')} is deemed sensitive. You may need to supply additional information to use it.`,
      }
    }

    return {
      name,
      available: false,
      description: `Sorry, this company name is unavailable. Also unavailable is: ${listOf(verdict.SimilarNames, 'Name')}`,
    }
  }

  if (verdict.NameStatus === 'RED') {
    return {
      name,
      available: false,
      description:
        "Sorry, that name's taken - but don't let that stop you. Try a small variation or a new idea below.",
    }
  }

  return { name: ERROR_NAME, available: false, description: ERROR_DESCRIPTION }
}
