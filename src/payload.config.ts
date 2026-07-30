import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { attachDatabasePool } from '@vercel/functions'
import sharp from 'sharp'
import path from 'path'
import { buildConfig, PayloadRequest } from 'payload'
import { fileURLToPath } from 'url'

import { Categories } from './collections/Categories'
import { Media } from './collections/Media'
import { Pages } from './collections/Pages'
import { Posts } from './collections/Posts'
import { Users } from './collections/Users'
import { Footer } from './Footer/config'
import { Header } from './Header/config'
import { BusinessBankAccountsGlobal } from './globals/BusinessBankAccounts/config'
import { LegalSidenavGlobal } from './globals/LegalSidenavItemsOrder/config'
import { PackagesNavGlobal } from './globals/PackagesNavItems/config'
import { plugins } from './plugins'
import { defaultLexical } from '@/fields/defaultLexical'
import { getServerSideURL } from './utilities/getURL'
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    components: {
      // The `BeforeLogin` component renders a message that you see while logging into your admin panel.
      // Feel free to delete this at any time. Simply remove the line below.
      beforeLogin: ['@/components/BeforeLogin'],
      // The `BeforeDashboard` component renders the 'welcome' block that you see after logging into your admin panel.
      // Feel free to delete this at any time. Simply remove the line below.
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
  // This config helps us configure global or default features that the other editors can inherit
  editor: defaultLexical,
  db: mongooseAdapter({
    url: process.env.MONGODB_URI || '',
    connectOptions: {
      // Cap sockets per function instance. Default 100 × N cold-started Vercel
      // instances trivially saturates Atlas M0's 500-connection cluster cap;
      // 10 leaves headroom for ~50 concurrent instances before pressure starts.
      maxPoolSize: 2,
      // Let idle pools drain to 0 on serverless — function instances are
      // short-lived, so keeping warm sockets open just wastes the cluster cap.
      minPoolSize: 1,
      // Vercel's connection-pooling guide recommends a short idle timeout
      // (~5s) so suspended Fluid Compute instances release sockets quickly.
      // https://vercel.com/kb/guide/connection-pooling-with-functions
      maxIdleTimeMS: 5000,
      // Detect Atlas primary changes in ~5s instead of ~10s. Shrinks the window
      // where requests fall into the failed-handshake hole during M0 elections.
      heartbeatFrequencyMS: 5000,
      // Tag connections so they're attributable to this app in Atlas server-side
      // logs and currentOp() — free observability for incident triage.
      appName: 'qcf-prod',
    },
    // Hand the underlying MongoClient to Vercel's Fluid Compute runtime so it
    // can drain idle sockets before the function instance suspends. Without
    // this, idle Vercel Functions hold their sockets open until cold-stop,
    // burning Atlas connection slots. Mongo equivalent of the `attachDatabasePool(pool)`
    // pattern in https://vercel.com/kb/guide/connection-pooling-with-functions
    afterOpenConnection: async (adapter) => {
      attachDatabasePool(adapter.connection.getClient())
    },
  }),
  collections: [Pages, Posts, Media, Categories, Users],
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
  globals: [Header, Footer, BusinessBankAccountsGlobal, LegalSidenavGlobal, PackagesNavGlobal],
  secret: process.env.PAYLOAD_SECRET,
  sharp,
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  jobs: {
    access: {
      run: ({ req }: { req: PayloadRequest }): boolean => {
        // Allow logged in users to execute this endpoint (default)
        if (req.user) return true

        const secret = process.env.CRON_SECRET
        if (!secret) return false

        // If there is no logged in user, then check
        // for the Vercel Cron secret to be present as an
        // Authorization header:
        const authHeader = req.headers.get('authorization')
        return authHeader === `Bearer ${secret}`
      },
    },
    tasks: [],
  },
})
