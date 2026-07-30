import type { ComparePackagesBlock as ComparePackagesBlockProps } from '@/payload-types'
import type { LinkData } from '@/utilities/links'

import type { Feature, Plan, Section } from './ComparePackagesClient'

/**
 * Normalisers for the ComparePackages CMS shape. Shared so FormationPackages can
 * build the combined tablet/mobile carousel (CORE-3620) from the same source
 * the ComparePackages block uses for its desktop table.
 */

export function normalizePlans(plans: ComparePackagesBlockProps['plans']): [Plan, Plan, Plan] {
  return plans.slice(0, 3).map<Plan>((p) => ({
    name: p.name,
    price: p.price,
    subPrice: p.subPrice ?? null,
    featured: p.featured ?? false,
    button: (p.button ?? null) as LinkData | null,
  })) as [Plan, Plan, Plan]
}

export function normalizeSections(
  sections: ComparePackagesBlockProps['sections'],
): Section[] {
  return (sections ?? []).map((section) => ({
    label: section.label,
    features: (section.features ?? []).map<Feature>((f) => ({
      name: f.name,
      description: f.description ?? null,
      infoText: f.infoText ?? null,
      tooltipText: f.tooltipText ?? null,
      inPlans: [Boolean(f.inPlan1), Boolean(f.inPlan2), Boolean(f.inPlan3)],
    })),
  }))
}
