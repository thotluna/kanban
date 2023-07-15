import { $, component$ } from '@builder.io/qwik'
import type { DocumentHead } from '@builder.io/qwik-city'
import { useLocation } from '@builder.io/qwik-city'
import {
  useAuthButtonState,
  AUTH_ACTIONS,
  ButtonGroup,
  FormSignUp,
  Header,
  Auth,
  Card,
} from '~/auth'
import { useMessage } from '~/messages'

export default component$(() => {
  const state = useAuthButtonState()
  const { createMessageError, createMessageSuccess } = useMessage()
  const location = useLocation()

  const handlerOnEmail = $(async (email: string) => {
    state.action = AUTH_ACTIONS.EMAIL
    state.isLoading = true

    const timestamp = Date.now()
    const password = Math.floor(Math.random() * 1000000) + email + timestamp
    const { data, error } = await Auth.singUpOpt({
      email,
      password,
      options: { emailRedirectTo: location.url.href },
    })

    if (error) {
      createMessageError({
        message: `${error.name} ${error.message} ${error.cause}`,
        milisecons: 1200,
      })
    }

    if (!error && data.user?.id) {
      createMessageSuccess({
        message: 'Perfect! Now check your email to activate your account',
      })
    }

    state.action = undefined
    state.isLoading = false
  })

  const onGithub = $(async () => {
    state.action = AUTH_ACTIONS.GITHUB
    state.isLoading = true

    const { data, error } = await Auth.singInGithub({
      options: { redirectTo: location.url.href },
    })

    console.log({ data, error })

    if (error) {
      createMessageError({
        message: `${error.name} ${error.message} ${error.cause}`,
        milisecons: 1200,
      })
    }

    if (!error) {
      createMessageSuccess({
        message: 'Perfect! Now check your email to activate your account',
      })
    }

    state.action = undefined
    state.isLoading = false
  })
  const onGoogle = $(() => {
    state.action = AUTH_ACTIONS.GOOGLE
    state.isLoading = true
  })
  return (
    <Card>
      <Header
        title='Sign Up'
        link='/auth/sign-in'
        linkComment='sign in with user exist'
      />

      <ButtonGroup
        action={state.action}
        onAuthGithub={onGithub}
        onAuthGoogle={onGoogle}
        isLoading={state.isLoading}
      />

      <div class='w-full relative  flex justify-center items-center before:absolute before:w-full before:h-[1px] before:bg-slate-400 before:bottom-[44%] before:left-0 before:right-0 '>
        <span class='text-sm bg-slate-700 text-slate-400 z-10 px-1'>
          Or sign up with your email
        </span>
      </div>
      <FormSignUp
        actionButton={state.action}
        onEmail={handlerOnEmail}
        isLoading={state.isLoading}
      />
    </Card>
  )
})

export const head: DocumentHead = {
  title: 'Sign Up',
  meta: [
    {
      name: 'description',
      content: 'Sign Up to Kanban',
    },
  ],
}
