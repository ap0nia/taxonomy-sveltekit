import { createId } from '@paralleldrive/cuid2'
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'

import { user } from './user'

export const emailToken = sqliteTable('email_token', {
  id: text('id').primaryKey().$defaultFn(createId),

  userId: text('user_id').references(() => user.id, { onDelete: 'cascade' }),

  expires: integer('expires').notNull(),
})

export type EmailToken = typeof emailToken.$inferSelect
