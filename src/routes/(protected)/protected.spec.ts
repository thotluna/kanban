import test, { expect } from '@playwright/test'

test.describe(``, () => {
  test('should be redirect to sign in for unauthorized url ', async ({
    page,
  }) => {
    await page.goto('about:blank')
    await page.goto('/')
    await page.goto('/eladio.feijoo')

    await expect(page).toHaveURL('/auth/sign-in/')
  })
})
