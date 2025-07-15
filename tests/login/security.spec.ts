import { test, expect } from '@playwright/test';
import { LoginPage } from './loginPage';
import * as dotenv from 'dotenv';
dotenv.config();

const LOGIN_URL = process.env.LOGIN_URL!;

const sqlInjectionPayloads = [
  "' OR '1'='1' --",
  'admin" --',
  '" OR "1"="1',
  '1=1;--',
];

const xssPayloads = [
  '<script>alert(1)</script>',
  '" onmouseover=alert(1) "',
];

test.describe('Login Feature - Security Scenarios', () => {
  for (const payload of sqlInjectionPayloads) {
    test(`[ @security @edge ] Login fails with SQL injection payload: ${payload}`, async ({ page }) => {
      const loginPage = new LoginPage(page);
      await loginPage.goto(LOGIN_URL);
      await loginPage.login(payload, payload);
      await expect(page).toHaveURL(LOGIN_URL);
    });
  }

  for (const payload of xssPayloads) {
    test(`[ @security ] Login fails with XSS payload: ${payload}`, async ({ page }) => {
      const loginPage = new LoginPage(page);
      await loginPage.goto(LOGIN_URL);
      await loginPage.login(payload, payload);
      await expect(page).toHaveURL(LOGIN_URL);
    });
  }
});
