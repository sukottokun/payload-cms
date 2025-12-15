import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Pages } from './collections/Pages'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

// Configure SSL for Digital Ocean databases
const connectionString = process.env.DATABASE_URI || ''

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Media, Pages],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  cors: [
    'https://dev-headless-on-pantheon.pantheonsite.io',
    'https://test-headless-on-pantheon.pantheonsite.io',
    'https://headless-on-pantheon.pantheonsite.io',
    'http://localhost:3000',
  ],
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: connectionString,
      // SSL config for Digital Ocean - accepts self-signed certificates
      ssl:
        connectionString &&
        (connectionString.includes('ondigitalocean.com') ||
          connectionString.includes('sslmode=require'))
          ? {
              rejectUnauthorized: false,
            }
          : undefined,
    },
  }),
  sharp,
  plugins: [],
})
