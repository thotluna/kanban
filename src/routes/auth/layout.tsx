import { component$, Slot } from '@builder.io/qwik'
import { Link } from '@builder.io/qwik-city'
import { AuthButtonProvider } from '~/auth'
import { Message } from '~/message/components'
import { Navbar } from '~/shared'

export default component$(() => {
  return (
    <main class='w-full h-screen relative'>
      <Navbar>
        <Link href='/auth/sign-in'> Sign In</Link>
        <Link href='/auth/sign-up'> Sign Up</Link>
      </Navbar>
      <session class='container mx-auto w-full flex flex-col items-center justify-center'>
        <AuthButtonProvider>
          <Slot />
        </AuthButtonProvider>
      </session>
      <Message />
    </main>
  )
})
