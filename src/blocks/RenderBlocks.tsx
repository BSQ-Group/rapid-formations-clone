import React, { Fragment } from 'react'

import type { Page } from '@/payload-types'

import { AdditionalServicesBlock } from '@/blocks/AdditionalServices/Component'
import { ServiceAdsBlock } from '@/blocks/ServiceAds/Component'
import { GlossaryBlock } from '@/blocks/Glossary/Component'
import { PurchaseAnAddressBlock } from '@/blocks/PurchaseAnAddress/Component'
import { StepsItemsBlock } from '@/blocks/StepsItems/Component'
import { ComparePackageTableBlockComponent } from '@/blocks/ComparePackageTable/Component'
import { ComparePackagesHero } from '@/components/shared/ComparePackagesHero'
import { BuyServiceBlock } from '@/blocks/BuyService/Component'
import { ServiceContentBlock } from '@/blocks/ServiceContent/Component'
import { ServicesBenefitsBlockComponent } from '@/blocks/ServicesBenefits/Component'
import { ServicePriceBannerBlockComponent } from '@/blocks/ServicePriceBanner/Component'
import { OurAddressBlock } from '@/blocks/OurAddress/Component'
import { CallOutCTABlock } from '@/blocks/CallOutCTA/Component'
import { ArchiveBlock } from '@/blocks/ArchiveBlock/Component'
import { BusinessBankAccountsBlock } from '@/blocks/BusinessBankAccounts/Component'
import { CallToActionBlock } from '@/blocks/CallToAction/Component'
import { CaseStudyVideoBlock } from '@/blocks/CaseStudyVideo/Component'
import { CaseStudyMosaicBlock } from '@/blocks/CaseStudyMosaic/Component'
import { ContentBlock } from '@/blocks/Content/Component'
import { FAQsBlock } from '@/blocks/FAQs/Component'
import { FormBlock } from '@/blocks/Form/Component'
import { FormationVideoBlock } from '@/blocks/FormationVideo/Component'
import { FormationPackagesBlock } from '@/blocks/FormationPackages/Component'
import { LandingHeroBlock } from '@/blocks/LandingHero/Component'
import { MediaBlock } from '@/blocks/MediaBlock/Component'
import { RegisterCompanyStepsBlock } from '@/blocks/RegisterCompanySteps/Component'
import { SupportBlock } from '@/blocks/Support/Component'
import { OnlineAdminPortalBlock } from '@/blocks/OnlineAdminPortal/Component'
import { TestimonialsBlock } from '@/blocks/Testimonials/Component'
import { TestimonialQuoteBlock } from '@/blocks/TestimonialQuote/Component'
import { OrderStepsBlock } from '@/blocks/OrderSteps/Component'
import { OurOfficesBlockComponent } from '@/blocks/OurOffices/Component'
import { FourStepsBlock } from '@/blocks/FourSteps/Component'
import { AdBannerBlock } from '@/blocks/AdBanner/Component'
import { SameDayIncorporationBlockComponent } from '@/blocks/SameDayIncorporation/Component'
import { PackageGridBlock } from '@/blocks/PackageGrid/Component'
import { PackageInclusionsBlock } from '@/blocks/PackageInclusions/Component'
import { RecommendedPackagesBlock } from '@/blocks/RecommendedPackages/Component'
import { UniqueSellingPointsBlock } from '@/blocks/UniqueSellingPoints/Component'
import { WhyChooseUsBlock } from '@/blocks/WhyChooseUs/Component'
import { WhyUseAgentBlock } from '@/blocks/WhyUseAgent/Component'
import { BankingPartnersBlock } from '@/blocks/BankingPartners/Component'
import { BCorpCertificationBlock } from '@/blocks/BCorpCertification/Component'
import { ChooseCompanyStructureBlock } from '@/blocks/ChooseCompanyStructure/Component'
import { ComparePackagesNavBlock } from '@/blocks/ComparePackagesNav/Component'
import { OurLatestBlogsBlock } from '@/blocks/OurLatestBlogs/Component'
import { TrustPilotBannerBlock } from '@/blocks/TrustPilotBanner/Component'
import { PackagesHeroBlock } from '@/blocks/PackagesHero/Component'
import { WhatsIncludedBlock } from '@/blocks/WhatsIncluded/Component'
import { SiteMapBlockComponent } from '@/blocks/SiteMap/Component'
import { RenewalItemsBlockComponent } from '@/blocks/RenewalItems/Component'
import { SearchCTABlock } from '@/blocks/SearchCTA/Component'
import { AboutThisServiceBlock } from '@/blocks/AboutThisService/Component'
import { OtherWaysToBuyBlock } from '@/blocks/OtherWaysToBuy/Component'
import { ServicesHeroBlock } from '@/blocks/ServicesHero/Component'
import { RegisteredOfficePurposeBlock } from '@/blocks/RegisteredOfficePurpose/Component'
import { OfficePhotoAddressBlock } from '@/blocks/OfficePhotoAddress/Component'
import { ServicesCTABlock } from '@/blocks/ServicesCTA/Component'
import { AffiliateProgramBlockComponent } from '@/blocks/AffiliateProgram/Component'
import { CustomerQuoteBlock } from '@/blocks/CustomerQuote/Component'
import { RegisteredOfficeAddressBlock } from '@/blocks/RegisteredOfficeAddress/Component'
import { ServicesTestimonialBlock } from '@/blocks/ServicesTestimonial/Component'
import { TestimonialBannerBlock } from '@/blocks/TestimonialBanner/Component'
import { HowItWorksBlock } from '@/blocks/HowItWorks/Component'
import { HowItWorksScreensBlockComponent } from '@/blocks/HowItWorksScreens/Component'
import { LegalSidenavBlock } from '@/blocks/LegalSidenav/Component'
import { LegalContentBlock } from '@/blocks/LegalContent/Component'
import { ContactUsBlockComponent } from '@/blocks/ContactUs/Component'
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
import { ServiceInclusionsGridBlockComponent } from '@/blocks/ServiceInclusionsGrid/Component'
import { HowItWorksListBlock } from '@/blocks/HowItWorksList/Component'
import { ServiceTextBlock } from '@/blocks/ServiceText/Component'
import { NoteBlock } from '@/blocks/Note/Component'
import { RegisterCtaPanelBlock } from '@/blocks/RegisterCtaPanel/Component'
import { RegisterOverseasBlock } from '@/blocks/RegisterOverseas/Component'
import { RequiredInformationBlock } from '@/blocks/RequiredInformation/Component'
import { FaqQuickNavServer } from '@/components/shared/FaqQuickNav/Server'
import { PageTitle } from '@/components/shared/PageTitle'
import { BuyNow } from '@/components/shared/PageTitle/BuyNow'
import { TitleBanner } from '@/components/shared/TitleBanner'
import { ClosingCTA } from '@/components/shared/ClosingCTA'
import { NameCheckPackagesBlock } from '@/blocks/NameCheckPackages/Component'
import { TextContentBlock } from '@/blocks/TextContent/Component'
import { FaqTopicBlock } from '@/blocks/FaqTopic/Component'
import { ReviewRatingsBlock } from '@/blocks/ReviewRatings/Component'

