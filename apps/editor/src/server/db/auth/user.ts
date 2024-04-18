import { createId } from '@paralleldrive/cuid2'
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'

export const user = sqliteTable('user', {
  id: text('id').primaryKey().$defaultFn(createId),

  name: text('name'),

  avatar: text('avatar'),

  verified: integer('verified'),
})

export type User = typeof user.$inferSelect
