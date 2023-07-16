import { component$, Slot, useVisibleTask$ } from '@builder.io/qwik'
import type { RequestHandler } from '@builder.io/qwik-city'
import { Link } from '@builder.io/qwik-city'
import { Message, MessageProvider } from '~/messages'
import { Navbar, supabase } from '~/shared'
import { useUser } from '~/user'
import { toUser } from '~/user/mapper'

export const onGet: RequestHandler = async ({ cacheControl }) => {
  // Control caching for this request for best performance and to reduce hosting costs:
  // https://qwik.builder.io/docs/caching/

  cacheControl({
    // Always serve a cached response by default, up to a week stale
    staleWhileRevalidate: 60 * 60 * 24 * 7,
    // Max once every 5 seconds, revalidate on the server to get a fresh version of this page
    maxAge: 5,
  })
}

export default component$(() => {
  const {
    data: { user },
    set,
  } = useUser()
  useVisibleTask$(({ cleanup }) => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event: string, session: any) => {
        if (event === 'SIGN_IN') {
          console.log({ session })
          if (session.user) {
            const newUser = toUser(session.user)
            set(newUser)
          }
        }
        if (event === 'SIGN_OUT') {
          set()
        }
      }
    )

    cleanup(() => authListener.subscription.unsubscribe())
  })

  return (
    <MessageProvider>
      <main class='relative h-full flex flex-col'>
        <Navbar avatarUrl={user?.avatarUrl}>
          <Link href='/auth/sign-in'> Sign In</Link>
          <Link href='/auth/sign-up'> Sign Up</Link>
        </Navbar>
        <section class='flex-1 flex items-center justify-center'>
          <Slot />
        </section>
        <Message />
      </main>
    </MessageProvider>
  )
})
