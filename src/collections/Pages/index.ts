import type { CollectionConfig } from 'payload'

import { authenticated } from '../../access/authenticated'
import { authenticatedOrPublished } from '../../access/authenticatedOrPublished'
import { Archive } from '../../blocks/ArchiveBlock/config'
import { BusinessBankAccounts } from '../../blocks/BusinessBankAccounts/config'
import { CallToAction } from '../../blocks/CallToAction/config'
import { CaseStudyVideo } from '../../blocks/CaseStudyVideo/config'
import { CaseStudyMosaic } from '../../blocks/CaseStudyMosaic/config'
import { Content } from '../../blocks/Content/config'
import { FAQs } from '../../blocks/FAQs/config'
import { FormBlock } from '../../blocks/Form/config'
import { FormationPackages } from '../../blocks/FormationPackages/config'
import { FormationVideo } from '../../blocks/FormationVideo/config'
import { LandingHero } from '../../blocks/LandingHero/config'
import { RegisterCompanySteps } from '../../blocks/RegisterCompanySteps/config'
import { Support } from '../../blocks/Support/config'
import { OnlineAdminPortal } from '../../blocks/OnlineAdminPortal/config'
import { Testimonials } from '../../blocks/Testimonials/config'
import { StaffReviews } from '@/blocks/StaffReviews/config'
import { TestimonialQuote } from '@/blocks/TestimonialQuote/config'
import { OrderSteps } from '@/blocks/OrderSteps/config'
import { OurOffices } from '@/blocks/OurOffices/config'
import { FourSteps } from '../../blocks/FourSteps/config'
import { AdBanner } from '../../blocks/AdBanner/config'
import { SameDayIncorporation } from '@/blocks/SameDayIncorporation/config'
import { PackageGrid } from '../../blocks/PackageGrid/config'
import { PackageInclusions } from '../../blocks/PackageInclusions/config'
import { RecommendedPackages } from '../../blocks/RecommendedPackages/config'
import { UniqueSellingPoints } from '../../blocks/UniqueSellingPoints/config'
import { WhyChooseUs } from '../../blocks/WhyChooseUs/config'
import { WhyUseAgent } from '../../blocks/WhyUseAgent/config'
import { BankingPartners } from '../../blocks/BankingPartners/config'
import { BCorpCertification } from '../../blocks/BCorpCertification/config'
import { AdditionalServices } from '../../blocks/AdditionalServices/config'
import { ServiceAds } from '../../blocks/ServiceAds/config'
import { Glossary } from '../../blocks/Glossary/config'
import { PurchaseAnAddress } from '../../blocks/PurchaseAnAddress/config'
import { StepsItems } from '../../blocks/StepsItems/config'
import { ComparePackageTable } from '@/blocks/ComparePackageTable/config'
import { ComparePackagesHero } from '@/components/shared/ComparePackagesHero/config'
import { BuyService } from '../../blocks/BuyService/config'
import { ServiceContent } from '../../blocks/ServiceContent/config'
import { ServicesBenefits } from '../../blocks/ServicesBenefits/config'
import { ServicePriceBanner } from '../../blocks/ServicePriceBanner/config'
import { VideoLibrary } from '../../blocks/VideoLibrary/config'
import { OurAddress } from '../../blocks/OurAddress/config'
import { CallOutCTA } from '../../blocks/CallOutCTA/config'
import { ChooseCompanyStructure } from '../../blocks/ChooseCompanyStructure/config'
import { ComparePackagesNav } from '@/blocks/ComparePackagesNav/config'
import { OurLatestBlogs } from '../../blocks/OurLatestBlogs/config'
import { MediaBlock } from '../../blocks/MediaBlock/config'
import { TrustPilotBanner } from '../../blocks/TrustPilotBanner/config'
import { PackagesHero } from '../../blocks/PackagesHero/config'
import { WhatsIncluded } from '../../blocks/WhatsIncluded/config'
import { SiteMap } from '@/blocks/SiteMap/config'
import { RenewalItems } from '@/blocks/RenewalItems/config'
import { SearchCTA } from '../../blocks/SearchCTA/config'
import { AboutThisService } from '../../blocks/AboutThisService/config'
import { OtherWaysToBuy } from '../../blocks/OtherWaysToBuy/config'
import { ServicesHero } from '../../blocks/ServicesHero/config'
import { RegisteredOfficePurpose } from '../../blocks/RegisteredOfficePurpose/config'
import { OfficePhotoAddress } from '../../blocks/OfficePhotoAddress/config'
import { ServicesCTA } from '../../blocks/ServicesCTA/config'
import { AffiliateProgram } from '@/blocks/AffiliateProgram/config'
import { CustomerQuote } from '../../blocks/CustomerQuote/config'
import { RegisteredOfficeAddress } from '../../blocks/RegisteredOfficeAddress/config'
import { ServicesTestimonial } from '../../blocks/ServicesTestimonial/config'
import { TestimonialBanner } from '../../blocks/TestimonialBanner/config'
import { HowItWorks } from '../../blocks/HowItWorks/config'
import { HowItWorksScreens } from '../../blocks/HowItWorksScreens/config'
import { LegalSidenav } from '../../blocks/LegalSidenav/config'
import { LegalContent } from '../../blocks/LegalContent/config'
import { ContactUs } from '@/blocks/ContactUs/config'
import { ComparePackagesHeader } from '../../blocks/ComparePackagesHeader/config'
import { PromoCard } from '../../blocks/PromoCard/config'
import { PromoTier3 } from '../../blocks/PromoTier3/config'
import { PromoTier2 } from '../../blocks/PromoTier2/config'
import { WhatIsPrivateLimitedCompany } from '../../blocks/WhatIsPrivateLimitedCompany/config'
import { HeroStepper } from '../../blocks/HeroStepper/config'
import { PackagesNav } from '../../blocks/PackagesNav/config'
import { ComparePackages } from '../../blocks/ComparePackages/config'
import { PackageCardHero } from '../../blocks/PackageCardHero/config'
import { WhatsIncludedSinglePackage } from '../../blocks/WhatsIncludedSinglePackage/config'
import { WiseBusinessAccount } from '../../blocks/WiseBusinessAccount/config'
import { ServicesTextWithCard } from '../../blocks/ServicesTextWithCard/config'
import { RegisterCtaPanel } from '../../blocks/RegisterCtaPanel/config'
import { RegisterOverseas } from '../../blocks/RegisterOverseas/config'
import { RequiredInformation } from '../../blocks/RequiredInformation/config'
import { PageTitle } from '../../components/shared/PageTitle/config'
import { TextContent } from '../../blocks/TextContent/config'
import { TitleBanner } from '../../components/shared/TitleBanner/config'
import { FaqTopic } from '../../blocks/FaqTopic/config'
import { ReviewRatings } from '../../blocks/ReviewRatings/config'
import { ClosingCTA } from '../../components/shared/ClosingCTA/config'
import { NameCheckPackages } from '@/blocks/NameCheckPackages/config'
import { ContentWithPricingCard } from '../../blocks/ContentWithPricingCard/config'
import { ContentWithExtendedPricingCard } from '../../blocks/ContentWithExtendedPricingCard/config'
import { HeroServicesBanner } from '../../blocks/HeroServicesBanner/config'
import { ServiceCards } from '../../blocks/ServiceCards/config'
import { ServiceInclusionsGrid } from '../../blocks/ServiceInclusionsGrid/config'
import { ServiceExplainer } from '../../blocks/ServiceExplainer/config'
import { HowItWorksList } from '../../blocks/HowItWorksList/config'
import { ServiceText } from '../../blocks/ServiceText/config'
import { Note } from '../../blocks/Note/config'
import { hero } from '@/heros/config'
import { slugField } from 'payload'
import { populatePublishedAt } from '../../hooks/populatePublishedAt'
import { generatePreviewPath } from '../../utilities/generatePreviewPath'
import { revalidateDelete, revalidatePage } from './hooks/revalidatePage'
import { populateFullPath } from './hooks/populateFullPath'
import { syncLegalSidenavOnChange, syncLegalSidenavOnDelete } from './hooks/syncLegalSidenav'

