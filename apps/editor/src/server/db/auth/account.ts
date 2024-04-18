import { primaryKey, sqliteTable, text } from 'drizzle-orm/sqlite-core'

import { user } from './user'

export const account = sqliteTable(
  'account',
  {
    userId: text('user_id')
      .references(() => user.id, { onDelete: 'cascade' })
      .notNull(),

    providerId: text('provider').notNull(),

    providerAccountId: text('provider_account_id').notNull(),

    providerAccountCredential: text('provider_account_credential'),

    providerType: text('provider_type'),
  },
  (table) => {
    return {
      primaryKey: primaryKey({
        columns: [table.userId, table.providerId, table.providerAccountId],
      }),
    }
  },
)

export type Account = typeof account.$inferSelect
