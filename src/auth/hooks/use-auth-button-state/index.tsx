import { useContext } from '@builder.io/qwik'
import { AuthButtonStateContext } from '~/auth/contexts'

export function useAuthButtonState() {
  const state = useContext(AuthButtonStateContext)

  return state
}
