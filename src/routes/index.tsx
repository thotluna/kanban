import { component$, useSignal } from '@builder.io/qwik'
import { type DocumentHead, Link } from '@builder.io/qwik-city'
import { Navbar } from '~/shared/components/navbar'

export default component$(() => {
  const count = useSignal(0)

  return (
    <>
      <Navbar>
        <Link href='/auth/sign-in'> Sign In</Link>
        <Link href='/auth/sign-up'> Sign Up</Link>
      </Navbar>
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
