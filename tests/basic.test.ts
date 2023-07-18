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

test("page loads", async ({ page }) => {
  const res = await page.goto("/");
  expect(res?.status()).toEqual(200);
});

test("projects load", async ({ page }) => {
  const res = await page.goto("/projects");
  expect(res?.status()).toEqual(200);
});

test("project can be located and fetched", async ({ page }) => {
  const res = await page.goto("/project/taglib/");
  expect(res?.status()).toEqual(200);
});

test("user can be fetched and located", async ({ page }) => {
  const res = await page.goto("/user/silabear/");
  expect(res?.status()).toEqual(200);
});
