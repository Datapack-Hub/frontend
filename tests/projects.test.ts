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

test("project can be located and fetched", async ({ page }) => {
  const response = await page.goto("/project/hexenwerk/", { timeout: 2000 });
  expect(response?.status()).toEqual(200);
});

test("project downloads work", async ({ page }) => {
  await page.goto("/project/hexenwerk/", { timeout: 3000 });

  const downloadBtn = page.getByLabel("Download");

  await downloadBtn.waitFor({ timeout: 3000 });
  await downloadBtn.click();

  // get button labeled 1.19.4
  const versionBtn = page.locator('[data-test-btn="1.19.4"]');

  await versionBtn.waitFor({ timeout: 2000 });
  await versionBtn.click();

  const downloadPromise = page.waitForEvent("download", { timeout: 4000 });
  // get actual download button
  const actualDownload = page.locator('[data-test-clickable-label="datapack"]');

  await actualDownload.waitFor({ timeout: 4000 });
  await actualDownload.click();

  const download = await downloadPromise;
  await download.saveAs("test-results/downloads/hexenwerk.zip");
});

test("project reports work", async ({ page }) => {
  await page.goto("/project/hexenwerk/", { timeout: 3000 })

  await page.getByLabel("Report").click()

  await page
    .locator("#report-description")
    .type("This report was created by a Playwright test, you may dismiss this report.");

  await page.locator(".sendReportBtn").click()
  await page.waitForResponse(response => {
    return response.url().includes("/report") && response.ok()
  }, { timeout: 2000 })

  await page.goto("/moderation", { timeout: 3000 })
  await page.getByText("Reports").click()

  const reportCount = await page.locator(".reports").count()

  if (reportCount > 1) {
    console.log("Clear reports, then rerun")
    test.skip()
  }

  expect(reportCount).toBe(1)

  await page.getByTestId("remove-report-btn").first().click()
  await page.waitForResponse(response => {
    return response.url().includes("/remove_report/1") && response.ok()
  }, { timeout: 2000 })

  expect(await page.locator(".reports").count()).toBe(0)

})
