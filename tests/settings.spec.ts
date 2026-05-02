import { test, expect } from "@playwright/test";
import { waitForHydration } from "./helpers";
import { STORAGE_KEY } from "../src/lib/config";

test.describe("settings page", () => {
  test("renders unit system options and offline toggle", async ({ page }) => {
    await page.goto("/settings");
    await waitForHydration(page);
    await expect(page.getByRole("button", { name: "Default" })).toBeVisible();
    await expect(
      page.getByRole("button", { name: "Metric / SI" }),
    ).toBeVisible();
    await expect(page.getByRole("button", { name: "Imperial" })).toBeVisible();
    await expect(page.getByRole("switch")).toBeVisible();
  });

  test("back button returns to previous page", async ({ page }) => {
    await page.goto("/");
    await page.goto("/settings");
    await waitForHydration(page);
    await page.getByRole("button", { name: "Back" }).click();
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

  test("unit system change is written to localStorage under STORAGE_KEY", async ({
    page,
  }) => {
    await page.goto("/settings");
    await waitForHydration(page);
    await page.getByRole("button", { name: "Imperial" }).click();
    const raw = await page.evaluate(
      (key) => localStorage.getItem(key),
      STORAGE_KEY,
    );
    expect(raw).not.toBeNull();
    expect(JSON.parse(raw!)).toMatchObject({ unitSystem: "imperial" });
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
