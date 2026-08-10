import type { Block } from 'payload'

export const NameCheckPackages: Block = {
  slug: 'nameCheckPackages',
  interfaceName: 'NameCheckPackagesBlock',
  labels: {
    singular: 'Name Check — Package',
    plural: 'Name Check — Packages',
  },
  fields: [
    {
      name: 'packageName',
      type: 'text',
      label: 'Package name',
      required: true,
      admin: {
        description:
          'Without the word "Package" — "Basic" renders as "You have chosen the BASIC PACKAGE."',
      },
    },
    {
      name: 'checkoutPath',
      type: 'text',
      label: 'Checkout path',
      required: true,
      admin: {
        description:
          'Path on client.rapidformations.co.uk, leading and trailing slash included — e.g. /buy/basic-package/. Two of these do not follow the package slug: Limited by Guarantee is /buy/limited-by-guarantee/ and LLP is /buy/limited-liability-partnership/.',
      },
    },
    {
      name: 'searchPlaceholder',
      type: 'text',
      label: 'Search placeholder',
      admin: { description: 'Defaults to "Find your perfect company name".' },
    },
  ],
}
