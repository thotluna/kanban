import {
  component$,
  Slot,
  useContextProvider,
  useStore,
} from '@builder.io/qwik'
import { MESSAGE_TYPE } from '~/messages/constants'
import { MessageContext } from '~/messages/contexts'
import type { TypeMessage } from '~/messages/types'

export const MessageProvider = component$(() => {
  const state = useStore<TypeMessage>({
    message: undefined,
    milisecons: 'forever',
    type: MESSAGE_TYPE.INFO,
  })

  useContextProvider(MessageContext, state)

  return <Slot />
})
