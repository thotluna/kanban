import { $, component$, useStore } from '@builder.io/qwik'
import {
  AuthenticationPanel,
  AUTH_ACTIONS,
  type AuthButtonStateType,
} from '~/auth'

export default component$(() => {
  const state = useStore<AuthButtonStateType>({
    isLoading: false,
    action: undefined,
  })
  const handlerOnGithub = $(() => {
    state.isLoading = true
    state.action = AUTH_ACTIONS.GITHUB
  })
  const handlerOnGoogle = $(() => {
    state.isLoading = true
    state.action = AUTH_ACTIONS.GOOGLE
  })
  const handlerOnEmail = $(() => {
    state.isLoading = true
    state.action = AUTH_ACTIONS.EMAIL
  })

  return (
    <section class='w-full h-full flex items-center justify-center'>
      <AuthenticationPanel
        title='Sing In'
        href='/auth/sing-up'
        messageLink='sign up with new user'
        onGithub={handlerOnGithub}
        onGoogle={handlerOnGoogle}
        onEmail={handlerOnEmail}
        isLoading={state.isLoading}
        action={state.action}
      />
    </section>
  )
})
