import { expect, test } from "@playwright/test";
import { config } from "dotenv";

test.beforeAll(() => {
  config();
});

test.beforeEach(async ({ page }) => {
  const token = process.env.TESTING_TOKEN;
  if (token) {
    await page.context().addCookies([
      {
        name: "dph_token",
        value: token,
        url: "https://localhost:4173/"
      }
    ]);
    await page.reload();
  }
});

test("notifications can be removed", async ({ page }) => {
  // check if it sent
  await page.goto("/notifications", { timeout: 2000 });

  // attempts to match "https://api.datapackhub.net/notifs" with no sub-routes
  const response = await page.waitForResponse(
    async response => {
      const parts = response.url().split("/");
      return parts[3].includes("notifs") && response.ok();
    },
    { timeout: 3000 }
  );

  // skip when no notifs exist
  if ((await response.json()).result.length == 0) {
    test.skip();
  }

  await page.locator(".testNotif").first().waitFor({ timeout: 2000 });

  for (const btn of await page.locator(".closeButton").all()) {
    await btn.click({ timeout: 1000 });
    const response = await page.waitForResponse(
      response => {
        return response.url().includes("/notifs/delete/") && response.ok();
      },
      { timeout: 2000 }
    );
    expect(response.ok).toBeTruthy();
  }

  expect(await page.locator(".testNotif").count()).toBeLessThanOrEqual(1);
});

test("notification can be sent", async ({ page }) => {
  // goto page
  await page.goto("/user/hoodierocks/");

  await test.step("send notification", async () => {
    const modBtn = page.locator(".modBtn");
    await modBtn.waitFor({ timeout: 1000 });
    await modBtn.click();

    const notifBtn = page.locator("#send_notif");
    await notifBtn.waitFor({ timeout: 1500 });
    await notifBtn.click();

    await page.locator("#notif-message").waitFor({ timeout: 2000 });
    await page.locator("#notif-message").type("Test Test 123 **123** ~~123~~");

    await page.locator("#notif-content").type("Test Test 123 **123** ~~123~~");
    // select type
    await page.locator("#notif-type").selectOption("announcement");

    // send it!
    await page.locator("#send_notif_btn").click({ timeout: 1500 });
    const response = await page.waitForResponse(
      response => {
        return response.url().includes("/notifs/send/") && response.ok();
      },
      { timeout: 1500 }
    );

    expect(response.ok).toBeTruthy();
  });

  await test.step("go to page", async () => {
    // check if it sent
    await page.goto("/notifications", { timeout: 1000 });
    await page.locator(".testNotif").first().waitFor({ timeout: 1500 });
    expect(await page.locator(".testNotif").count()).toBeGreaterThan(0);
  });
});
