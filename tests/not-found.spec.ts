import { test, expect } from "@playwright/test";
import { waitForHydration } from "./helpers";
import { APP_NAME } from "../src/lib/config";

test.describe("not found page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/not-found");
    await waitForHydration(page);
  });

  test("renders 404 with correct title", async ({ page }) => {
    await expect(page).toHaveTitle(new RegExp(`Page Not Found.*${APP_NAME}`));
    await expect(page.getByText("404")).toBeVisible();
    await expect(page.getByText("This page doesn't exist.")).toBeVisible();
  });

  test("back to home link navigates to home", async ({ page }) => {
    await page.getByRole("link", { name: "Back to home" }).click();
    await expect(page).toHaveURL("/");
  });
});
