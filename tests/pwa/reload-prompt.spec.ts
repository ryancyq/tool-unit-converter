import { test, expect } from "@playwright/test";
import { waitForHydration, waitForServiceWorker } from "../helpers";

async function triggerSwUpdate(
  page: Parameters<typeof waitForServiceWorker>[0],
) {
  await page.route("**/sw.js", async (route) => {
    const response = await route.fetch();
    const body = await response.text();
    await route.fulfill({
      status: 200,
      contentType: "application/javascript",
      body: body + "\n",
    });
  });
  await page.evaluate(() =>
    navigator.serviceWorker.getRegistration().then((reg) => reg?.update()),
  );
}

test.describe("reload prompt", () => {
  test("shows update notification when a new version is available", async ({
    page,
  }) => {
    await page.goto("/");
    await waitForHydration(page);
    await waitForServiceWorker(page);

    await triggerSwUpdate(page);

    await expect(page.getByRole("alert")).toBeVisible({ timeout: 15000 });
    await expect(page.getByRole("alert")).toContainText(
      "A new version is available",
    );
  });

  test("dismiss button hides the update notification", async ({ page }) => {
    await page.goto("/");
    await waitForHydration(page);
    await waitForServiceWorker(page);

    await triggerSwUpdate(page);

    await expect(page.getByRole("alert")).toBeVisible({ timeout: 15000 });
    await page.getByRole("button", { name: "Dismiss" }).click();
    await expect(page.getByRole("alert")).not.toBeAttached();
  });
});
