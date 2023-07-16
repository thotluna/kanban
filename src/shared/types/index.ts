export interface CredentialsOpt {
  email: string
  options: {
    emailRedirectTo: string
  }
}

export interface CredentialSignUpWithOpt extends CredentialsOpt {
  password: string
}

export type CredentialsOAuth = {
  options?: {
    redirectTo: string
  }
}

export interface User {
  id: string
  email?: string
  role?: string
  avatarUrl?: string
  name?: string
  alias?: string
}
