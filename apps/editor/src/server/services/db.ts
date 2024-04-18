import { createClient } from '@libsql/client/web'
import { drizzle } from 'drizzle-orm/libsql'

import { TURSO_AUTH_TOKEN, TURSO_CONNECTION_URL } from '$env/static/private'
import * as schema from '$server/db'

export const client = createClient({
  url: TURSO_CONNECTION_URL,
  authToken: TURSO_AUTH_TOKEN,
})

export const db = drizzle(client, { schema })

export type DbService = typeof db
