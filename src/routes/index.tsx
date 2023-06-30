import { component$, useSignal } from '@builder.io/qwik'
import { type DocumentHead, Link } from '@builder.io/qwik-city'

export default component$(() => {
  const count = useSignal(0)

  return (
    <>
      <header>
        <div>
          <h2>Kanban Qwik</h2>
        </div>
        <nav>
          <Link href='/auth/sign-in'>Sign In</Link>
        </nav>
      </header>
      <main class='container mx-auto'>
        <button onClick$={() => count.value++}>click: {count.value}</button>
      </main>
    </>
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
