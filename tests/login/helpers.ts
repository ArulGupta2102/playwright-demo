import { Page } from '@playwright/test';

// Add any shared helpers or cleanup utilities here
export async function resetAppState(page: Page) {
  // Example: clear cookies, localStorage, sessionStorage
  await page.context().clearCookies();
  await page.evaluate(() => {
    window.localStorage.clear();
    window.sessionStorage.clear();
  });
}
