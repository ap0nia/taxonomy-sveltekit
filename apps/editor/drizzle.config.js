// @ts-check

import { Type } from '@sinclair/typebox'
import { Value } from '@sinclair/typebox/value'
import { config as dotenvConfig } from 'dotenv'

dotenvConfig({
  path: '../../.env',
})

const envSchema = Type.Object({
  TURSO_CONNECTION_URL: Type.String(),
  TURSO_AUTH_TOKEN: Type.String(),
})

if (!Value.Check(envSchema, process.env)) {
  console.error(...Value.Errors(envSchema, process.env))
  throw new Error('Invalid environment variables')
}

/**
 * @type {import('drizzle-kit').Config}
 */
const config = {
  schema: './src/server/db',
  driver: 'turso',
  dbCredentials: {
    url: process.env.TURSO_CONNECTION_URL,
    authToken: process.env.TURSO_AUTH_TOKEN,
  },
}

export default config
