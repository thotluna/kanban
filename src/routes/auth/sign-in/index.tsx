import { $, component$ } from '@builder.io/qwik'
import type { DocumentHead } from '@builder.io/qwik-city'
import {
  AUTH_ACTIONS,
  ButtonGroup,
  FormSingIn,
  Header,
  useAuthButtonState,
} from '~/auth'
import { Card } from '~/auth/components/card'

export default component$(() => {
  const state = useAuthButtonState()

  const handlerOnEmail = $((email: string) => {
    state.action = AUTH_ACTIONS.EMAIL
    state.isLoading = true

    console.log(email)
  })

  const onGithub = $(() => {
    state.action = AUTH_ACTIONS.GITHUB
    state.isLoading = true
  })
  const onGoogle = $(() => {
    state.action = AUTH_ACTIONS.GOOGLE
    state.isLoading = true
  })
  return (
    <Card>
      <Header
        title='Sign In'
        link='/auth/sign-up'
        linkComment='sign up with new user'
      />

      <ButtonGroup
        action={state.action}
        onAuthGithub={onGithub}
        onAuthGoogle={onGoogle}
        isLoading={state.isLoading}
      />

      <div class='w-full relative  flex justify-center items-center before:absolute before:w-full before:h-[1px] before:bg-slate-400 before:bottom-[44%] before:left-0 before:right-0 '>
        <span class='text-sm bg-slate-700 text-slate-400 z-10 px-1'>
          Or sign in with your email
        </span>
      </div>
      <FormSingIn
        actionButton={state.action}
        onEmail={handlerOnEmail}
        isLoading={state.isLoading}
      />
    </Card>
  )
})

export const head: DocumentHead = {
  title: 'Sign In',
  meta: [
    {
      name: 'description',
      content: 'Sign In to Kanban',
    },
  ],
}
