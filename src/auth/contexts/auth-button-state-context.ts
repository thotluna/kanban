import { createContextId } from '@builder.io/qwik'
import type { AuthButtonStateType } from '../types'

export const AuthButtonStateContext =
  createContextId<AuthButtonStateType>('auth-button-state')
