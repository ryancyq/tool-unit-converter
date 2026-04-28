import { test, expect } from "@playwright/test";

test("home page lists all tools", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle(/Conversion Tools/);

  const tools = [
    "Length",
    "Weight",
    "Temperature",
    "Area",
    "Volume",
    "Speed",
    "Data",
    "Screen PPI",
  ];
  for (const tool of tools) {
    await expect(page.getByText(tool, { exact: false }).first()).toBeVisible();
  }
});
