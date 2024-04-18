export * from './auth'

import { relations } from 'drizzle-orm'

import { account, session, user } from './auth'

export const userRelations = relations(user, (helpers) => {
  return {
    /**
     * A user can have multiple accounts, i.e. ways to login.
     */
    account: helpers.many(account),
    session: helpers.many(session),
  }
})

export const sessionRelations = relations(session, (helpers) => {
  return {
    /**
     * Each session belongs to a single, unique user.
     */
    user: helpers.one(user, {
      fields: [session.userId],
      references: [user.id],
    }),
  }
})

export const accountRelations = relations(account, (helpers) => {
  return {
    /**
     * Each account belongs to a single, unique user.
     */
    user: helpers.one(user, {
      fields: [account.userId],
      references: [user.id],
    }),
  }
})
