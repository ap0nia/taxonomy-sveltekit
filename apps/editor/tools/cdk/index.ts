import { Type } from '@sinclair/typebox'
import { Value } from '@sinclair/typebox/value'
import { SvelteKit } from '@svelte.kit/cdk'
import { App, Stack } from 'aws-cdk-lib'
import { config } from 'dotenv'

config({
  path: '../../.env',
})

const envSchema = Type.Object({
  TURSO_CONNECTION_URL: Type.String(),
  TURSO_AUTH_TOKEN: Type.String(),
  GOOGLE_ID: Type.String(),
  GOOGLE_SECRET: Type.String(),
  GOOGLE_REFRESH_TOKEN: Type.String(),
  GOOGLE_EMAIL: Type.String(),
  GOOGLE_CREDENTIALS_JSON: Type.String(),
  GITHUB_ID: Type.String(),
  GITHUB_SECRET: Type.String(),
  GITHUB_ID_PRODUCTION: Type.String(),
  GITHUB_SECRET_PRODUCTION: Type.String(),
})

const cleanEnv = Value.Clean(envSchema, { ...process.env })

if (!Value.Check(envSchema, cleanEnv)) {
  console.error(...Value.Errors(envSchema, process.env))
  throw new Error('Invalid environment variables')
}

const env = cleanEnv

async function main() {
  const app = new App()

  const stack = new Stack(app, 'taxonomy')

  const sveltekit = new SvelteKit(stack, 'SvelteKit', {
    constructProps: {
      handler: () => {
        return {
          environment: {
            ...env,
            GITHUB_ID: env.GITHUB_ID_PRODUCTION,
            GITHUB_SECRET: env.GITHUB_SECRET_PRODUCTION,
            GOOGLE_CREDENTIALS_JSON: '.',
          },
        }
      },
    },
  })

  await sveltekit.initialize()
}

main()
