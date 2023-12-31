import { test, expect } from '@playwright/test'
import { appNavigationClick } from '../../../shared/utils'
import dotenv from 'dotenv'
dotenv.config()

test.use({ storageState: './NoAuth.json' })
test.describe(`Testing Sing In route`, async () => {
  test('Should be render the header Sign In form', async ({ page }) => {
    await page.goto('about:blank')
    await page.goto('/')
    await page.getByRole('link', { name: 'Sign In' }).click()
    await expect(page).toHaveURL('/auth/sign-in/')
    await expect(page).toHaveTitle('Sign In')

    const logo = page.locator('header').getByTitle('logo')
    expect(logo).toBeVisible()
    await page.getByRole('heading', { name: 'Sign In' }).click()

    const message = page.getByText('Or sign in with your email')
    expect(message).toBeDefined()

    await page.getByText('Or sign up with new user').click()
    await expect(page).toHaveURL('/auth/sign-up/')
    await page.goBack()
    await expect(page).toHaveURL('/auth/sign-in/')

    await page.getByRole('button', { name: 'Github' }).click()
  })

  test(`should be render form, input and button`, async ({ page }) => {
    await page.goto('/auth/sign-in')
    const signInForm = page.locator(`form[data-test="sign-in"]`)
    await expect(signInForm).toHaveCount(1)

    const inputEmail = signInForm.locator('input')
    await expect(inputEmail).toHaveCount(1)

    const notError = signInForm.locator('[data-test="error"]')
    await expect(notError).not.toBeVisible()

    const loginSubmit = signInForm.locator(`button`)
    await expect(loginSubmit).toHaveCount(1)
  })

  test(`should be render email required error `, async ({ page }) => {
    await page.goto('/auth/sign-in')
    const signInForm = page.locator(`form[data-test="sign-in"]`)
    const loginSubmit = signInForm.locator(`button`)

    const invalidSubmit = await appNavigationClick({
      page,
      clickElm: loginSubmit,
      waitForPathResponse: '/auth/sign-in/',
    })

    expect(invalidSubmit.status).toBe(400)
    expect(invalidSubmit.method).toBe('POST')

    const error = signInForm.locator('[data-test="error"]')
    await expect(error).toHaveCount(1)
    await expect(error).toContainText(
      'String must contain at least 1 character(s)'
    )
  })

  test(`should be render input error invalid email`, async ({ page }) => {
    await page.goto('/auth/sign-in')
    const signInForm = page.locator(`form[data-test="sign-in"]`)
    const inputEmail = signInForm.locator('input')
    await expect(inputEmail).toHaveCount(1)

    await inputEmail.type('other')

    const loginSubmit = signInForm.locator(`button`)
    const invalidSubmit = await appNavigationClick({
      page,
      clickElm: loginSubmit,
      waitForPathResponse: '/auth/sign-in/',
    })

    expect(invalidSubmit.status).toBe(400)
    expect(invalidSubmit.method).toBe('POST')
    const error = signInForm.locator('[data-test="error"]')
    await expect(error).toHaveCount(1)
    await expect(error).toContainText('Invalid email')
  })

  test(`should be send form sign in`, async ({ page }) => {
    await page.goto('/auth/sign-in')
    const signInForm = page.locator(`form[data-test="sign-in"]`)
    const inputEmail = signInForm.locator('input')
    await expect(inputEmail).toHaveCount(1)

    await inputEmail.type('other@example.com')

    const loginSubmit = signInForm.locator(`button`)
    const invalidSubmit = await appNavigationClick({
      page,
      clickElm: loginSubmit,
      waitForPathResponse: '/auth/sign-in/',
    })

    expect(invalidSubmit.status).toBe(200)
    expect(invalidSubmit.method).toBe('POST')
    const notError = signInForm.locator('[data-test="error"]')
    await expect(notError).not.toBeVisible()
  })

  test.use({ storageState: './LoginAuth.json' })
  test('Should be sign in and sign out whit Github', async ({ page }) => {
    await page.goto('/')
    await page.getByRole('link', { name: 'Dashboard' }).click()
    await page.getByText('Dashboard Client:').click()
    await page.getByRole('button', { name: 'Sign Out' }).click()
    await expect(page).toHaveURL('/auth/sign-in/')
  })

  test('Should be initial sign in with google', async ({ page }) => {
    await page.goto('/')
    await page.getByRole('link', { name: 'Sign In' }).click()
    await page.getByRole('button', { name: 'Google' }).click()
    await page.getByText('Sign in with Google')
  })
})
