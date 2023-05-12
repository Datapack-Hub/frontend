import { expect, test, type Page } from '@playwright/test';
import { config } from 'dotenv'

config()

test('page loads', async ({ page }) => {
	const res = await page.goto('/');
	expect(res?.status()).toEqual(200);
});

async function loadToken(page: Page) {
  const token = process.env.UNLIGHTHOUSE_DPH_TOKEN
  if (token) {
    await page.context().addCookies([{
      name: "dph_token",
      value: token,
      url: "https://datapackhub.net"
    }])
    await page.reload()
  }
}
