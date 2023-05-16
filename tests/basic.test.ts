import { expect, test } from "@playwright/test";
import { config } from "dotenv";

config();

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

test("projects load",async ({ page }) => {
  const res = await page.goto("/projects")
  expect(res?.status()).toEqual(200);
})

test("project can be located and fetched", async ({ page }) => {
  const res = await page.goto("/project/realistic-item-drops/");
  expect(res?.status()).toEqual(200);
});

test("user can be fetched and located", async ({ page }) => {
  const res = await page.goto("/user/silabear/");
  expect(res?.status()).toEqual(200);
});

test("notification can be sent", async ({ page }) => {
  // goto page
  await page.goto("/user/hoodierocks/");

  // wait for user moderation to mount to DOM
  await page.locator("#send_notif").waitFor({ state: "attached", timeout: 5000 });
  // click it
  await page.locator("#send_notif").click();

  // wait for the notification modal to pop up
  await page.locator("#notif-message").waitFor({ state: "attached", timeout: 2000 })
  // type some data
  await page.locator("#notif-message").type("Test Test 123 **123** ~~123~~")

  // type more data
  await page.locator("#notif-content").type("Test Test 123 **123** ~~123~~")
  // select type
  await page.locator("#notif-type").selectOption("announcement")

  // send it!
  await page.locator("#send_notif_btn").click()

  // check if it sent
  await page.goto("/notifications")
  await page.locator(".testNotif").waitFor();

  expect(await page.locator(".testNotif").count()).toBeGreaterThan(0)

});