import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'

export const Pages: CollectionConfig<'pages'> = {
  slug: 'pages',
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  defaultPopulate: {
    title: true,
    slug: true,
    breadcrumbs: true,
  },
  admin: {
    defaultColumns: ['title', 'slug', 'updatedAt'],
    livePreview: {
      url: ({ data, req }) => {
        const breadcrumbs = data?.breadcrumbs as Array<{ url: string }> | undefined
        const fullPath = breadcrumbs?.at(-1)?.url
        return generatePreviewPath({
          slug: data?.slug,
          collection: 'pages',
          path: fullPath,
          req,
        })
      },
    },
    preview: (data, { req }) => {
      const breadcrumbs = data?.breadcrumbs as Array<{ url: string }> | undefined
      const fullPath = breadcrumbs?.at(-1)?.url
      return generatePreviewPath({
        slug: data?.slug as string,
        collection: 'pages',
        path: fullPath,
        req,
      })
    },
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      type: 'tabs',
      tabs: [
        {
          fields: [hero],
          label: 'Hero',
        },
        {
          fields: [
            {
              name: 'layout',
              type: 'blocks',
              blocks: [
                CallToAction,
                Content,
                MediaBlock,
                Archive,
                FormBlock,
                FAQs,
                FormationPackages,
                RegisterCompanySteps,
                BusinessBankAccounts,
                LandingHero,
                Support,
                OnlineAdminPortal,
                Testimonials,
                StaffReviews,
                TestimonialQuote,
                OrderSteps,
                OurOffices,
                FourSteps,
                AdBanner,
                SameDayIncorporation,
                PackageGrid,
                PackageInclusions,
                RecommendedPackages,
                UniqueSellingPoints,
                WhyChooseUs,
                BCorpCertification,
                BankingPartners,
                ChooseCompanyStructure,
                ComparePackagesNav,
                OurLatestBlogs,
                AdditionalServices,
                ServiceAds,
                Glossary,
                PurchaseAnAddress,
                StepsItems,
                ComparePackageTable,
                ComparePackagesHero,
                BuyService,
                ServiceContent,
                ServicesBenefits,
                ServicePriceBanner,
                VideoLibrary,
                OurAddress,
                CallOutCTA,
                TrustPilotBanner,
                PackagesHero,
                WhatsIncluded,
                SiteMap,
                RenewalItems,
                SearchCTA,
                AboutThisService,
                OtherWaysToBuy,
                ServicesHero,
                RegisteredOfficePurpose,
                OfficePhotoAddress,
                ServicesCTA,
                AffiliateProgram,
                CustomerQuote,
                RegisteredOfficeAddress,
                ServicesTestimonial,
                TestimonialBanner,
                HowItWorks,
                HowItWorksScreens,
                LegalSidenav,
                LegalContent,
                ContactUs,
                ComparePackagesHeader,
                PromoCard,
                PromoTier3,
                PromoTier2,
                WhatIsPrivateLimitedCompany,
                HeroStepper,
                PackagesNav,
                ComparePackages,
                PackageCardHero,
                WhatsIncludedSinglePackage,
                WiseBusinessAccount,
                ServicesTextWithCard,
                ContentWithPricingCard,
                ContentWithExtendedPricingCard,
                HeroServicesBanner,
                ServiceCards,
                ServiceInclusionsGrid,
                ServiceExplainer,
                HowItWorksList,
                ServiceText,
                Note,
                RegisterCtaPanel,
                RegisterOverseas,
                CaseStudyVideo,
                RequiredInformation,
                CaseStudyMosaic,
                FormationVideo,
                WhyUseAgent,
                PageTitle,
                TextContent,
                TitleBanner,
                FaqTopic,
                ReviewRatings,
                ClosingCTA,
                NameCheckPackages,
              ],
              admin: {
                initCollapsed: true,
              },
            },
          ],
          label: 'Content',
        },
        {
          name: 'meta',
          label: 'SEO',
          fields: [
            OverviewField({
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
              imagePath: 'meta.image',
            }),
            MetaTitleField({
              hasGenerateFn: true,
            }),
            MetaImageField({
              relationTo: 'media',
            }),

            MetaDescriptionField({}),
            {
              name: 'noindex',
              type: 'checkbox',
              label: 'Hide from search engines',
              defaultValue: false,
              admin: {
                description:
                  'Emits noindex, nofollow. Use for funnel pages that should not appear in search results.',
              },
            },
            PreviewField({
              hasGenerateFn: true,

              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
            }),
          ],
        },
      ],
    },
    {
      name: 'navigationLabel',
      type: 'text',
      admin: {
        position: 'sidebar',
        description:
          'Short label used in navigation menus. Falls back to the page title if left blank.',
      },
    },
    {
      name: 'isLegalPage',
      type: 'checkbox',
      defaultValue: false,
      index: true,
      admin: {
        position: 'sidebar',
        description:
          'Marks this page as a legal page. Sidebar contents are managed under Globals → Legal Sidenav.',
      },
    },
    {
      name: 'isHeaderOffset',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        position: 'sidebar',
        description:
          'Offset the header down by 40px (e.g. pages with an announcement bar above it).',
      },
    },
    {
      name: 'isHeaderOnDark',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        position: 'sidebar',
        description:
          'Show white logo and light nav links — use when the header overlays a dark hero image.',
      },
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        position: 'sidebar',
      },
    },
    slugField(),
    {
      name: 'fullPath',
      type: 'text',
      index: true,
      admin: {
        hidden: true,
      },
    },
  ],
  hooks: {
    afterChange: [revalidatePage, syncLegalSidenavOnChange],
    beforeChange: [populatePublishedAt, populateFullPath],
    afterDelete: [revalidateDelete, syncLegalSidenavOnDelete],
  },
  versions: {
    drafts: {
      autosave: {
        interval: 100, // We set this interval for optimal live preview
      },
      schedulePublish: true,
    },
    maxPerDoc: 50,
  },
}
