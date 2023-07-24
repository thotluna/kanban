import type { Page } from '@playwright/test'
import { TOTP } from 'otpauth'
import dotenv from 'dotenv'
dotenv.config()

export const signInTest = async (page: Page) => {
  const user = process.env.PRIVATE_USER
  const pass = process.env.PRIVATE_PASSWORD
  const secret = process.env.PRIVATE_2FA_SECRET

  console.log({ secret })

  const totp = new TOTP({
    issuer: 'GitHub',
    label: `${user}`,
    algorithm: 'SHA1',
    digits: 6,
    period: 30,
    secret: `${secret}`,
  })

  const secretGenerated = totp.generate()

  await page.goto('/auth/sign-in/')
  await page.getByRole('button', { name: 'Github' }).click()
  await page.getByLabel('Username or email address').click()
  await page.getByLabel('Username or email address').fill(`${user}`)
  await page.getByLabel('Password').click()
  await page.getByLabel('Password').fill(`${pass}`)
  await page.getByRole('button', { name: 'Sign in' }).click()
  await page.getByPlaceholder('XXXXXX').click()
  await page.getByPlaceholder('XXXXXX').fill(`${secretGenerated}`)
}
