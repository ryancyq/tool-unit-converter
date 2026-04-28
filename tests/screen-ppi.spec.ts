import { test, expect } from "@playwright/test";

test.describe("Screen PPI calculator", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/screen-ppi");
    await page.waitForLoadState("networkidle");
  });

  test("shows no result when inputs are empty", async ({ page }) => {
    await expect(page.locator("#ppi-result")).not.toBeVisible();
  });

  test("calculates PPI from manual input", async ({ page }) => {
    await page.fill("#horiz-res", "1920");
    await page.fill("#vert-res", "1080");
    await page.fill("#diagonal", "24");
    await expect(page.locator("#ppi-result")).toContainText("91.8");
  });

  test('applies Apple MacBook Air 13" preset', async ({ page }) => {
    await page.selectOption("#preset", {
      label: 'MacBook Air 13" (M2/M3) — 2560 × 1664',
    });
    await expect(page.locator("#horiz-res")).toHaveValue("2560");
    await expect(page.locator("#vert-res")).toHaveValue("1664");
    await expect(page.locator("#diagonal")).toHaveValue("13.6");
    await expect(page.locator("#ppi-result")).toContainText("224.5");
  });

  test("shows Retina tier for high-PPI display", async ({ page }) => {
    await page.selectOption("#preset", {
      label: 'MacBook Air 13" (M2/M3) — 2560 × 1664',
    });
    await expect(page.locator("text=Sharp at Retina resolution")).toBeVisible();
  });

  test("shows standard resolution tier for low-PPI display", async ({
    page,
  }) => {
    await page.fill("#horiz-res", "1920");
    await page.fill("#vert-res", "1080");
    await page.fill("#diagonal", "24");
    await expect(
      page.locator("text=Sharp at standard resolution"),
    ).toBeVisible();
  });

  test("shows blurry warning for mid-range PPI (130–200)", async ({ page }) => {
    await page.fill("#horiz-res", "2560");
    await page.fill("#vert-res", "1440");
    await page.fill("#diagonal", "22");
    await expect(page.locator("text=May look blurry")).toBeVisible();
  });

  test("switches diagonal unit to cm", async ({ page }) => {
    await page.fill("#horiz-res", "1920");
    await page.fill("#vert-res", "1080");
    await page.click("button:has-text('cm')");
    await page.fill("#diagonal", "61");
    await expect(page.locator("#ppi-result")).toContainText("91.");
  });
});