const blockComponents = {
  additionalServices: AdditionalServicesBlock,
  serviceAds: ServiceAdsBlock,
  glossary: GlossaryBlock,
  purchaseAnAddress: PurchaseAnAddressBlock,
  stepsItems: StepsItemsBlock,
  comparePackageTable: ComparePackageTableBlockComponent,
  comparePackagesHero: ComparePackagesHero,
  buyService: BuyServiceBlock,
  serviceContent: ServiceContentBlock,
  servicesBenefits: ServicesBenefitsBlockComponent,
  servicePriceBanner: ServicePriceBannerBlockComponent,
  ourAddress: OurAddressBlock,
  callOutCTA: CallOutCTABlock,
  archive: ArchiveBlock,
  businessBankAccounts: BusinessBankAccountsBlock,
  caseStudyVideo: CaseStudyVideoBlock,
  caseStudyMosaic: CaseStudyMosaicBlock,
  content: ContentBlock,
  cta: CallToActionBlock,
  faqs: FAQsBlock,
  formBlock: FormBlock,
  formationPackages: FormationPackagesBlock,
  formationVideo: FormationVideoBlock,
  landingHero: LandingHeroBlock,
  mediaBlock: MediaBlock,
  registerCompanySteps: RegisterCompanyStepsBlock,
  support: SupportBlock,
  onlineAdminPortal: OnlineAdminPortalBlock,
  testimonials: TestimonialsBlock,
  testimonialQuote: TestimonialQuoteBlock,
  orderSteps: OrderStepsBlock,
  ourOffices: OurOfficesBlockComponent,
  fourSteps: FourStepsBlock,
  adBanner: AdBannerBlock,
  sameDayIncorporation: SameDayIncorporationBlockComponent,
  packageGrid: PackageGridBlock,
  packageInclusions: PackageInclusionsBlock,
  recommendedPackages: RecommendedPackagesBlock,
  uniqueSellingPoints: UniqueSellingPointsBlock,
  whyChooseUs: WhyChooseUsBlock,
  whyUseAgent: WhyUseAgentBlock,
  bCorpCertification: BCorpCertificationBlock,
  bankingPartners: BankingPartnersBlock,
  chooseCompanyStructure: ChooseCompanyStructureBlock,
  comparePackagesNav: ComparePackagesNavBlock,
  ourLatestBlogs: OurLatestBlogsBlock,
  trustpilotBanner: TrustPilotBannerBlock,
  packagesHero: PackagesHeroBlock,
  whatsIncluded: WhatsIncludedBlock,
  siteMap: SiteMapBlockComponent,
  renewalItems: RenewalItemsBlockComponent,
  packagesCTA: SearchCTABlock,
  aboutThisService: AboutThisServiceBlock,
  otherWaysToBuy: OtherWaysToBuyBlock,
  servicesHero: ServicesHeroBlock,
  registeredOfficePurpose: RegisteredOfficePurposeBlock,
  officePhotoAddress: OfficePhotoAddressBlock,
  servicesCTA: ServicesCTABlock,
  affiliateProgram: AffiliateProgramBlockComponent,
  customerQuote: CustomerQuoteBlock,
  registeredOfficeAddress: RegisteredOfficeAddressBlock,
  servicesTestimonial: ServicesTestimonialBlock,
  testimonialBanner: TestimonialBannerBlock,
  howItWorks: HowItWorksBlock,
  howItWorksScreens: HowItWorksScreensBlockComponent,
  legalSidenav: LegalSidenavBlock,
  legalContent: LegalContentBlock,
  contactUs: ContactUsBlockComponent,
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
  serviceInclusionsGrid: ServiceInclusionsGridBlockComponent,
  howItWorksList: HowItWorksListBlock,
  serviceText: ServiceTextBlock,
  note: NoteBlock,
  registerCtaPanel: RegisterCtaPanelBlock,
  registerOverseas: RegisterOverseasBlock,
  requiredInformation: RequiredInformationBlock,
  textContent: TextContentBlock,
  titleBanner: TitleBanner,
  faqTopic: FaqTopicBlock,
  reviewRatings: ReviewRatingsBlock,
  closingCTA: ClosingCTA,
  nameCheckPackages: NameCheckPackagesBlock,
}

const noMarginBlocks: string[] = ['landingHero']

export const RenderBlocks: React.FC<{
  blocks: NonNullable<Page['layout']>[0][]
  pageTitle?: string | null
}> = (props) => {
  const { blocks, pageTitle } = props

  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0

  const compareBlock = hasBlocks ? blocks.find((b) => b.blockType === 'comparePackages') : undefined
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
  const combinePackages = compareValid && formationValid

  if (hasBlocks) {
    return (
      <Fragment>
        {blocks.map((block, index) => {
          const { blockType } = block

          if (blockType === 'pageTitle') {
            return (
              <PageTitle
                key={index}
                title={block.title?.trim() || pageTitle?.trim()}
                isPageTitle={block.isPageTitle}
                sectionLayout={block.sectionLayout}
                aside={
                  block.showFaqQuickNav || block.buyNow ? (
                    <>
                      <BuyNow buyNow={block.buyNow} />
                      {block.showFaqQuickNav && <FaqQuickNavServer />}
                    </>
                  ) : undefined
                }
              />
            )
          }

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
