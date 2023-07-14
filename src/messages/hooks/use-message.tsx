import { $, useComputed$, useContext } from '@builder.io/qwik'
import { MESSAGE_TYPE } from '../constants'
import { MessageContext } from '../contexts'

type CreateMessage = {
  message: string
  milisecons?: 'forever' | number
}

export function useMessage() {
  const state = useContext(MessageContext)

  const message = useComputed$(() => state.message)
  const milisecons = useComputed$(() => state.milisecons)
  const type = useComputed$(() => state.type)

  const createMessageError = $(
    ({ message, milisecons = 'forever' }: CreateMessage) => {
      state.message = message
      state.type = MESSAGE_TYPE.ERROR
      state.milisecons = milisecons
    }
  )

  const createMessageInfo = $(
    ({ message, milisecons = 'forever' }: CreateMessage) => {
      state.message = message
      state.type = MESSAGE_TYPE.INFO
      state.milisecons = milisecons
    }
  )

  const createMessageSuccess = $(
    ({ message, milisecons = 'forever' }: CreateMessage) => {
      state.message = message
      state.type = MESSAGE_TYPE.SUCCESS
      state.milisecons = milisecons
    }
  )

  const clear = $(() => {
    state.message = undefined
    state.milisecons = 'forever'
    state.type = MESSAGE_TYPE.INFO
  })

  return {
    message,
    milisecons,
    type,
    clear,
    createMessageError,
    createMessageInfo,
    createMessageSuccess,
  }
}
