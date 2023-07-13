import { createContextId } from '@builder.io/qwik'
import type { MessageStorageType } from '../types'

export const messageContext =
  createContextId<MessageStorageType>('message-context')
