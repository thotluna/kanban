import type { Browser, Page } from '@playwright/test'
import { chromium, expect } from '@playwright/test'
import { TOTP } from 'otpauth'
import dotenv from 'dotenv'
dotenv.config()

async function globalSetup() {
  const browser: Browser = await chromium.launch({ headless: true })
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
  const btn = page.getByRole('button', { name: 'Verify' })
  if ((await btn.count()) > 0) {
    await btn.click()
  }

  const verifyBtn = await page.getByText('Authorize thot-test')

  if ((await verifyBtn.count()) > 0) {
    await verifyBtn.click()
  }

  await page.getByText('Dashboard Client:').click()

  expect(page.getByText('Dashboard Client:')).toBeVisible({
    timeout: 30000,
  })

  await page.context().storageState({ path: './LoginAuth.json' })
  await browser.close()
}

export default globalSetup
