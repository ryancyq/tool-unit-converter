import { test, expect } from "@playwright/test";
import { waitForHydration } from "./helpers";

const toolLabels = [
  "Length",
  "Weight",
  "Temperature",
  "Area",
  "Volume",
  "Speed",
  "Data",
  "Screen PPI",
];

test.describe("hamburger menu", () => {
  test("toggle button is visible and menu is initially hidden", async ({
    page,
  }) => {
    await page.goto("/");
    await expect(
      page.getByRole("button", { name: "Toggle menu" }),
    ).toBeVisible();
    await expect(page.getByTestId("nav-menu")).not.toBeAttached();
  });

  test("opens and closes on toggle", async ({ page }) => {
    await page.goto("/");
    await waitForHydration(page);
    const toggle = page.getByRole("button", { name: "Toggle menu" });
    await toggle.click();
    await expect(page.getByTestId("nav-menu")).toBeVisible();
    await toggle.click();
    await expect(page.getByTestId("nav-menu")).not.toBeAttached();
  });

  test("menu contains Home and all tool links", async ({ page }) => {
    await page.goto("/");
    await waitForHydration(page);
    await page.getByRole("button", { name: "Toggle menu" }).click();
    const menu = page.getByTestId("nav-menu");
    await expect(menu.getByRole("link", { name: "Home" })).toBeVisible();
    for (const label of toolLabels) {
      await expect(
        menu.getByRole("link", { name: label, exact: true }),
      ).toBeVisible();
    }
  });

  test("closes when a tool link is clicked", async ({ page }) => {
    await page.goto("/");
    await waitForHydration(page);
    await page.getByRole("button", { name: "Toggle menu" }).click();
    await page
      .getByTestId("nav-menu")
      .getByRole("link", { name: "Length" })
      .click();
    await expect(page.getByTestId("nav-menu")).not.toBeAttached();
  });
});

test.describe("desktop nav", () => {
  test.skip(({ isMobile }) => isMobile, "desktop only");

  test("hamburger toggle button is visible", async ({ page }) => {
    await page.goto("/");
    await expect(
      page.getByRole("button", { name: "Toggle menu" }),
    ).toBeVisible();
  });

  test("tool links are in the hamburger menu, not directly in the navbar", async ({
    page,
  }) => {
    await page.goto("/");
    await waitForHydration(page);
    for (const label of toolLabels) {
      await expect(
        page.locator("nav").getByRole("link", { name: label, exact: true }),
      ).not.toBeVisible();
    }
    await page.getByRole("button", { name: "Toggle menu" }).click();
    await expect(
      page.getByTestId("nav-menu").getByRole("link", { name: "Length" }),
    ).toBeVisible();
  });

  test("settings gear button opens the settings dropdown", async ({ page }) => {
    await page.goto("/");
    await waitForHydration(page);
    await expect(page.getByTestId("settings-dropdown")).not.toBeAttached();
    await page.getByRole("button", { name: "Settings" }).click();
    await expect(page.getByTestId("settings-dropdown")).toBeVisible();
  });

  test("settings dropdown closes on Escape", async ({ page }) => {
    await page.goto("/");
    await waitForHydration(page);
    await page.getByRole("button", { name: "Settings" }).click();
    await expect(page.getByTestId("settings-dropdown")).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(page.getByTestId("settings-dropdown")).not.toBeAttached();
  });

  test("settings dropdown closes when clicking outside", async ({ page }) => {
    await page.goto("/");
    await waitForHydration(page);
    await page.getByRole("button", { name: "Settings" }).click();
    await expect(page.getByTestId("settings-dropdown")).toBeVisible();
    await page.mouse.click(100, 400);
    await expect(page.getByTestId("settings-dropdown")).not.toBeAttached();
  });
});

test.describe("mobile nav", () => {
  test.skip(({ isMobile }) => !isMobile, "mobile only");

  test("settings icon navigates to the settings page", async ({ page }) => {
    await page.goto("/");
    await waitForHydration(page);
    await page.getByRole("link", { name: "Settings" }).click();
    await expect(page).toHaveURL("/settings");
  });
});
