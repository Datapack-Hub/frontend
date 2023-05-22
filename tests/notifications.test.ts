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

test("notifications can be removed", async ({ page }) => {
  // check if it sent
  await page.goto("/notifications");
  await page.locator(".testNotif").first().waitFor()
  for (let i = 0; i < (await page.locator(".testNotif").count()); i++) {
    await page.getByRole("button").nth(i).click();
    await page.waitForResponse((res) => {
      return res.ok() && res.url().includes("/notifs/delete/");
    });
  }
  expect(await page.locator(".testNotif").count()).toEqual(0);
});

test("notification can be sent", async ({ page }) => {
  // goto page
  await page.goto("/user/hoodierocks/");

  await test.step("send notification", async () => {
    await page.locator("#send_notif").waitFor();
    // click it
    await page.locator("#send_notif").click();

    // wait for the notification modal to pop up
    await page.locator("#notif-message").waitFor();
    // type some data
    await page.locator("#notif-message").type("Test Test 123 **123** ~~123~~");

    // type more data
    await page.locator("#notif-content").type("Test Test 123 **123** ~~123~~");
    // select type
    await page.locator("#notif-type").selectOption("announcement");

    // send it!
    await page.locator("#send_notif_btn").click();
    await page.waitForResponse((res) => {
      return res.ok() && res.url().includes("/notifs/send/");
    });
  });

  await test.step("go to page", async () => {
    // check if it sent
    await page.goto("/notifications");
    await page.locator(".testNotif").first().waitFor();
  });

  expect(await page.locator(".testNotif").count()).toBeGreaterThan(0);
});
