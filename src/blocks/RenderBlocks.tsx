import React, { Fragment } from 'react'

import type { Page } from '@/payload-types'

import { AdditionalServicesBlock } from '@/blocks/AdditionalServices/Component'
import { CallOutCTABlock } from '@/blocks/CallOutCTA/Component'
import { ArchiveBlock } from '@/blocks/ArchiveBlock/Component'
import { BusinessBankAccountsBlock } from '@/blocks/BusinessBankAccounts/Component'
import { CallToActionBlock } from '@/blocks/CallToAction/Component'
import { ContentBlock } from '@/blocks/Content/Component'
import { FormBlock } from '@/blocks/Form/Component'
import { FormationPackagesBlock } from '@/blocks/FormationPackages/Component'
import { LandingHeroBlock } from '@/blocks/LandingHero/Component'
import { MediaBlock } from '@/blocks/MediaBlock/Component'
import { RegisterCompanyStepsBlock } from '@/blocks/RegisterCompanySteps/Component'
import { SupportBlock } from '@/blocks/Support/Component'
import { TestimonialsBlock } from '@/blocks/Testimonials/Component'
import { UniqueSellingPointsBlock } from '@/blocks/UniqueSellingPoints/Component'
import { WhyChooseUsBlock } from '@/blocks/WhyChooseUs/Component'
import { ChooseCompanyStructureBlock } from '@/blocks/ChooseCompanyStructure/Component'
import { TrustPilotBannerBlock } from '@/blocks/TrustPilotBanner/Component'
import { PackagesHeroBlock } from '@/blocks/PackagesHero/Component'
import { WhatsIncludedBlock } from '@/blocks/WhatsIncluded/Component'
import { SearchCTABlock } from '@/blocks/SearchCTA/Component'
import { AboutThisServiceBlock } from '@/blocks/AboutThisService/Component'
import { OtherWaysToBuyBlock } from '@/blocks/OtherWaysToBuy/Component'
import { ServicesHeroBlock } from '@/blocks/ServicesHero/Component'
import { RegisteredOfficePurposeBlock } from '@/blocks/RegisteredOfficePurpose/Component'
import { OfficePhotoAddressBlock } from '@/blocks/OfficePhotoAddress/Component'
import { ServicesCTABlock } from '@/blocks/ServicesCTA/Component'
import { ServicesTestimonialBlock } from '@/blocks/ServicesTestimonial/Component'
import { TestimonialBannerBlock } from '@/blocks/TestimonialBanner/Component'
import { HowItWorksBlock } from '@/blocks/HowItWorks/Component'
import { LegalSidenavBlock } from '@/blocks/LegalSidenav/Component'
import { LegalContentBlock } from '@/blocks/LegalContent/Component'
import { ComparePackagesHeaderBlock } from '@/blocks/ComparePackagesHeader/Component'
import { PromoCardBlock } from '@/blocks/PromoCard/Component'
import { PromoTier3Block } from '@/blocks/PromoTier3/Component'
import { PromoTier2Block } from '@/blocks/PromoTier2/Component'
import { WhatIsPrivateLimitedCompanyBlock } from '@/blocks/WhatIsPrivateLimitedCompany/Component'
import { HeroStepperBlock } from '@/blocks/HeroStepper/Component'
import { PackagesNavBlock } from '@/blocks/PackagesNav/Component'
import { ComparePackagesBlock } from '@/blocks/ComparePackages/Component'
import { PackageCardHeroBlock } from '@/blocks/PackageCardHero/Component'
import { WhatsIncludedSinglePackageBlock } from '@/blocks/WhatsIncludedSinglePackage/Component'
import { WiseBusinessAccountBlock } from '@/blocks/WiseBusinessAccount/Component'
import { ServicesTextWithCardBlock } from '@/blocks/ServicesTextWithCard/Component'
import { ContentWithPricingCardBlock } from '@/blocks/ContentWithPricingCard/Component'
import { ContentWithExtendedPricingCardBlock } from '@/blocks/ContentWithExtendedPricingCard/Component'
import { HeroServicesBannerBlock } from '@/blocks/HeroServicesBanner/Component'
import { ServiceCardsBlock } from '@/blocks/ServiceCards/Component'
import { HowItWorksListBlock } from '@/blocks/HowItWorksList/Component'
import { ServiceTextBlock } from '@/blocks/ServiceText/Component'
import { NoteBlock } from '@/blocks/Note/Component'

