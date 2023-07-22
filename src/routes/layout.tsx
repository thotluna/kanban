import { $, component$, Slot, useVisibleTask$ } from '@builder.io/qwik'
import type { RequestHandler } from '@builder.io/qwik-city'
import { useNavigate } from '@builder.io/qwik-city'
import { Link } from '@builder.io/qwik-city'
import { Auth } from '~/auth'
import { Message, MessageProvider } from '~/messages'
import { getName, Navbar, supabase } from '~/shared'
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
  const navigate = useNavigate()
  const {
    data: { user, isLoagged },
    set,
  } = useUser()
  useVisibleTask$(async ({ track }) => {
    track(() => isLoagged)
    // if (!isLoagged) return
    const { user, error } = await Auth.getUser()

    if (user && !error) {
      console.log(user)
      set(user)
      const username = getName(user.email!)
      navigate(`/${username}/`)
    }
  })
  useVisibleTask$(({ cleanup }) => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event: string, session: any) => {
        console.log({ event })

        if (event === 'SIGNED_IN') {
          const newUser = toUser(session.user)
          set(newUser)
          // navigator('/dashboard')
          console.log({ session })

          const body = {
            accessToken: session.access_token,
            refreshToken: session.refresh_token,
          }

          await fetch('/api/auth', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
          })

          const username = getName(newUser.email!)

          navigate(`/${username}`)
        }
        if (event === 'SIGNED_OUT') {
          set()
          await fetch('/api/auth', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          })
          navigate('/auth/sign-in')
        }
      }
    )

    cleanup(() => authListener.subscription.unsubscribe())
  })

  const handlerSignOut = $(async () => {
    Auth.singOut()
  })

  return (
    <MessageProvider>
      <main class='relative h-full flex flex-col'>
        <Navbar avatarUrl={user?.avatarUrl}>
          {!user && (
            <>
              <Link href='/auth/sign-in'> Sign In</Link>
              <Link href='/auth/sign-up'> Sign Up</Link>
            </>
          )}
          {user && (
            <>
              <Link href='/'>Home</Link>
              <Link href='/dashboard'>Dasboard</Link>
              <button onClick$={handlerSignOut}>Sign Out</button>
            </>
          )}
        </Navbar>
        <section class='flex-1 flex items-center justify-center'>
          <Slot />
        </section>
        <Message />
      </main>
    </MessageProvider>
  )
})
