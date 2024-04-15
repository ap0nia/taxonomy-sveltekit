import '@aponia.js/core/types'
import 'unplugin-icons/types/svelte'

declare global {
  /**
   * Allow importing markdown files for MDSvex.
   */
  declare module '*.md'

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
