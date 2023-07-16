import type { User } from '~/shared'

export const toUser = (user: any): User => {
  const { id, email, role, user_metadata: metadata } = user
  const { avatar_url, user_name } = metadata

  return {
    id,
    email,
    role,
    alias: user_name,
    avatarUrl: avatar_url,
  }
}
