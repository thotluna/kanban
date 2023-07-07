import { $, component$ } from '@builder.io/qwik'
import {
  useAuthButtonState,
  AUTH_ACTIONS,
  ButtonGroup,
  FormSignUp,
  Header,
} from '~/auth'

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
    <section class='w-full h-full flex items-center justify-center'>
      <article class='max-w-sm p-8 rounded-md bg-slate-700 flex flex-col gap-4'>
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
      </article>
    </section>
  )
})
