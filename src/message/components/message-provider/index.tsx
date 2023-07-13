import {
  component$,
  Slot,
  useContextProvider,
  useStore,
} from '@builder.io/qwik'
import { MESSAGE_TYPE, messageContext } from '~/message'
import type { MessageStorageType } from '~/message'

export const MessageProvider = component$(() => {
  const state = useStore<MessageStorageType>({
    message: undefined,
    type: MESSAGE_TYPE.INFO,
    timeout: 0,
  })

  useContextProvider(messageContext, state)

  return <Slot />
})
