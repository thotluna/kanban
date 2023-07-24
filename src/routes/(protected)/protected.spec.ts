import test, { expect } from '@playwright/test'
import { signInTest } from '../auth/sign-in/sign-in-function'

test.describe(`Routes protected testing`, () => {
  test('should be redirect to sign in for unauthorized url ', async ({
    page,
  }) => {
    await page.goto('/')
    await page.goto('/thotluna.test/')

    await expect(page).toHaveURL('/auth/sign-in/')
  })

  test('should access the users dashboard', async ({ page }) => {
    await page.goto('/')
    await signInTest(page)
    await page.getByRole('link', { name: 'Dashboard' }).click()
    await expect(page).toHaveURL('/thotluna.test/')
  })

  test('should do not access the users dashboard', async ({ page }) => {
    await page.goto('/')
    await signInTest(page)
    await expect(page).toHaveURL('/thotluna.test/')
    await page.goto('/thot')
    await expect(page).toHaveURL('/thotluna.test/')
  })
})
