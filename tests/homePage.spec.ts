import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:5173/');
});

test('Homepage validation', async ({ page }) => {
  await expect(page).toHaveTitle(/VibrA/);
  await expect(page.locator('h1')).toHaveText('Let’s vibe together!');
});


test('Verify that the registration modal is displayed', async ({ page }) => {
  await page.click('.create-account-btn a');

  const registrationModal = await page.locator('.register-box');
  await expect(registrationModal).toBeVisible();

  await expect(registrationModal).toContainText('Create an Account');
});
test('Should display the logo', async ({ page }) => {
  const logo = page.locator('.navbar-logo img');
  await expect(logo).toBeVisible();
});