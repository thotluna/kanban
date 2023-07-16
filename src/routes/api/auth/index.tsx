import { type RequestHandler } from '@builder.io/qwik-city'
import { COOKIES_ACCESS_TITLE, COOKIES_REFRESH_TITLE } from '~/auth/constants'

type AccessType = {
  accessToken?: string
  refreshToken?: string
}

export const onGet: RequestHandler = ({ json, cookie, env }) => {
  cookie.set(COOKIES_REFRESH_TITLE, '', {
    secure: env.get('NODE_ENV') !== 'development',
    httpOnly: true,
    expires: new Date(),
    sameSite: 'lax',
    path: '/',
  })
  cookie.set(COOKIES_ACCESS_TITLE, '', {
    secure: env.get('NODE_ENV') !== 'development',
    httpOnly: true,
    expires: new Date(),
    sameSite: 'lax',
    path: '/',
  })

  json(200, { message: 'Cookies expired' })
}

export const onPost: RequestHandler = async ({
  request,
  json,
  cookie,
  env,
}) => {
  const access: AccessType = await request.json()

  if (!access.accessToken || !access.refreshToken) {
    json(401, { message: 'Missing tokens' })
  }

  const dateAccess = new Date()
  const dateRefresh = new Date()

  dateAccess.setHours(dateAccess.getDate() + 1)
  dateRefresh.setDate(dateRefresh.getDate() + 1)

  cookie.set(COOKIES_REFRESH_TITLE, access.refreshToken!, {
    secure: env.get('NODE_ENV') !== 'development',
    httpOnly: true,
    expires: dateAccess,
    sameSite: 'lax',
    path: '/',
  })
  cookie.set(COOKIES_ACCESS_TITLE, access.accessToken!, {
    secure: env.get('NODE_ENV') !== 'development',
    httpOnly: true,
    expires: dateRefresh,
    sameSite: 'lax',
    path: '/',
  })

  json(200, { message: 'Tokens stored' })
}
