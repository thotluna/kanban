import { createContextId } from '@builder.io/qwik'
import type { TypeMessage } from '../types'

export const MessageContext = createContextId<TypeMessage>('message-context')
