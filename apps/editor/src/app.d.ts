import '@aponia.js/core/types'
import 'unplugin-icons/types/svelte'

import type { Profile } from '@auth/core/types'
import type { RequestEvent } from '@sveltejs/kit'

import type { Account as DbAccount } from '$server/db/auth/account'
import type { Session as DbSession } from '$server/db/auth/session'
import type { User as DbUser } from '$server/db/auth/user'

declare global {
  /**
   * Allow importing markdown files for MDSvex.
   */
  declare module '*.md'

  namespace Aponia {
    interface User extends DbUser {}

    interface Account extends DbAccount {}

    interface Session extends DbSession {}

    interface ProviderAccount extends Profile {}

    interface RequestInput {
      event: RequestEvent
    }

    interface ProviderAccountMapping {
      github?: GitHubProfile
      google?: GoogleProfile
    }
  }

  namespace App {
    interface Locals {
      getUser: () => Promise<Aponia.User | undefined>
      getSession: () => Promise<Aponia.Session | undefined>
      getRefresh: () => Promise<Aponia.Refresh | undefined>
    }

    interface PageData {
      user: Aponia.User | undefined
      session: Aponia.Session | undefined
    }
  }
}
