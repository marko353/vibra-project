import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173/');
    await page.locator('.navbar-login a').click();
});

test('Login modal should appear when clicking the login button', async ({ page }) => {

    const modal = await page.locator('.login-box');

    await expect(modal).toBeVisible();
    await expect(modal).toContainText('Welcome!');
    const signInButton = page.locator('button', { hasText: 'Sign In' });
    await expect(signInButton).toBeVisible();
});
test('Should show validation errors when submitting empty login form', async ({ page }) => {
    const signInButton = page.locator('button', { hasText: 'Sign In' });
    await signInButton.click();
  
    const emailError = page.locator('.error-message', { hasText: 'Invalid email address' });
    const passwordError = page.locator('.error-message', { hasText: 'Password must be at least 6 characters' });
  
    await expect(emailError).toBeVisible();
    await expect(passwordError).toBeVisible();
  });
  test('Should show error when password is too short', async ({ page }) => {
    await page.locator('input[type="email"]').fill('test129353@gmail.com');
    await page.locator('input[type="password"]').fill('test'); 
    await page.locator('button', { hasText: 'Sign In' }).click();
  
    const passwordError = page.locator('.error-message', { hasText: 'Password must be at least 6 characters' });
    await expect(passwordError).toBeVisible();
  });
  test('Should successfully login with valid credentials', async ({ page }) => {
    await page.locator('input[type="email"]').fill('test129353@gmail.com');
    await page.locator('input[type="password"]').fill('Test123!');
    await page.locator('button', { hasText: 'Sign In' }).click();
  
    // Primer: posle uspešnog login-a vidiš dashboard
    await expect(page).toHaveURL(/.*chatDashboard/);
   
  });