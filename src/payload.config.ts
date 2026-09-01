import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { attachDatabasePool } from '@vercel/functions'
import sharp from 'sharp'
import path from 'path'
import { buildConfig, PayloadRequest } from 'payload'
import { fileURLToPath } from 'url'

import { Categories } from './collections/Categories'
import { Media } from './collections/Media'
import { Packages } from './collections/Packages'
import { Pages } from './collections/Pages'
import { Posts } from './collections/Posts'
import { Products } from './collections/Products'
import { Users } from './collections/Users'
import { Footer } from './Footer/config'
import { Header } from './Header/config'
import { ServiceAdsCollection } from './collections/ServiceAds'
import { StaffCollection } from './collections/Staff'
import { ReviewsCollection } from './collections/Reviews'
import { ScholarshipWinnersCollection } from './collections/ScholarshipWinners'
import { BusinessBankAccountsGlobal } from './globals/BusinessBankAccounts/config'
import { DocumentLibraryGlobal } from './globals/DocumentLibrary/config'
import { EligibleCountriesGlobal } from './globals/EligibleCountries/config'
import { ReviewStatsGlobal } from './globals/ReviewStats/config'
import { TestimonialsGlobal } from './globals/Testimonials/config'
import { plugins } from './plugins'
import { defaultLexical } from '@/fields/defaultLexical'
import { getServerSideURL } from './utilities/getURL'
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    components: {
      beforeLogin: ['@/components/BeforeLogin'],
      beforeDashboard: ['@/components/BeforeDashboard'],
    },
    importMap: {
      baseDir: path.resolve(dirname),
    },
    user: Users.slug,
    livePreview: {
      breakpoints: [
        {
          label: 'Mobile',
          name: 'mobile',
          width: 375,
          height: 667,
        },
        {
          label: 'Tablet',
          name: 'tablet',
          width: 768,
          height: 1024,
        },
        {
          label: 'Desktop',
          name: 'desktop',
          width: 1440,
          height: 900,
        },
      ],
    },
  },
  editor: defaultLexical,
  db: mongooseAdapter({
    url: process.env.MONGODB_URI || '',
    connectOptions: {
      // Cap sockets per function instance. Default 100 × N cold-started Vercel
      // instances trivially saturates Atlas M0's 500-connection cluster cap;
      // 10 leaves headroom for ~50 concurrent instances before pressure starts.
      maxPoolSize: 2,
      minPoolSize: 1,
      maxIdleTimeMS: 5000,
      heartbeatFrequencyMS: 5000,
      appName: 'qcf-prod',
    },
    afterOpenConnection: async (adapter) => {
      attachDatabasePool(adapter.connection.getClient())
    },
  }),
  collections: [
    Pages,
    Posts,
    Media,
    Categories,
    Users,
    Packages,
    Products,
    ServiceAdsCollection,
    StaffCollection,
    ReviewsCollection,
    ScholarshipWinnersCollection,
  ],
  cors: [getServerSideURL()].filter(Boolean),
  plugins: [
    ...plugins,
    vercelBlobStorage({
      collections: {
        media: true,
      },
      token: process.env.BLOB_READ_WRITE_TOKEN || '',
      access: 'public',
    }),
  ],
  globals: [
    Header,
    Footer,
    BusinessBankAccountsGlobal,
    DocumentLibraryGlobal,
    EligibleCountriesGlobal,
    ReviewStatsGlobal,
    TestimonialsGlobal,
  ],
  secret: process.env.PAYLOAD_SECRET,
  sharp,
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  jobs: {
    access: {
      run: ({ req }: { req: PayloadRequest }): boolean => {
        if (req.user) return true

        const secret = process.env.CRON_SECRET
        if (!secret) return false

        const authHeader = req.headers.get('authorization')
        return authHeader === `Bearer ${secret}`
      },
    },
    tasks: [],
  },
})
