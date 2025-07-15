import { test, expect } from '@playwright/test';
import { LoginPage } from './loginPage';
import { invalidCredentials, emptyCredentials, lockedOutCredentials, problemUserCredentials } from './dataFactory';
import * as dotenv from 'dotenv';
dotenv.config();

const LOGIN_URL = process.env.LOGIN_URL!;

test.describe('Login Feature - Negative Scenarios', () => {
  test('[ @regression @ui ] Login fails with invalid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto(LOGIN_URL);
    const creds = invalidCredentials();
    await loginPage.login(creds.username, creds.password);
    await expect(page).toHaveURL(LOGIN_URL);
    // Error message is shown
    // If error message has a test id, use getByTestId. Otherwise, update POM to support this.
  });

  test('[ @edge @ui ] Login fails with empty credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto(LOGIN_URL);
    const creds = emptyCredentials();
    await loginPage.login(creds.username, creds.password);
    await expect(page).toHaveURL(LOGIN_URL);
  });

  test('[ @edge @ui ] Login fails for locked out user', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto(LOGIN_URL);
    const creds = lockedOutCredentials();
    await loginPage.login(creds.username, creds.password);
    await expect(page).toHaveURL(LOGIN_URL);
  });

  test('[ @edge @ui ] Login fails for problem user', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto(LOGIN_URL);
    const creds = problemUserCredentials();
    await loginPage.login(creds.username, creds.password);
    await expect(page).toHaveURL(LOGIN_URL);
  });
});
