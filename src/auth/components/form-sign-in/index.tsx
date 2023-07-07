import { component$ } from '@builder.io/qwik'
import { Form, globalAction$, z, zod$ } from '@builder.io/qwik-city'
import type { FormAuthProps } from '~/auth'
import { AUTH_ACTIONS } from '~/auth'
import { Button, BUTTON_TYPE, Field, Spinner } from '~/shared'

export const useFormSignInData = globalAction$(
  (data) => {
    const email = data.email

    return {
      email,
    }
  },
  zod$({
    email: z.string().nonempty().email(),
  })
)

export const FormSingIn = component$<FormAuthProps>(
  ({ actionButton, onEmail, isLoading }) => {
    const action = useFormSignInData()
    return (
      <Form
        class='flex flex-col gap-4'
        action={action}
        onSubmitCompleted$={() => {
          if (action.value?.email) {
            onEmail(action.value.email)
          }
        }}
      >
        <Field
          name='email'
          label='E-mail'
          placeholder='your-email@example.com'
          hasError={
            action.value?.failed &&
            action.value.fieldErrors?.email &&
            action.value.fieldErrors.email.length > 0
          }
          errors={action.value?.fieldErrors?.email}
        />

        <Button type={BUTTON_TYPE.BUTTON} disabled={isLoading}>
          <div class='flex items-center justify-center gap-2'>
            {isLoading && actionButton === AUTH_ACTIONS.EMAIL && <Spinner />}
            Sign Up
          </div>
        </Button>
      </Form>
    )
  }
)
