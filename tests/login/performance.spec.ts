import { test, expect } from '@playwright/test';
import { LoginPage } from './loginPage';
import { validCredentials } from './dataFactory';
import * as dotenv from 'dotenv';
dotenv.config();

const LOGIN_URL = process.env.LOGIN_URL!;
const VALID_USERNAME = process.env.VALID_USERNAME!;
const VALID_PASSWORD = process.env.VALID_PASSWORD!;

const MAX_LOGIN_TIME_MS = 2000; // Example threshold for performance

test.describe('Login Feature - Performance Scenarios', () => {
  test('[ @performance ] Login response time is under acceptable threshold', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto(LOGIN_URL);
    const creds = validCredentials(VALID_USERNAME, VALID_PASSWORD);
    const start = Date.now();
    await loginPage.login(creds.username, creds.password);
    await loginPage.assertOnInventoryPage();
    const duration = Date.now() - start;
    expect(duration).toBeLessThanOrEqual(MAX_LOGIN_TIME_MS);
  });
});
