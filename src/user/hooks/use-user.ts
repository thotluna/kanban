import { $, useContext } from '@builder.io/qwik'
import { User } from '~/shared'
import { UserContext } from '../contexts'

export function useUser() {
  const data = useContext(UserContext)

  const set = $((user?: User) => {
    if (user) {
      data.user = user
    } else {
      data.user = undefined
    }
  })

  return { data, set }
}
