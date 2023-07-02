import type { AUTH_ACTIONS } from '../constants'

export type AuthActionButton =
  | AUTH_ACTIONS.EMAIL
  | AUTH_ACTIONS.GITHUB
  | AUTH_ACTIONS.GOOGLE
  | undefined

export interface AuthButtonStateType {
  isLoading: boolean
  action: AuthActionButton
}
