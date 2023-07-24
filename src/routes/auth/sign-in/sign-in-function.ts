import type { Page } from '@playwright/test'
import { TOTP } from 'otpauth'
import dotenv from 'dotenv'
dotenv.config()

export const signInTest = async (page: Page) => {
  const user = process.env.PRIVATE_USER
  const pass = process.env.PRIVATE_PASSWORD
  const secret = process.env.PRIVATE_2FA_SECRET

  const totp = new TOTP({
    issuer: 'GitHub',
    label: `${user}`,
    algorithm: 'SHA1',
    digits: 6,
    period: 30,
    secret: `${secret}`,
  })

  await page.goto('/auth/sign-in/')
  await page.getByRole('button', { name: 'Github' }).click()
  await page.getByLabel('Username or email address').click()
  await page.getByLabel('Username or email address').fill(`${user}`)
  await page.getByLabel('Password').click()
  await page.getByLabel('Password').fill(`${pass}`)
  await page.getByRole('button', { name: 'Sign in' }).click()
  await page.getByPlaceholder('XXXXXX').click()

  const secretGenerated = totp.generate()
  await page.getByPlaceholder('XXXXXX').fill(`${secretGenerated}`)
  const urlString = page.url()
  const url = new URL(urlString)
  const stateUrl = url.searchParams.get('state')
  if (
    stateUrl ===
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTAyMjEyODcsInNpdGVfdXJsIjoiaHR0cDovL2xvY2FsaG9zdDo1MTczIiwiaWQiOiIwMDAwMDAwMC0wMDAwLTAwMDAtMDAwMC0wMDAwMDAwMDAwMDAiLCJmdW5jdGlvbl9ob29rcyI6bnVsbCwicHJvdmlkZXIiOiJnaXRodWIiLCJyZWZlcnJlciI6Imh0dHA6Ly9sb2NhbGhvc3Q6NDE3My9hdXRoL3NpZ24taW4vIiwiZmxvd19zdGF0ZV9pZCI6IiJ9.NWGn9yiRYniqwG6AXIFmIw-8NG8k9csdqTz12QSQc_g'
  ) {
    await page.getByRole('button', { name: 'Authorize thotluna' }).click()
  }
}
//urlString.startsWith('https://github.com/login/oauth/authorize?') && !redirectUri
//https://github.com/login/oauth/authorize?client_id=ab2b10bd27ccad07fbb9&redirect_to=http%3A%2F%2Flocalhost%3A4173%2Fauth%2Fsign-in%2F&
//redirect_uri=https%3A%2F%2Fmupbnlwrjfvkfxtljcqs.supabase.co%2Fauth%2Fv1%2Fcallback&
//response_type=code&
//scope=user%3Aemail&state=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTAyMTk5NDYsInNpdGVfdXJsIjoiaHR0cDovL2xvY2FsaG9zdDo1MTczIiwiaWQiOiIwMDAwMDAwMC0wMDAwLTAwMDAtMDAwMC0wMDAwMDAwMDAwMDAiLCJmdW5jdGlvbl9ob29rcyI6bnVsbCwicHJvdmlkZXIiOiJnaXRodWIiLCJyZWZlcnJlciI6Imh0dHA6Ly9sb2NhbGhvc3Q6NDE3My9hdXRoL3NpZ24taW4vIiwiZmxvd19zdGF0ZV9pZCI6IiJ9.FwFn7EXCJYqLS6zpS4LrNfsl6bUleIlKq7MvGPFIi84

//https://github.com/login/oauth/authorize?client_id=ab2b10bd27ccad07fbb9&redirect_to=http%3A%2F%2Flocalhost%3A4173%2Fauth%2Fsign-in%2F&
//redirect_uri=https%3A%2F%2Fmupbnlwrjfvkfxtljcqs.supabase.co%2Fauth%2Fv1%2Fcallback&
//response_type=code&
//scope=user%3Aemail&state=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTAyMjEyODcsInNpdGVfdXJsIjoiaHR0cDovL2xvY2FsaG9zdDo1MTczIiwiaWQiOiIwMDAwMDAwMC0wMDAwLTAwMDAtMDAwMC0wMDAwMDAwMDAwMDAiLCJmdW5jdGlvbl9ob29rcyI6bnVsbCwicHJvdmlkZXIiOiJnaXRodWIiLCJyZWZlcnJlciI6Imh0dHA6Ly9sb2NhbGhvc3Q6NDE3My9hdXRoL3NpZ24taW4vIiwiZmxvd19zdGF0ZV9pZCI6IiJ9.NWGn9yiRYniqwG6AXIFmIw-8NG8k9csdqTz12QSQc_g
