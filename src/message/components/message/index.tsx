import { component$, useComputed$, useVisibleTask$ } from '@builder.io/qwik'
import { MESSAGE_TYPE } from '~/message/constants'
import { useMessage } from '~/message/hooks'
import { CloseIcon } from '~/shared/components/icons'

export const Message = component$(() => {
  const { message, type, timeout, close } = useMessage()

  const color = useComputed$(() => {
    if (type.value === MESSAGE_TYPE.ERROR) return 'bg-red-600'
    if (type.value === MESSAGE_TYPE.INFO) return 'bg-blue-600'
    return 'bg-emerald-600'
  })

  useVisibleTask$(({ track, cleanup }) => {
    track(() => timeout.value)
    if (timeout.value <= 0) return
    const time = setTimeout(() => {
      close()
    }, timeout.value)
    cleanup(() => clearTimeout(time))
  })

  return (
    <>
      {message.value && (
        <session
          data-test-id='messages'
          class='w-full fixed bottom-4 left-0  flex items-center justify-center'
        >
          <article
            class={[
              'px-8 py-3 bg-emerald-600 rounded-lg relative',
              color.value,
            ]}
          >
            <button class='absolute right-1 top-1' onClick$={close}>
              <CloseIcon />
            </button>
            <span>{message}</span>
          </article>
        </session>
      )}
    </>
  )
})
