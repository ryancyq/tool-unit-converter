import { test, expect } from "@playwright/test";
import { waitForHydration } from "./helpers";

test("home page lists all tools", async ({ page }) => {
  await page.goto("/");
  await waitForHydration(page);
  await expect(page).toHaveTitle(/Unit Conversion Tool/);

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
    await expect(
      page.locator("main").getByText(tool, { exact: false }),
    ).toBeVisible();
  }
});
