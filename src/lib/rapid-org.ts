// Rapid Formations org constants for JSON-LD, mirroring the legacy site's
// Organization/LocalBusiness/WebPage (minus its empty-field/shortcode junk).
export const RAPID_ORG = {
  name: 'Rapid Formations',
  foundingDate: '2013',
  telephone: '+442078719990',
  email: 'info@rapidformations.co.uk',
  address: {
    streetAddress: '71-75 Shelton Street, Covent Garden',
    addressLocality: 'London',
    addressRegion: 'Greater London',
    postalCode: 'WC2H 9JQ',
    addressCountry: 'GB',
  },
  sameAs: [
    'https://www.facebook.com/rapidformations/',
    'https://x.com/RapidUKOfficial',
    'https://www.linkedin.com/company/rapid-formations/',
    'https://www.instagram.com/rapidformationsofficial/',
    'https://uk.trustpilot.com/review/www.rapidformations.co.uk',
  ],
  knowsAbout: [
    'Company Formation',
    'Company Registration',
    'Business Registration',
    'Companies House Filing',
    'Corporate Compliance',
    'Business Address Services',
    'Call Handling Services',
  ],
  award: 'Certified B Corporation',
  bCorp: {
    name: 'Certified B Corporation',
    description:
      'Rapid Formations is a Certified B Corporation, verified by B Lab for meeting high standards of social and environmental performance.',
    url: 'https://www.bcorporation.net/en-us/find-a-b-corp/company/bsq-group/',
  },
  founders: ['Graeme Donnelly'],
  localBusinessDescription:
    "Quick and easy company registration from the UK's leading company formation agent. Form your company with our simple 4 step process.",
  homeHeadline:
    'Simple online company formation in the UK trusted by over 1 million businesses. Choose a company name, apply in minutes and start trading the next day.',
} as const
