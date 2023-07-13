import { $, useComputed$, useContext } from '@builder.io/qwik'
import { MESSAGE_TYPE } from '../constants'
import { messageContext } from '../contexts'
import type { CreateMessage } from '../types'

export function useMessage() {
  const state = useContext(messageContext)

  const message = useComputed$(() => state.message)
  const type = useComputed$(() => state.type)
  const timeout = useComputed$(() => state.timeout)

  const close = $(() => {
    state.message = undefined
    state.type = MESSAGE_TYPE.INFO
  })

  const createMessageError = $(({ message, timeout = 0 }: CreateMessage) => {
    state.message = message
    state.type = MESSAGE_TYPE.ERROR
    state.timeout = timeout
  })

  const createMessageInfo = $(({ message, timeout = 0 }: CreateMessage) => {
    state.message = message
    state.type = MESSAGE_TYPE.INFO
    state.timeout = timeout
  })

  const createMessageSuccess = $(({ message, timeout = 0 }: CreateMessage) => {
    state.message = message
    state.type = MESSAGE_TYPE.SUCCESS
    state.timeout = timeout
  })

  return {
    message,
    type,
    timeout,
    close,
    createMessageError,
    createMessageInfo,
    createMessageSuccess,
  }
}