const blockComponents = {
  additionalServices: AdditionalServicesBlock,
  callOutCTA: CallOutCTABlock,
  archive: ArchiveBlock,
  businessBankAccounts: BusinessBankAccountsBlock,
  content: ContentBlock,
  cta: CallToActionBlock,
  formBlock: FormBlock,
  formationPackages: FormationPackagesBlock,
  landingHero: LandingHeroBlock,
  mediaBlock: MediaBlock,
  registerCompanySteps: RegisterCompanyStepsBlock,
  support: SupportBlock,
  testimonials: TestimonialsBlock,
  uniqueSellingPoints: UniqueSellingPointsBlock,
  whyChooseUs: WhyChooseUsBlock,
  chooseCompanyStructure: ChooseCompanyStructureBlock,
  trustpilotBanner: TrustPilotBannerBlock,
  packagesHero: PackagesHeroBlock,
  whatsIncluded: WhatsIncludedBlock,
  packagesCTA: SearchCTABlock,
  aboutThisService: AboutThisServiceBlock,
  otherWaysToBuy: OtherWaysToBuyBlock,
  servicesHero: ServicesHeroBlock,
  registeredOfficePurpose: RegisteredOfficePurposeBlock,
  officePhotoAddress: OfficePhotoAddressBlock,
  servicesCTA: ServicesCTABlock,
  servicesTestimonial: ServicesTestimonialBlock,
  testimonialBanner: TestimonialBannerBlock,
  howItWorks: HowItWorksBlock,
  legalSidenav: LegalSidenavBlock,
  legalContent: LegalContentBlock,
  comparePackagesHeader: ComparePackagesHeaderBlock,
  promoCard: PromoCardBlock,
  promoTier3: PromoTier3Block,
  promoTier2: PromoTier2Block,
  whatIsPrivateLimitedCompany: WhatIsPrivateLimitedCompanyBlock,
  heroStepper: HeroStepperBlock,
  packagesNav: PackagesNavBlock,
  comparePackages: ComparePackagesBlock,
  packageCardHero: PackageCardHeroBlock,
  whatsIncludedSinglePackage: WhatsIncludedSinglePackageBlock,
  wiseBusinessAccount: WiseBusinessAccountBlock,
  servicesTextWithCard: ServicesTextWithCardBlock,
  contentWithPricingCard: ContentWithPricingCardBlock,
  contentWithExtendedPricingCard: ContentWithExtendedPricingCardBlock,
  heroServicesBanner: HeroServicesBannerBlock,
  serviceCards: ServiceCardsBlock,
  howItWorksList: HowItWorksListBlock,
  serviceText: ServiceTextBlock,
  note: NoteBlock,
}

const noMarginBlocks: string[] = ['landingHero']

export const RenderBlocks: React.FC<{
  blocks: NonNullable<Page['layout']>[0][]
}> = (props) => {
  const { blocks } = props

  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0

  const compareBlock = hasBlocks
    ? blocks.find((b) => b.blockType === 'comparePackages')
    : undefined
  const formationBlock = hasBlocks
    ? blocks.find((b) => b.blockType === 'formationPackages')
    : undefined
  const compareValid =
    Boolean(compareBlock) &&
    'plans' in compareBlock! &&
    Array.isArray(compareBlock!.plans) &&
    compareBlock!.plans.length >= 3 &&
    'sections' in compareBlock! &&
    Array.isArray(compareBlock!.sections) &&
    compareBlock!.sections.length > 0
  const formationValid =
    Boolean(formationBlock) &&
    'packages' in formationBlock! &&
    Array.isArray(formationBlock!.packages) &&
    formationBlock!.packages.length >= 3
  // Both must be valid: combining hides ComparePackages below lg, so a partial
  // pairing would leave mobile with no comparison at all.
  const combinePackages = compareValid && formationValid

  if (hasBlocks) {
    return (
      <Fragment>
        {blocks.map((block, index) => {
          const { blockType } = block

          if (blockType && blockType in blockComponents) {
            const Block = blockComponents[blockType] as React.ComponentType<typeof block>

            if (Block) {
              const extraProps =
                combinePackages && block === formationBlock
                  ? { combineWith: compareBlock }
                  : combinePackages && block === compareBlock
                    ? { mobileCombinedElsewhere: true }
                    : undefined

              return <Block {...block} {...extraProps} key={index} />
            }
          }
          return null
        })}
      </Fragment>
    )
  }

  return null
}
