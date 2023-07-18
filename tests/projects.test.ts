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

test("project can be located and fetched", async ({ page }) => {
  const res = await page.goto("/project/hexenwerk/");
  expect(res?.status()).toEqual(200);
});

test("project page tabs work", async ({ page }) => {
  await page.goto("/project/hexenwerk/");
  const tabs = [page.getByLabel("Description"), page.getByLabel("Comments"), page.getByLabel("Download")]

  let pageContent = await page.content()

  for (const tab of tabs) {
    await tab.click()
    await page.waitForLoadState("load", {timeout: 1000})
    const currentContent = await page.content()
    expect(currentContent).not.toEqual(pageContent)
    pageContent = currentContent
  }
});

test("project downloads work", async ({ page }) => {
  await page.goto("/project/hexenwerk/");

  const downloadBtn = page.getByLabel("Download")
  await downloadBtn.waitFor({ timeout: 1000 })
  await downloadBtn.click()

  const button = page.locator('[data-test-btn="1.19.4"]')
  await button.waitFor({ timeout: 1000 })
  await button.click()

  const downloadPromise = page.waitForEvent("download")
  const actualDownload = page.locator('[data-test-clickable-label="datapack"]')
  await actualDownload.waitFor({ timeout: 1000 })
  await actualDownload.click()
  const download = await downloadPromise
  await download.saveAs("test-results/downloads/hexenwerk.zip")
});
