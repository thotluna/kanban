import { createContextId } from '@builder.io/qwik'
import type { User } from '~/shared'

export const UserContext = createContextId<{ isLoagged: boolean; user?: User }>(
  'user-context'
)
