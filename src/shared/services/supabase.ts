import type { SupabaseClient } from '@supabase/supabase-js'
import { createClient } from '@supabase/supabase-js'
import { toUser } from '~/user/mapper'
import type {
  CredentialSignUpWithOpt,
  CredentialsOAuth,
  CredentialsOpt,
} from '../types'

const { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY } = import.meta.env

export const supabase = createClient(
  PUBLIC_SUPABASE_URL,
  PUBLIC_SUPABASE_ANON_KEY
)

export const AuthSupabase = {
  singInOpt: async ({ email, options }: CredentialsOpt) => {
    return await supabase.auth.signInWithOtp({ email, options })
  },
  singInGithub: async ({ options }: CredentialsOAuth) => {
    return await supabase.auth.signInWithOAuth({ provider: 'github', options })
  },
  singInGoogle: async ({ options }: CredentialsOAuth) => {
    return await supabase.auth.signInWithOAuth({ provider: 'google', options })
  },
  singUpOpt: async ({ email, password, options }: CredentialSignUpWithOpt) => {
    return await supabase.auth.signUp({ email, password, options })
  },
  singOut: () => {
    return supabase.auth.signOut()
  },
  getUser: async () => {
    const { data, error } = await supabase.auth.getUser()
    if (data.user) {
      const user = toUser(data.user)
      return { user, error }
    } else {
      const user = null
      return { user, error }
    }
  },
}

export const supabaseFromServer = (privateKey: string) =>
  createClient(PUBLIC_SUPABASE_URL, privateKey)

export type Profile = {
  id?: string
  email?: string
  role?: string
}

export class ServerAuth {
  privateKey: string
  supabase: SupabaseClient<any, 'public', any>
  constructor(privateKey: string) {
    this.privateKey = privateKey
    this.supabase = createClient(PUBLIC_SUPABASE_URL, privateKey)
  }

  async getUser(privateTokenUser: string) {
    try {
      const result = await supabase.auth.getUser(privateTokenUser)
      if (result.error) return { user: undefined, error: result.error }
      const user = toUser(result.data.user)
      return { user, error: undefined }
    } catch (error) {
      return { user: undefined, error }
    }
  }

  async getProfileFonDb(id: string) {
    try {
      const { data, error } = await this.supabase
        .from('profile')
        .select('id, email, role')
        .eq('id', id)
        .limit(1)
      if (error) return { profile: undefined, error }

      const [{ email, role }] = data
      const profile: Profile = { id, email, role }
      return { profile, error: undefined }
    } catch (error) {
      return { profile: undefined, error }
    }
  }

  async getProfile(privateTokenUser: string) {
    const { user, error } = await this.getUser(privateTokenUser)

    if (error || !user) return { profile: undefined, error }

    const { id, email } = user

    if (!id || !email)
      return { profile: undefined, error: 'User does not exist' }

    return this.getProfileFonDb(id)
  }
}
