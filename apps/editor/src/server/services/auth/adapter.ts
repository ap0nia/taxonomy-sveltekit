import type { Adapter } from '@aponia.js/core/adapter'
import { and, eq } from 'drizzle-orm'

import { account, session, user } from '$server/db'
import { db } from '$server/services/db'

export const adapter: Adapter = {
  findAccount: async (_request, response) => {
    const foundAccount = await db.query.account.findFirst({
      where: and(
        eq(account.providerId, response.providerId),
        eq(account.providerAccountId, response.providerAccountId),
      ),
    })

    return foundAccount
  },
  getUserFromAccount: async (account, _request, _response) => {
    const accountUser = await db.query.user.findFirst({
      where: eq(user.id, account.userId),
    })
    return accountUser
  },
  createSession: async (user, _account, _request, _response) => {
    const [newSession] = await db
      .insert(session)
      .values({
        userId: user.id,
        expires: Date.now() + 1000 * 60 * 24,
      })
      .returning()

    return newSession
  },
  findUser: (_request, _response) => {
    console.log('Database does not track user email, cannot find user if account does not exist')
    return
  },
  createUser: async (_request, response) => {
    const [newUser] = await db
      .insert(user)
      .values({
        name: response.account.name,
        avatar: response.account.picture ?? response.account['image'],
      })
      .returning()

    return newUser
  },
  findUserAccounts: async (user, _request, _response) => {
    const userAccounts = await db.query.account.findMany({
      where: eq(account.userId, user.id),
    })
    return userAccounts
  },
  createAccount: async (user, _request, response) => {
    const [newAccount] = await db
      .insert(account)
      .values({
        providerId: response.providerId,
        providerAccountId: response.providerAccountId,
        userId: user.id,
      })
      .returning()

    return newAccount
  },
}
