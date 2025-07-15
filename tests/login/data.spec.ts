import { test, expect } from '@playwright/test';
import { LoginPage } from './loginPage';
import { validCredentials, invalidCredentials } from './dataFactory';
import * as dotenv from 'dotenv';
dotenv.config();

const LOGIN_URL = process.env.LOGIN_URL!;
const VALID_USERNAME = process.env.VALID_USERNAME!;
const VALID_PASSWORD = process.env.VALID_PASSWORD!;

const credentialSets = [
  validCredentials(VALID_USERNAME, VALID_PASSWORD),
  invalidCredentials(),
  { username: 'locked_out_user', password: 'secret_sauce' },
  { username: 'problem_user', password: 'secret_sauce' },
];

test.describe('Login Feature - Data-Driven Scenarios', () => {
  for (const creds of credentialSets) {
    test(`[ @data ] Login attempt with username: ${creds.username}`, async ({ page }) => {
      const loginPage = new LoginPage(page);
      await loginPage.goto(LOGIN_URL);
      await loginPage.login(creds.username, creds.password);
      if (creds.username === VALID_USERNAME && creds.password === VALID_PASSWORD) {
        await loginPage.assertOnInventoryPage();
      } else {
        await expect(page).toHaveURL(LOGIN_URL);
      }
    });
  }
});
