import { component$, useComputed$, useVisibleTask$ } from '@builder.io/qwik'
import { MESSAGE_TYPE } from '~/messages/constants'
import { useMessage } from '~/messages/hooks'
import { CloseIcon } from '~/shared'

export const Message = component$(() => {
  const { message, milisecons, type, clear } = useMessage()

  const color = useComputed$(() => {
    if (type.value === MESSAGE_TYPE.ERROR) return 'bg-red-600'
    if (type.value === MESSAGE_TYPE.INFO) return 'bg-blue-600'
    return 'bg-emerald-600'
  })

  useVisibleTask$(({ track, cleanup }) => {
    track(() => milisecons.value)
    if (milisecons.value === 'forever') return
    if (milisecons.value <= 0) return
    const timeout = setTimeout(() => {
      clear()
    }, milisecons.value)

    cleanup(() => clearTimeout(timeout))
  })

  return (
    <>
      {message.value && (
        <article
          data-test-id='message-component'
          class='w-full fixed bottom-2 left-0 right-0 flex justify-center'
        >
          <span class={['relative ps-4 pe-7 py-3 rounded-md', color.value]}>
            <button
              onClick$={clear}
              class='absolute top-1 right-1 hover:text-emerald-50'
            >
              <CloseIcon />
            </button>
            {message.value}
          </span>
        </article>
      )}
    </>
  )
})
