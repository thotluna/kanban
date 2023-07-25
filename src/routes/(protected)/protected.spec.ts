import test, { expect } from '@playwright/test'

test.describe(`Routes protected testing`, () => {
  test('should be redirect to sign in for unauthorized url ', async ({
    page,
    context,
  }) => {
    context.clearCookies()
    await page.goto('/thotluna.test/')

    await expect(page).toHaveURL('/auth/sign-in/')
  })

  test('should access the users dashboard', async ({ page }) => {
    await page.goto('/')
    await page.getByRole('link', { name: 'Dashboard' }).click()
    await expect(page).toHaveURL('/thotluna.test/')
    await page.goto('/thot')
    await expect(page).toHaveURL('/thotluna.test/')
  })
})
