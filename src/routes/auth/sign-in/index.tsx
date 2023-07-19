import { $, component$, useVisibleTask$ } from '@builder.io/qwik'
import type { DocumentHead } from '@builder.io/qwik-city'
import { useNavigate, useLocation } from '@builder.io/qwik-city'
import {
  AUTH_ACTIONS,
  ButtonGroup,
  FormSingIn,
  Header,
  useAuthButtonState,
  Card,
  Auth,
} from '~/auth'
import { useMessage } from '~/messages'
import { useUser } from '~/user'

export default component$(() => {
  const state = useAuthButtonState()
  const { createMessageError, createMessageSuccess } = useMessage()
  const location = useLocation()
  const nav = useNavigate()
  const {
    data: { isLoagged },
    set,
  } = useUser()

  useVisibleTask$(async ({ track }) => {
    track(() => isLoagged)
    if (!isLoagged) return
    const { user, error } = await Auth.getUser()

    if (user && !error) {
      console.log(user)
      set(user)
      nav('/dashboard')
    }
  })

  const handlerOnEmail = $(async (email: string) => {
    state.action = AUTH_ACTIONS.EMAIL
    state.isLoading = true

    const { error } = await Auth.singInOpt({
      email,
      options: { emailRedirectTo: location.url.href },
    })

    if (error) {
      createMessageError({
        message: `${error.name} ${error.message} ${error.cause}`,
        milisecons: 1200,
      })
      state.action = undefined
      state.isLoading = false
    } else {
      createMessageSuccess({
        message: 'Perfect! Now check your email',
      })
    }
  })

  const onGithub = $(async () => {
    state.action = AUTH_ACTIONS.GITHUB
    state.isLoading = true

    const { error } = await Auth.singInGithub({
      options: { redirectTo: location.url.href },
    })

    if (error) {
      createMessageError({
        message: `${error.name} ${error.message} ${error.cause}`,
        milisecons: 1200,
      })
      state.action = undefined
      state.isLoading = false
    }
  })
  const onGoogle = $(async () => {
    state.action = AUTH_ACTIONS.GOOGLE
    state.isLoading = true

    const { error } = await Auth.singInGoogle({
      options: { redirectTo: location.url.href },
    })

    if (error) {
      createMessageError({
        message: `${error.name} ${error.message} ${error.cause}`,
        milisecons: 1200,
      })
      state.action = undefined
      state.isLoading = false
    }
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
