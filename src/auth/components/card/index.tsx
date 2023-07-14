import { component$, Slot } from '@builder.io/qwik'

export const Card = component$(() => {
  return (
    <article class='w-full max-w-sm p-8 rounded-md bg-slate-700 flex flex-col gap-4'>
      <Slot />
    </article>
  )
})
