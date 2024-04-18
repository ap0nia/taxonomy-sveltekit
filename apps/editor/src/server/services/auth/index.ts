/**
 * TODO: add credentials provider for username/password login.
 * TODO: add passwordless email provider.
 */

import { OAuthProvider } from '@aponia.js/auth.js/providers/oauth'
import { OIDCProvider } from '@aponia.js/auth.js/providers/oidc'
import { AdapterPlugin } from '@aponia.js/core/adapter'
import { Auth } from '@aponia.js/core/auth'
import { JwtSessionPlugin } from '@aponia.js/core/session/jwt'
import GitHub from '@auth/core/providers/github'
import Google from '@auth/core/providers/google'

import { GITHUB_ID, GITHUB_SECRET, GOOGLE_ID, GOOGLE_SECRET } from '$env/static/private'
import { adapter as rawAdapter } from '$server/services/auth/adapter'

const github = new OAuthProvider(
  GitHub({
    clientId: GITHUB_ID,
    clientSecret: GITHUB_SECRET,
  }),
)

const google = new OIDCProvider(
  Google({
    clientId: GOOGLE_ID,
    clientSecret: GOOGLE_SECRET,
  }),
)

/**
 * After logging in with a provider, e.g. GitHub, Google, Credentials,
 * handles the logic for account, user, and session entities in the database.
 */
const adapter = new AdapterPlugin(rawAdapter)

/**
 * encodes/decodes cookies whenever session is set or read.
 */
export const jwt = new JwtSessionPlugin({
  cookie: {
    accessToken: {
      options: {
        maxAge: 1000 * 60 * 60 * 24 * 7 * 365, // 1 year
      },
    },
  },
})

export const auth = new Auth({
  cookies: {
    serialize: {
      secure: import.meta.env.DEV ? false : true,
    },
  },
  plugins: [github, google, adapter, jwt],
})
