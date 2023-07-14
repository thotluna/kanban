import { component$, useSignal } from '@builder.io/qwik'
import { ErrorsField } from '../errors-field'
export interface CheckboxProps {
  name: string
  label: string
  hasError?: boolean
  errors?: string[]
}

export const Checkbox = component$<CheckboxProps>(
  ({ name, label, hasError = false, errors = [] }) => {
    const termsCheck = useSignal(false)
    return (
      <>
        <div class='w-full '>
          <input
            id={name}
            name={name}
            title={name}
            type='checkbox'
            class={[
              'inline-block peer relative appearance-none w-5 h-5 border-2 border-emerald-600 rounded-md bg-slate-800 transition-transform duration-200 rotate-0 scale-100',
              'focus:before:absolute focus:before:-top-3 focus:before:-left-3  focus:before:w-10 focus:before:h-10 focus:before:bg-emerald-400 focus:before:opacity-30 focus:before:rounded-full',
              'hover:scale-125',
              'hover:before:absolute hover:before:-top-3 hover:before:-left-3  hover:before:w-10 hover:before:h-10 hover:before:bg-emerald-400 hover:before:opacity-30 hover:before:rounded-full',
              'checked:after:box-border checked:after:absolute checked:after:m-[3px] checked:after:bg-emerald-500 checked:after:rounded-sm checked:after:top-0 checked:after:bottom-0 checked:after:left-0 checked:after:right-0 checked:transition-transform checked:duration-200 checked:rotate-90',
            ]}
            value={`${termsCheck.value}`}
            onChange$={() => (termsCheck.value = !termsCheck.value)}
          />
          <label
            for={name}
            data-test='labelTerms'
            class={[
              'inline px-2 cursor-pointer',
              hasError ? 'text-red-200' : '',
            ]}
          >
            {label}
          </label>
          <ErrorsField hasError={hasError}>{errors[0]}</ErrorsField>
        </div>
      </>
    )
  }
)
