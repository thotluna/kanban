import {
  component$,
  Slot,
  useContextProvider,
  useStore,
} from '@builder.io/qwik'
import { AuthButtonStateContext } from '~/auth/contexts/auth-button-state-context'
import type { AuthButtonStateType } from '~/auth/types'

export const AuthButtonProvider = component$(() => {
  const state = useStore<AuthButtonStateType>({
    isLoading: false,
    action: undefined,
  })

  useContextProvider(AuthButtonStateContext, state)

  return <Slot />
})
