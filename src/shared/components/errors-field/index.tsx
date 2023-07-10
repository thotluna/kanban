import { component$, Slot } from '@builder.io/qwik'

export interface ErrorsFieldProps {
  hasError?: boolean
}

export const ErrorsField = component$<ErrorsFieldProps>(({ hasError }) => {
  return (
    <>
      {hasError && (
        <div class='w-full flex flex-col items-end'>
          <span data-test='error' class='text-red-400 text-xs'>
            <Slot />
          </span>
        </div>
      )}
    </>
  )
})
