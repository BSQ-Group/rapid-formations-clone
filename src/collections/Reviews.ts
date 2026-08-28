import type { CollectionConfig } from 'payload'

import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'

export const ReviewsCollection: CollectionConfig = {
  slug: 'reviews',
  labels: {
    singular: 'Review',
    plural: 'Reviews',
  },
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  admin: {
    useAsTitle: 'authorName',
    group: 'Content',
    defaultColumns: ['authorName', 'provider', 'score', 'reviewDate'],
    description:
      'Individual customer reviews shown by the Review Centre Tabs block. Provider must match a platform name in the Review Stats global, e.g. "Trustpilot".',
  },
  hooks: {
    // The block looks reviews up by an exact provider match, so anything the author
    // types is snapped to the spelling Review Stats uses. Without this, "trustpilot"
    // against a platform named "Trustpilot" saves clean and then shows on no tab at
    // all, with nothing in the admin to say why.
    beforeValidate: [
      async ({ data, req }) => {
        if (typeof data?.authorName === 'string') data.authorName = data.authorName.trim()
        if (typeof data?.provider !== 'string') return data

        const typed = data.provider.trim()
        data.provider = typed
        data.providerKey = typed.toLowerCase()
        if (!typed) return data

        try {
          const { platforms } = await req.payload.findGlobal({ slug: 'reviewStats', depth: 0 })
          const match = (platforms ?? []).find(
            (platform) => platform.provider.toLowerCase() === typed.toLowerCase(),
          )
          if (match) data.provider = match.provider
        } catch {
          // Leave the trimmed value as typed; a mismatch is visible on the page.
        }
        return data
      },
    ],
  },
  fields: [
    {
      name: 'authorName',
      type: 'text',
      label: 'Author',
      required: true,
      admin: { description: 'Their initials fill the avatar circle.' },
    },
    {
      type: 'row',
      fields: [
        {
          name: 'provider',
          type: 'text',
          label: 'Provider',
          required: true,
          admin: {
            width: '40%',
            description:
              'Names a platform in Review Stats, e.g. "Trustpilot" or "Google". Case does not matter — it is saved using the spelling Review Stats uses. A name matching no platform is not shown on any tab.',
          },
        },
        {
          name: 'score',
          type: 'number',
          label: 'Score',
          required: true,
          min: 0,
          max: 5,
          admin: { width: '25%', description: 'Out of 5.' },
        },
        {
          name: 'reviewDate',
          type: 'date',
          label: 'Date',
          required: true,
          admin: {
            width: '35%',
            description: 'Shown as a relative age, e.g. "4 months ago". Newest render first.',
          },
        },
      ],
    },
    {
      name: 'providerKey',
      type: 'text',
      index: true,
      admin: { hidden: true },
      // The block matches on this rather than on `provider`, so renaming a platform's
      // casing in Review Stats cannot orphan the reviews already saved against it.
      // Maintained by beforeValidate; never edited directly.
    },
    {
      name: 'body',
      type: 'textarea',
      label: 'Review',
      required: true,
      admin: {
        description: 'Truncated to the first 20 words behind a Read More toggle.',
      },
    },
  ],
}
