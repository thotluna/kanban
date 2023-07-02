import { $, component$, useStore } from '@builder.io/qwik'
import { AUTH_ACTIONS } from '../../constants'
import { Button, BUTTON_TYPE, Spinner } from '~/shared'
import type { AuthActionButton } from '~/auth/types'

interface FormEmailProps {
  submitTitle: string
  onEmail: (email: string) => void
  hasTerms?: boolean
  isLoading: boolean
  action: AuthActionButton
}

type ErrorState = {
  email?: string
  terms?: string
}

export const FormEmail = component$<FormEmailProps>(
  ({ submitTitle, onEmail, hasTerms = false, isLoading, action }) => {
    const errorState = useStore<ErrorState>({
      email: undefined,
      terms: undefined,
    })

    const handlerSubmit = $((event: any) => {
      console.log('enter')
      const email = (event.target as HTMLFormElement).email?.value
      const terms = (event.target as HTMLFormElement).terms?.checked

      if (!email || email === '') {
        errorState.email = 'Email is required'
        return
      }

      const emailPatter = /^[A-Za-z0-9_!#$%&'*+/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/gm

      if (!emailPatter.test(email)) {
        errorState.email = 'Bad email'
        return
      }

      errorState.email = ''

      if (terms === false && hasTerms) {
        errorState.terms = 'Please accept the terms and conditions'
        return
      }

      errorState.terms = ''

      onEmail(email)
    })

    return (
      <form
        onSubmit$={handlerSubmit}
        preventdefault:submit
        class='w-full flex flex-col justify-between items-center gap-2 '
      >
        <div class='w-full relative  flex justify-center items-center before:absolute before:w-full before:h-[1px] before:bg-slate-400 before:bottom-[44%] before:left-0 before:right-0 '>
          <span
            data-test='subtitle'
            id='subtitle'
            class='text-sm bg-slate-700 text-slate-400 z-10 px-1'
          >
            Or do you prefer to use your email
          </span>
        </div>
        <label
          data-test='labelInput'
          class='w-full mt-1 flex flex-col justify-start items-start gap-1 '
        >
          <span>Email address</span>
          <input
            class={[
              'w-full rounded-md py-1 text-slate-800 px-2',
              errorState.email ? 'border-red-500' : '',
            ]}
            data-text='inputEmail'
            id='email'
            title='email'
            placeholder='your-email@domain.com'
            // type='email'
          />
          {errorState.email && (
            <span data-test='errorInput' class='text-sm text-red-500'>
              {errorState.email}
            </span>
          )}
        </label>
        {hasTerms && (
          <div class='w-full  flex flex-col items-center justify-start'>
            <label
              data-test='labelTerms'
              class='w-full flex justify-start items-center gap-1 '
            >
              <input id='terms' name='terms' title='terms' type='checkbox' />
              <span>Agree to terms and conditions</span>
            </label>
            {errorState.terms && (
              <span data-test='errorTerms' class='text-sm text-red-500'>
                {errorState.terms}
              </span>
            )}
          </div>
        )}

        <p class='text-sm text-slate-300 text-center my-2'>
          Password is not required. Email is used as confirmation
        </p>

        <Button
          type={BUTTON_TYPE.BUTTON}
          id='button-submit'
          data-test='button-submit'
          classText='w-full'
          accent={true}
          disabled={isLoading}
        >
          {action === AUTH_ACTIONS.EMAIL && isLoading && <Spinner />}
          {submitTitle}
        </Button>
      </form>
    )
  }
)
