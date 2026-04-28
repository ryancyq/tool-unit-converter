import { test, expect } from "@playwright/test";

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

  test("hamburger button is visible, nav links are hidden", async ({
    page,
  }) => {
    await page.goto("/");
    await expect(
      page.getByRole("button", { name: "Toggle menu" }),
    ).toBeVisible();
    for (const label of navLinks) {
      await expect(page.getByRole("link", { name: label })).toBeHidden();
    }
  });

  test("opens and closes menu on toggle", async ({ page }) => {
    await page.goto("/");
    const toggle = page.getByRole("button", { name: "Toggle menu" });
    await toggle.click();
    for (const label of navLinks) {
      await expect(page.getByRole("link", { name: label })).toBeVisible();
    }
    await toggle.click();
    for (const label of navLinks) {
      await expect(page.getByRole("link", { name: label })).toBeHidden();
    }
  });

  test("closes menu when a link is clicked", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: "Toggle menu" }).click();
    await page.getByRole("link", { name: "Length" }).click();
    await expect(page.getByRole("link", { name: "Length" })).toBeHidden();
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
      await expect(page.getByRole("link", { name: label })).toBeVisible();
    }
  });
});
