import { Type } from '@sinclair/typebox'
import { Value } from '@sinclair/typebox/value'
import { SvelteKit } from '@svelte.kit/cdk'
import { App, Stack } from 'aws-cdk-lib'
import { config } from 'dotenv'

config({
  path: '../../.env',
})

const envSchema = Type.Object({
  SENTRY_AUTH_TOKEN: Type.String(),
  PUBLIC_CHAT_API_URL: Type.String(),
  PUBLIC_PUSHER_KEY: Type.String(),
  PUBLIC_PUSHER_CLUSTER: Type.String(),
  PUSHER_APP_ID: Type.String(),
  PUSHER_SECRET: Type.String(),
  DATABASE_URL: Type.String(),
  TURSO_CONNECTION_URL: Type.String(),
  TURSO_AUTH_TOKEN: Type.String(),
  GOOGLE_ID: Type.String(),
  GOOGLE_SECRET: Type.String(),
  GOOGLE_REFRESH_TOKEN: Type.String(),
  GOOGLE_EMAIL: Type.String(),
  GITHUB_ID: Type.String(),
  GITHUB_SECRET: Type.String(),
  GITHUB_ID_PRODUCTION: Type.String(),
  GITHUB_SECRET_PRODUCTION: Type.String(),
  OPENAI_API_KEY: Type.String(),
  GOOGLE_CREDENTIALS_JSON: Type.String(),
})

const cleanEnv = Value.Clean(envSchema, { ...process.env })

if (!Value.Check(envSchema, cleanEnv)) {
  console.error(...Value.Errors(envSchema, process.env))
  throw new Error('Invalid environment variables')
}

const env = cleanEnv

async function main() {
  const app = new App()

  const stack = new Stack(app, 'baymax')

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
