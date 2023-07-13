import type { MESSAGE_TYPE } from '../constants'

export type KeyOfMessageType = keyof typeof MESSAGE_TYPE

export type MessageStorageType = {
  message?: string
  type: KeyOfMessageType
  timeout: number
}

export type CreateMessage = {
  message: string
  timeout?: number
}
