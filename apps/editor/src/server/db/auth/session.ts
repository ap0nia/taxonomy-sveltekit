import { createId } from '@paralleldrive/cuid2'
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'

import { user } from './user'

export const session = sqliteTable('session', {
  id: text('id').primaryKey().$defaultFn(createId),

  userId: text('user_id')
    .references(() => user.id, { onDelete: 'cascade' })
    .notNull(),

  expires: integer('expires').notNull(),

  status: text('status').default('ACTIVE'),

  refreshToken: text('refresh_token').$defaultFn(createId),
})

export type Session = typeof session.$inferSelect
