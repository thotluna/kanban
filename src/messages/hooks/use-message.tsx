import { useContext } from '@builder.io/qwik'
import { MessageContext } from '../contexts'

export function useMessage() {
  const state = useContext(MessageContext)

  return state
}
