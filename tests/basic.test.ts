import { expect, test } from "@playwright/test";
import { config } from "dotenv";

test.beforeAll(() => {
  config();
})

test.beforeEach(async ({ page }) => {
  const token = process.env.UNLIGHTHOUSE_DPH_TOKEN;
  if (token) {
    await page.context().addCookies([
      {
        name: "dph_token",
        value: token,
        url: "https://localhost:4173/",
      },
    ]);
    await page.reload();
  }
});

test("all pages load", async ({ page }) => {
  const pages = [
    '/staff',
    '/rules',
    '/user/silabear',
    '/project/taglib',
    '/projects',
    '/notifications',
    '/moderation',
    '/moderation/console',
    '/jam',
    '/privacy',
    '/settings',
    '/install',
    '/login',
    '/'
  ]

  for (const p of pages) {
    await test.step(`testing if ${p} loads properly`, async () => {
      const res = await page.goto(p);
      expect(res?.status()).toEqual(200);
    })
  }
});
