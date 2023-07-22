import { component$, Slot } from '@builder.io/qwik'
import type { RequestHandler } from '@builder.io/qwik-city'
import { getName, ServerAuth } from '~/shared'

export const onRequest: RequestHandler = async ({
  cookie,
  params,
  env,
  redirect,
  next,
}) => {
  const usernameParam = params.username
  const privateKey = env.get('PRIVATE_SUPABASE_KEY')
  const userKey = cookie.get('server-access-token')?.value

  if (!privateKey || !userKey) throw redirect(303, '/auth/sign-in')

  const auth = new ServerAuth(privateKey!)
  const { profile, error } = await auth.getProfile(userKey!)

  if (error || !profile) throw redirect(303, '/auth/sign-in')

  const { id, email, role } = profile

  if (!id || !email || !role) throw redirect(303, '/auth/sign-in')

  const username = getName(email)

  if (username !== usernameParam) throw redirect(303, `/${username}/`)

  await next()
}

export default component$(() => {
  return <Slot />
})
