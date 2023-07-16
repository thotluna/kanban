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
}

export const getUser = async () => {
  const { data, error } = await supabase.auth.getUser()

  if (data.user) {
    const user = toUser(data.user)
    return { user, error }
  } else {
    const user = null
    return { user, error }
  }
}
