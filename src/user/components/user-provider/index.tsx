import {
  component$,
  Slot,
  useContextProvider,
  useStore,
} from '@builder.io/qwik'
import type { User } from '~/shared'
import { UserContext } from '~/user/contexts'

export const UserProvider = component$(() => {
  const state = useStore<{ user?: User }>({})

  useContextProvider(UserContext, state)

  return <Slot />
})
