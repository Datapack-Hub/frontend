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

test("notifications can be removed", async ({ page }) => {
  // check if it sent
  await page.goto("/notifications", { timeout: 1000 });


  // attempts to match "https://api.datapackhub.net/notifs" with no sub-routes
  const res = await page.waitForResponse(async (res) => {
    const parts = res.url().split("/")
    return parts[3].includes("notifs")
  }, {timeout: 3000})

  // skip when no notifs exist
  if((await res.json()).result.length == 0) {
    test.skip()
  }

  for (let i = 0; i < (await page.locator(".testNotif").count()); i++) {
    await page.locator(".closeButton").first().click();
    const res = await page.waitForResponse((res) => {
      return res.url().includes("/notifs/delete/");
    }, { timeout: 2000 });
    expect(res.ok).toBeTruthy()
  }
  expect(await page.locator(".testNotif").count()).toEqual(0);
});

test("notification can be sent", async ({ page }) => {
  // goto page
  await page.goto("/user/hoodierocks/");

  await test.step("send notification", async () => {

    const notifBtn = page.locator("#send_notif")
    await notifBtn.waitFor({ timeout: 1000 });
    await notifBtn.click();

    await page.locator("#notif-message").waitFor({ timeout: 2000 });
    await page.locator("#notif-message").type("Test Test 123 **123** ~~123~~");

    await page.locator("#notif-content").type("Test Test 123 **123** ~~123~~");
    // select type
    await page.locator("#notif-type").selectOption("announcement");

    // send it!
    await page.locator("#send_notif_btn").click();
    const res = await page.waitForResponse((res) => {
      return res.url().includes("/notifs/send/");
    }, { timeout: 1500 });

    expect(res.ok).toBeTruthy()
  });

  await test.step("go to page", async () => {
    // check if it sent
    await page.goto("/notifications", { timeout: 1000 });
    await page.locator(".testNotif").first().waitFor({ timeout: 1500 });
    expect(await page.locator(".testNotif").count()).toBeGreaterThan(0);
  });
});
