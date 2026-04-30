import { test, expect } from "@playwright/test";
import { waitForHydration, waitForServiceWorker } from "../helpers";

test.describe("reload prompt", () => {
  test("shows offline-ready message on first service worker install", async ({
    page,
  }) => {
    await page.goto("/");
    await waitForHydration(page);
    await expect(page.getByRole("alert")).toBeVisible({ timeout: 15000 });
    await expect(page.getByRole("alert")).toContainText(
      "App ready to work offline",
    );
  });

  test("dismiss button hides the offline-ready message", async ({ page }) => {
    await page.goto("/");
    await waitForHydration(page);
    await expect(page.getByRole("alert")).toBeVisible({ timeout: 15000 });

    await page.getByRole("button", { name: "Dismiss" }).click();

    await expect(page.getByRole("alert")).not.toBeAttached();
  });

  test("prompt is not shown after service worker is already installed", async ({
    page,
  }) => {
    await page.goto("/");
    await waitForHydration(page);
    await expect(page.getByRole("alert")).toBeVisible({ timeout: 15000 });

    await page.reload();
    await waitForHydration(page);
    await waitForServiceWorker(page);

    await expect(page.getByRole("alert")).not.toBeAttached();
  });
});
