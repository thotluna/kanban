import { component$ } from '@builder.io/qwik'
import { CloseIcon } from '~/shared'

export const Message = component$(() => {
  return (
    <article class='w-full fixed bottom-2 left-0 right-0 flex justify-center'>
      <span class='relative ps-4 pe-7 py-3 bg-emerald-600 rounded-md'>
        <button class='absolute top-1 right-1 hover:text-emerald-50'>
          <CloseIcon />
        </button>
        This is a message
      </span>
    </article>
  )
})
