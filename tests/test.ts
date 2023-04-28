import { expect, test } from '@playwright/test';

test('page loads', async ({ page }) => {
	const res = await page.goto('/');
	expect(res?.status()).toEqual(200);
});

test('sign in button exists', async ({ page }) => {
  await page.goto('/');
	expect(page.locator("#sign_in")).toBeDefined();
});

test('redirects to sign in', async ({ page }) => {
  await page.goto('/');
  await page.click("#sign_in")
  expect(page.url()).toContain("github");
});