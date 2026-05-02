import { test, expect } from "@playwright/test";
import { waitForHydration } from "./helpers";

test.describe("settings page", () => {
  test("renders heading and unit system options", async ({ page }) => {
    await page.goto("/settings");
    await waitForHydration(page);
    await expect(page.getByRole("heading", { name: "Settings" })).toBeVisible();
    await expect(page.getByRole("button", { name: "Default" })).toBeVisible();
    await expect(
      page.getByRole("button", { name: "Metric / SI" }),
    ).toBeVisible();
    await expect(page.getByRole("button", { name: "Imperial" })).toBeVisible();
  });

  test("back button returns to home", async ({ page }) => {
    await page.goto("/settings");
    await waitForHydration(page);
    await page.getByRole("link", { name: "Back" }).click();
    await expect(page).toHaveURL("/");
  });

  test("unit system selection persists to converter pages", async ({
    page,
  }) => {
    await page.goto("/settings");
    await waitForHydration(page);
    await page.getByRole("button", { name: "Imperial" }).click();
    await page.goto("/weight");
    await waitForHydration(page);
    await expect(page.locator("#from-unit")).toHaveValue("lb");
  });

  test("selected unit system is highlighted", async ({ page }) => {
    await page.goto("/settings");
    await waitForHydration(page);
    await page.getByRole("button", { name: "Metric / SI" }).click();
    await expect(page.getByRole("button", { name: "Metric / SI" })).toHaveClass(
      /border-sky-600/,
    );
  });
});

test.describe("settings dropdown", () => {
  test.skip(({ isMobile }) => isMobile, "desktop only");

  test("renders unit system and offline toggle", async ({ page }) => {
    await page.goto("/");
    await waitForHydration(page);
    await page.getByRole("button", { name: "Settings" }).click();
    const dropdown = page.getByTestId("settings-dropdown");
    await expect(dropdown.getByText("Unit system")).toBeVisible();
    await expect(dropdown.getByText("Available offline")).toBeVisible();
  });

  test("unit system selection persists to converter pages", async ({
    page,
  }) => {
    await page.goto("/");
    await waitForHydration(page);
    await page.getByRole("button", { name: "Settings" }).click();
    await page
      .getByTestId("settings-dropdown")
      .getByRole("button", { name: "Imperial" })
      .click();
    await page.goto("/weight");
    await waitForHydration(page);
    await expect(page.locator("#from-unit")).toHaveValue("lb");
  });
});
