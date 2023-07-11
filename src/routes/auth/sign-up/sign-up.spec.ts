import { test, expect } from '@playwright/test'
import { appNavigationClick } from '../../../shared/utils'

test.describe(`Testing Sing Up route`, async () => {
  test('Should be render the header Sign Up form', async ({ page }) => {
    await page.goto('/')
    await page.getByRole('link', { name: 'Sign Up' }).click()
    await expect(page).toHaveURL('/auth/sign-up/')
    await expect(page).toHaveTitle('Sign Up')

    await page.locator('header').getByRole('img').click()
    await page.getByRole('heading', { name: 'Sign Up' }).click()

    const message = page.getByText('Or sign in with user exist')
    expect(message).toHaveCount(1)

    await page.getByText('Or sign in with user exist').click()
    await expect(page).toHaveURL('/auth/sign-in/')
    await page.goBack()
    await expect(page).toHaveURL('/auth/sign-up/')
  })

  test(`should be render button Github`, async ({ page }) => {
    await page.goto('/auth/sign-up')
    await page.getByRole('button', { name: 'Github' }).click()
  })

  test(`should be render button google`, async ({ page }) => {
    await page.goto('/auth/sign-up')
    await page.getByRole('button', { name: 'Google' }).click()
  })

  test(`should be render form, input and button`, async ({ page }) => {
    await page.goto('/auth/sign-up')
    const signUpForm = page.locator(`form[data-test="sign-up"]`)
    await expect(signUpForm).toHaveCount(1)

    // const inputEmail = signUpForm.getByPlaceholder('your-email@example.com')
    const inputEmail = signUpForm.locator('input[type="text"]')
    await expect(inputEmail).toHaveCount(1)

    const notErrorInput = signUpForm.locator(
      'input[type="text"] + div [data-test="error"]'
    )
    await expect(notErrorInput).not.toBeVisible()

    // const terms = signUpForm.getByLabel('Agree to terms and conditions')
    const terms = signUpForm.locator('input[type="checkbox"]')
    await expect(terms).toHaveCount(1)

    const notErrorCheck = signUpForm.locator(
      'input[type="checkbox"] ~ div [data-test="error"]'
    )
    await expect(notErrorCheck).not.toBeVisible()

    const loginSubmit = signUpForm.locator(`button`)
    await expect(loginSubmit).toHaveCount(1)
  })

  test(`should be render email required error `, async ({ page }) => {
    await page.goto('/auth/sign-up')
    const signUpForm = page.locator(`form[data-test="sign-up"]`)
    const loginSubmit = signUpForm.locator(`button`)

    const invalidSubmit = await appNavigationClick({
      page,
      clickElm: loginSubmit,
      waitForPathResponse: '/auth/sign-up/',
    })

    expect(invalidSubmit.status).toBe(400)
    expect(invalidSubmit.method).toBe('POST')

    const error = signUpForm.locator(
      'input[type="text"] + div [data-test="error"]'
    )
    await expect(error).toHaveCount(1)
    await expect(error).toContainText(
      'String must contain at least 1 character(s)'
    )
  })

  test(`should be render input error invalid email`, async ({ page }) => {
    await page.goto('/auth/sign-up')
    const signUpForm = page.locator(`form[data-test="sign-up"]`)
    const inputEmail = signUpForm.locator('input[type="text"]')
    await expect(inputEmail).toHaveCount(1)

    await inputEmail.type('other')

    const loginSubmit = signUpForm.locator(`button`)
    const invalidSubmit = await appNavigationClick({
      page,
      clickElm: loginSubmit,
      waitForPathResponse: '/auth/sign-up/',
    })

    expect(invalidSubmit.status).toBe(400)
    expect(invalidSubmit.method).toBe('POST')
    const error = signUpForm.locator(
      'input[type="text"] + div [data-test="error"]'
    )
    await expect(error).toHaveCount(1)
    await expect(error).toContainText('Invalid email')
  })

  test(`should be render input checkbox error required`, async ({ page }) => {
    await page.goto('/auth/sign-up')
    const signUpForm = page.locator(`form[data-test="sign-up"]`)
    const terms = signUpForm.locator('input[type="checkbox"]')
    await expect(terms).toHaveCount(1)

    const loginSubmit = signUpForm.locator(`button`)
    const invalidSubmit = await appNavigationClick({
      page,
      clickElm: loginSubmit,
      waitForPathResponse: '/auth/sign-up/',
    })

    expect(invalidSubmit.status).toBe(400)
    expect(invalidSubmit.method).toBe('POST')
    const error = signUpForm.locator(
      'input[type="checkbox"] ~ div [data-test="error"]'
    )
    await expect(error).toHaveCount(1)
    await expect(error).toContainText('Required')
  })

  test(`should be send form sign in`, async ({ page }) => {
    await page.goto('/auth/sign-up')
    const signUpForm = page.locator(`form[data-test="sign-up"]`)
    const inputEmail = signUpForm.locator('input[type="text"]')
    await expect(inputEmail).toHaveCount(1)

    await inputEmail.type('other@example.com')

    const terms = signUpForm.locator('input[type="checkbox"]')
    await expect(terms).toHaveCount(1)
    await terms.click()

    const loginSubmit = signUpForm.locator(`button`)
    const invalidSubmit = await appNavigationClick({
      page,
      clickElm: loginSubmit,
      waitForPathResponse: '/auth/sign-up/',
    })

    expect(invalidSubmit.status).toBe(200)
    expect(invalidSubmit.method).toBe('POST')
    const inputError = signUpForm.locator(
      'input[type="text"] + div [data-test="error"]'
    )
    await expect(inputError).not.toBeVisible()
    const checkError = signUpForm.locator(
      'input[type="checkbox"] ~ div [data-test="error"]'
    )
    await expect(checkError).not.toBeVisible()
  })
})
