import { $, useContext } from '@builder.io/qwik'
import type { User } from '~/shared'
import { UserContext } from '../contexts'

export function useUser() {
  const data = useContext(UserContext)

  const set = $((user?: User) => {
    if (user) {
      data.user = user
      data.isLoagged = true
    } else {
      data.user = undefined
      data.isLoagged = false
    }
  })

  return { data, set }
}
