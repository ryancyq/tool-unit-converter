import { test, expect } from "@playwright/test";
import { waitForHydration } from "./helpers";

test.describe("terms of service page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/tos");
    await waitForHydration(page);
  });

  test("renders with correct title", async ({ page }) => {
    await expect(page).toHaveTitle(/Terms of Service/);
  });

  test("renders content sections", async ({ page }) => {
    await expect(
      page.getByRole("heading", { name: "Terms of Service" }),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "Use of the app" }),
    ).toBeVisible();
    await expect(page.getByRole("heading", { name: "Accuracy" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Privacy" })).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "Disclaimer" }),
    ).toBeVisible();
  });

  test("back button returns to previous page", async ({ page: p, browser }) => {
    const page = await browser.newPage();
    await page.goto("/settings");
    await page.goto("/tos");
    await waitForHydration(page);
    await page.getByRole("button", { name: "Back" }).click();
    await expect(page).toHaveURL("/settings");
    await page.close();
  });
});
