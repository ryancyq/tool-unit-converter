import { test, expect } from "@playwright/test";
import { waitForHydration } from "./helpers";

const navLinks = [
  "Length",
  "Weight",
  "Temperature",
  "Area",
  "Volume",
  "Speed",
  "Data",
  "Screen PPI",
];

test.describe("mobile nav", () => {
  test.use({ viewport: { width: 390, height: 844 } });

  test("hamburger button is visible, mobile menu is hidden", async ({
    page,
  }) => {
    await page.goto("/");
    await expect(
      page.getByRole("button", { name: "Toggle menu" }),
    ).toBeVisible();
    await expect(page.getByTestId("mobile-menu")).not.toBeAttached();
  });

  test("opens and closes menu on toggle", async ({ page }) => {
    await page.goto("/");
    await waitForHydration(page);
    const toggle = page.getByRole("button", { name: "Toggle menu" });
    await toggle.click();
    await expect(page.getByTestId("mobile-menu")).toBeVisible();
    await toggle.click();
    await expect(page.getByTestId("mobile-menu")).not.toBeAttached();
  });

  test("closes menu when a link is clicked", async ({ page }) => {
    await page.goto("/");
    await waitForHydration(page);
    await page.getByRole("button", { name: "Toggle menu" }).click();
    await page
      .getByTestId("mobile-menu")
      .getByRole("link", { name: "Length" })
      .click();
    await expect(page.getByTestId("mobile-menu")).not.toBeAttached();
  });
});

test.describe("desktop nav", () => {
  test.use({ viewport: { width: 1280, height: 800 } });

  test("nav links are visible, hamburger button is hidden", async ({
    page,
  }) => {
    await page.goto("/");
    await expect(
      page.getByRole("button", { name: "Toggle menu" }),
    ).toBeHidden();
    for (const label of navLinks) {
      await expect(
        page.locator("nav").getByRole("link", { name: label, exact: true }),
      ).toBeVisible();
    }
  });
});
