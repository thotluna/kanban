import type {
  CredentialSignUpWithOpt,
  CredentialsOAuth,
  CredentialsOpt,
} from '~/shared'
import { AuthSupabase } from '~/shared/services'

export const Auth = {
  singInOpt: async ({ email, options }: CredentialsOpt) => {
    return await AuthSupabase.singInOpt({ email, options })
  },
  singInGithub: async ({ options }: CredentialsOAuth) => {
    return await AuthSupabase.singInGithub({ options })
  },
  singInGoogle: async ({ options }: CredentialsOAuth) => {
    return await AuthSupabase.singInGoogle({ options })
  },
  singUpOpt: async ({ email, password, options }: CredentialSignUpWithOpt) => {
    return await AuthSupabase.singUpOpt({ email, password, options })
  },
  singOut: () => {
    return AuthSupabase.singOut()
  },
}
