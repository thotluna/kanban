import { component$, useSignal } from '@builder.io/qwik'
import { type DocumentHead } from '@builder.io/qwik-city'

export default component$(() => {
  const count = useSignal(0)

  return (
    <section class='container mx-auto'>
      <button onClick$={() => count.value++}>click: {count.value}</button>
    </section>
  )
})

export const head: DocumentHead = {
  title: 'Welcome to Qwik',
  meta: [
    {
      name: 'description',
      content: 'Qwik site description',
    },
  ],
}
