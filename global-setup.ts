import type { Browser, Page } from '@playwright/test'
import { chromium, expect } from '@playwright/test'
import { TOTP } from 'otpauth'
import dotenv from 'dotenv'
dotenv.config()

async function globalSetup() {
  const browser: Browser = await chromium.launch({ headless: false })
  const context = await browser.newContext()
  const page: Page = await context.newPage()

  const user = process.env.PRIVATE_USER
  const pass = process.env.PRIVATE_PASSWORD
  const secret = process.env.PRIVATE_2FA_SECRET

  await page.goto('http://localhost:5173/auth/sign-in/')
  await page.getByRole('button', { name: 'Github' }).click()
  await page.getByLabel('Username or email address').fill(`${user}`)
  await page.getByLabel('Password').fill(`${pass}`)
  await page.getByRole('button', { name: 'Sign in' }).click()
  const totp = new TOTP({
    issuer: 'GitHub',
    label: `${user}`,
    algorithm: 'SHA1',
    digits: 6,
    period: 30,
    secret: `${secret}`,
  })
  const secretGenerated = totp.generate()
  await page.getByPlaceholder('XXXXXX').fill(`${secretGenerated}`)
  const button = page.getByRole('button', { name: 'Verify' })
  if ((await button.count()) > 0) {
    console.log({ button })
    button.click()
  }

  const urlString = page.url()
  const url = new URL(urlString)
  const stateUrl = url.searchParams.get('state')
  if (
    stateUrl ===
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTAyMjEyODcsInNpdGVfdXJsIjoiaHR0cDovL2xvY2FsaG9zdDo1MTczIiwiaWQiOiIwMDAwMDAwMC0wMDAwLTAwMDAtMDAwMC0wMDAwMDAwMDAwMDAiLCJmdW5jdGlvbl9ob29rcyI6bnVsbCwicHJvdmlkZXIiOiJnaXRodWIiLCJyZWZlcnJlciI6Imh0dHA6Ly9sb2NhbGhvc3Q6NDE3My9hdXRoL3NpZ24taW4vIiwiZmxvd19zdGF0ZV9pZCI6IiJ9.NWGn9yiRYniqwG6AXIFmIw-8NG8k9csdqTz12QSQc_g'
  ) {
    await page.getByRole('button', { name: 'Authorize thotluna' }).click()
  }

  // await new Promise((resolve) => setTimeout(resolve, 5000))

  await page.getByText('Dashboard Client:').click()

  expect(page.getByText('Dashboard Client:')).toBeVisible({
    timeout: 30000,
  })

  await page.context().storageState({ path: './LoginAuth.json' })
  await browser.close()
}

export default globalSetup
