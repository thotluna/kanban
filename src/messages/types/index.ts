import type { MESSAGE_TYPE } from '../constants'

export type KeyOfMessageType = keyof typeof MESSAGE_TYPE

export type TypeMessage = {
  message?: string
  milisecons: 'forever' | number
  type: KeyOfMessageType
}
