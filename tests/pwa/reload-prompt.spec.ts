import { test, expect, type Page } from "@playwright/test";
import { waitForHydration, waitForServiceWorker } from "../helpers";

async function setupSwUpdateRoute(page: Page) {
  let swFetchCount = 0;
  await page.context().route("**/sw.js", async (route) => {
    swFetchCount++;
    if (swFetchCount === 1) {
      return route.continue(); // initial registration — serve real sw.js (v1)
    }
    const response = await route.fetch();
    const body = await response.text();
    await route.fulfill({
      status: 200,
      contentType: "application/javascript",
      body: body + "\n", // byte-different → triggers updatefound
    });
  });
}

test.describe("reload prompt", () => {
  test("shows update notification when a new version is available", async ({
    page,
  }) => {
    await setupSwUpdateRoute(page);
    await page.goto("/");
    await waitForHydration(page);
    await waitForServiceWorker(page);

    await expect(page.getByRole("alert")).toBeVisible({ timeout: 15000 });
    await expect(page.getByRole("alert")).toContainText(
      "A new version is available",
    );
  });

  test("dismiss button hides the update notification", async ({ page }) => {
    await setupSwUpdateRoute(page);
    await page.goto("/");
    await waitForHydration(page);
    await waitForServiceWorker(page);

    await expect(page.getByRole("alert")).toBeVisible({ timeout: 15000 });
    await page.getByRole("button", { name: "Dismiss" }).click();
    await expect(page.getByRole("alert")).not.toBeAttached();
  });
});
