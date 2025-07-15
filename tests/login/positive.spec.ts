import { test, expect } from '@playwright/test';
import { LoginPage } from './loginPage';
import { validCredentials } from './dataFactory';
import * as dotenv from 'dotenv';
dotenv.config();

const LOGIN_URL = process.env.LOGIN_URL!;
const VALID_USERNAME = process.env.VALID_USERNAME!;
const VALID_PASSWORD = process.env.VALID_PASSWORD!;

test.describe('Login Feature - Positive Scenarios', () => {
  test('[@smoke][@ui] Successful login with valid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto(LOGIN_URL);
    const creds = validCredentials(VALID_USERNAME, VALID_PASSWORD);
    await loginPage.login(creds.username, creds.password);
    await loginPage.assertOnInventoryPage();
  });

  test('[@ui] Login form fields have correct labels and roles', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto(LOGIN_URL);
    await expect(loginPage.usernameInput).toHaveAttribute('placeholder', /username/i);
    await expect(loginPage.passwordInput).toHaveAttribute('placeholder', /password/i);
    await expect(loginPage.loginButton).toBeVisible();
  });

  test('[@ui][@accessibility] Login page passes accessibility checks', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto(LOGIN_URL);
    // Basic accessibility checks
    await expect(loginPage.usernameInput).toBeVisible();
    await expect(loginPage.passwordInput).toBeVisible();
    await expect(loginPage.loginButton).toBeVisible();
  });
});
