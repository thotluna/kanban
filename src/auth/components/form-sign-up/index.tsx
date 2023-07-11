import { component$ } from '@builder.io/qwik'
import { Form, globalAction$, z, zod$ } from '@builder.io/qwik-city'
import { AUTH_ACTIONS } from '~/auth'
import type { FormAuthProps } from '~/auth'
import { Button, BUTTON_TYPE, Spinner } from '~/shared'
import { Checkbox, Field } from '~/shared'

export const useFormData = globalAction$(
  (data) => {
    const email = data.email
    const terms = data.terms

    return {
      email,
      terms,
    }
  },
  zod$({
    email: z.string().nonempty().email(),
    terms: z.string().regex(/true/),
  })
)

export const FormSignUp = component$<FormAuthProps>(
  ({ actionButton, onEmail, isLoading = false }) => {
    const action = useFormData()

    return (
      <Form
        class='flex flex-col gap-4'
        data-test='sign-up'
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

        <Checkbox
          name='terms'
          label='Agree to terms and conditions'
          hasError={
            action.value?.failed &&
            action.value.fieldErrors?.terms &&
            action.value.fieldErrors.terms.length > 0
          }
          errors={action.value?.fieldErrors?.terms}
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
