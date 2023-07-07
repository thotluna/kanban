import { component$ } from '@builder.io/qwik'
import { ErrorsField } from '../errors-field'

type FieldProps = {
  name: string
  label?: string
  labelClassTest?: string
  placeholder?: string
  hasError?: boolean
  errors?: string[]
}

export const Field = component$<FieldProps>(
  ({
    name,
    label = undefined,
    labelClassTest = '',
    placeholder = '',
    hasError = false,
    errors = [],
  }) => {
    const border = hasError ? 'border-red-700' : 'border-emerald-700'
    return (
      <div class='w-full flex flex-col gap-1'>
        {label && (
          <label
            class={[
              'font-semibold',
              hasError ? 'text-red-200' : '',
              labelClassTest,
            ]}
          >
            {label}
          </label>
        )}
        <input
          id={name}
          name={name}
          placeholder={placeholder}
          class={[
            'text-emerald-50 bg-transparent border-2 rounded-md px-4 py-1 placeholder:text-slate-500 focus-visible:outline-2 focus-visible:outline-emerald-400 focus-visible:outline focus-visible:border-0',
            border,
          ]}
        />
        <ErrorsField hasError={hasError}>{errors[0]}</ErrorsField>
      </div>
    )
  }
)
