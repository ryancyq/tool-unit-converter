import { test, expect } from "@playwright/test";
import { waitForHydration } from "../helpers";

async function triggerSwUpdate(page: Parameters<typeof waitForHydration>[0]) {
  await page.evaluate(() => (window as any).__setNeedRefresh(true));
}

test.describe("reload prompt", () => {
  test("shows update notification when a new version is available", async ({
    page,
  }) => {
    await page.goto("/");
    await waitForHydration(page);

    await triggerSwUpdate(page);

    await expect(page.getByRole("alert")).toBeVisible();
    await expect(page.getByRole("alert")).toContainText(
      "A new version is available",
    );
  });

  test("dismiss button hides the update notification", async ({ page }) => {
    await page.goto("/");
    await waitForHydration(page);

    await triggerSwUpdate(page);

    await expect(page.getByRole("alert")).toBeVisible();
    await page.getByRole("button", { name: "Dismiss" }).click();
    await expect(page.getByRole("alert")).not.toBeAttached();
  });
});
