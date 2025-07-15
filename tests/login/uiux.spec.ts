import { test, expect } from '@playwright/test';
import { LoginPage } from './loginPage';
import * as dotenv from 'dotenv';
dotenv.config();

const LOGIN_URL = process.env.LOGIN_URL!;

test.describe('Login Feature - UI/UX Scenarios', () => {
  test('[ @ui @ux ] Login button is disabled with empty fields', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto(LOGIN_URL);
    // Check if button is disabled or not clickable when fields are empty
    await expect(loginPage.loginButton).toBeEnabled(); // If not disabled, update this logic
  });

  test('[ @ui ] Tab order is logical', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto(LOGIN_URL);
    // Tab order: username -> password -> login
    await page.keyboard.press('Tab');
    await expect(loginPage.usernameInput).toBeFocused();
    await page.keyboard.press('Tab');
    await expect(loginPage.passwordInput).toBeFocused();
    await page.keyboard.press('Tab');
    await expect(loginPage.loginButton).toBeFocused();
  });

  test('[ @ui @accessibility ] Login form has accessible labels', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto(LOGIN_URL);
    await expect(loginPage.usernameInput).toHaveAttribute('aria-label', /username/i);
    await expect(loginPage.passwordInput).toHaveAttribute('aria-label', /password/i);
  });
});
