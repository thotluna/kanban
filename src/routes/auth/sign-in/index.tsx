import { $, component$, useSignal } from '@builder.io/qwik'
import { AUTH_ACTIONS, ButtonGroup, FormSingIn, Header } from '~/auth'
import type { AuthState } from '~/auth'

export default component$(() => {
  const state = useSignal<AuthState>({
    isLoading: false,
    action: undefined,
  })

  const handlerOnEmail = $((email: string) => {
    state.value = {
      action: AUTH_ACTIONS.EMAIL,
      isLoading: true,
    }
    console.log(email)
  })

  const onGithub = $(() => {
    state.value = {
      isLoading: true,
      action: AUTH_ACTIONS.GITHUB,
    }
  })
  const onGoogle = $(() => {
    state.value = {
      isLoading: true,
      action: AUTH_ACTIONS.GOOGLE,
    }
  })
  return (
    <section class='w-full h-full flex items-center justify-center'>
      <article class='max-w-sm p-8 rounded-md bg-slate-700 flex flex-col gap-4'>
        <Header
          title='Sign In'
          link='/auth/sign-up'
          linkComment='sign up with new user'
        />

        <ButtonGroup
          action={state.value.action}
          onAuthGithub={onGithub}
          onAuthGoogle={onGoogle}
          isLoading={state.value.isLoading}
        />

        <div class='w-full relative  flex justify-center items-center before:absolute before:w-full before:h-[1px] before:bg-slate-400 before:bottom-[44%] before:left-0 before:right-0 '>
          <span class='text-sm bg-slate-700 text-slate-400 z-10 px-1'>
            Or sign in with your email
          </span>
        </div>
        <FormSingIn
          actionButton={state.value.action}
          onEmail={handlerOnEmail}
          isLoading={state.value.isLoading}
        />
      </article>
    </section>
  )
})
