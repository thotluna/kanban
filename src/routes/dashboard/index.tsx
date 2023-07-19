import { component$ } from '@builder.io/qwik'
import type { DocumentHead } from '@builder.io/qwik-city'

export default component$(() => {
  return <div>Dashboard</div>
})

export const head: DocumentHead = {
  title: 'What will we work on today',
  meta: [
    {
      name: 'description',
      content: 'Dashboard of Kanban Qwik',
    },
  ],
}
