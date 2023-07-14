import { component$, useComputed$ } from '@builder.io/qwik'
import { MESSAGE_TYPE } from '~/messages/constants'
import { useMessage } from '~/messages/hooks'
import { CloseIcon } from '~/shared'

export const Message = component$(() => {
  const state = useMessage()

  const color = useComputed$(() => {
    if (state.type === MESSAGE_TYPE.ERROR) return 'bg-red-600'
    if (state.type === MESSAGE_TYPE.INFO) return 'bg-blue-600'
    return 'bg-emerald-600'
  })

  return (
    <>
      {state.message && (
        <article class='w-full fixed bottom-2 left-0 right-0 flex justify-center'>
          <span class={['relative ps-4 pe-7 py-3 rounded-md', color.value]}>
            <button class='absolute top-1 right-1 hover:text-emerald-50'>
              <CloseIcon />
            </button>
            {state.message}
          </span>
        </article>
      )}
    </>
  )
})
