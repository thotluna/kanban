import { supabase } from '~/shared/service'

export const Auth = {
  signUpOpt: ({ email, password }: { email: string; password: string }) => {
    return supabase.auth.signUp({ email, password })
  },
  signInOpt: ({ email, redirect }: { email: string; redirect: string }) => {
    return supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: redirect,
        shouldCreateUser: false,
      },
    })
  },
  signOut: async () => {
    return await supabase.auth.signOut()
  },
}
