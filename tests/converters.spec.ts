import { test, expect, type Page } from "@playwright/test";
import { waitForHydration } from "./helpers";

async function convert(
  page: Page,
  path: string,
  value: string,
  expectedResult: string,
  expectedUnit: string,
) {
  await page.goto(path);
  await waitForHydration(page);
  await page.fill("#value-input", value);
  await expect(page.locator("#result-output")).toContainText(expectedResult);
  await expect(page.locator("#result-output")).toContainText(expectedUnit);
}

test.describe("Length converter", () => {
  test("loads with default m → ft units", async ({ page }) => {
    await page.goto("/length");
    await expect(page.locator("#from-unit")).toHaveValue("m");
    await expect(page.locator("#to-unit")).toHaveValue("ft");
  });

  test("converts 1 m to feet", async ({ page }) => {
    await convert(page, "/length", "1", "3.28084", "ft");
  });

  test("swaps units", async ({ page }) => {
    await page.goto("/length");
    await waitForHydration(page);
    await page.fill("#value-input", "1");
    await page.click('button[title="Swap units"]');
    await expect(page.locator("#from-unit")).toHaveValue("ft");
    await expect(page.locator("#to-unit")).toHaveValue("m");
    await expect(page.locator("#result-output")).toContainText("0.3048");
    await expect(page.locator("#result-output")).toContainText("m");
  });
});

test.describe("Weight converter", () => {
  test("loads with default kg → lb units", async ({ page }) => {
    await page.goto("/weight");
    await expect(page.locator("#from-unit")).toHaveValue("kg");
    await expect(page.locator("#to-unit")).toHaveValue("lb");
  });

  test("converts 1 kg to pounds", async ({ page }) => {
    await convert(page, "/weight", "1", "2.204623", "lb");
  });
});

test.describe("Temperature converter", () => {
  test("loads with default °C → °F units", async ({ page }) => {
    await page.goto("/temperature");
    await expect(page.locator("#from-unit option:checked")).toContainText("°C");
    await expect(page.locator("#to-unit option:checked")).toContainText("°F");
  });

  test("converts 100 °C to Fahrenheit", async ({ page }) => {
    await convert(page, "/temperature", "100", "212", "°F");
  });

  test("converts 0 °C to Kelvin", async ({ page }) => {
    await page.goto("/temperature");
    await waitForHydration(page);
    await page.selectOption("#to-unit", "k");
    await page.fill("#value-input", "0");
    await expect(page.locator("#result-output")).toContainText("273.15");
    await expect(page.locator("#result-output")).toContainText("K");
  });
});

test.describe("Area converter", () => {
  test("loads with default m² → ft² units", async ({ page }) => {
    await page.goto("/area");
    await expect(page.locator("#from-unit option:checked")).toContainText("m²");
    await expect(page.locator("#to-unit option:checked")).toContainText("ft²");
  });

  test("converts 1 m² to square feet", async ({ page }) => {
    await convert(page, "/area", "1", "10.76392", "ft²");
  });
});

test.describe("Volume converter", () => {
  test("loads with default L → gal units", async ({ page }) => {
    await page.goto("/volume");
    await expect(page.locator("#from-unit")).toHaveValue("L");
    await expect(page.locator("#to-unit")).toHaveValue("gal");
  });

  test("converts 1 L to US gallons", async ({ page }) => {
    await convert(page, "/volume", "1", "0.2641721", "gal");
  });
});

test.describe("Speed converter", () => {
  test("loads with default km/h → mph units", async ({ page }) => {
    await page.goto("/speed");
    await expect(page.locator("#from-unit")).toHaveValue("kmh");
    await expect(page.locator("#to-unit")).toHaveValue("mph");
  });

  test("converts 1 km/h to mph", async ({ page }) => {
    await convert(page, "/speed", "1", "0.6213712", "mph");
  });
});

test.describe("Data converter", () => {
  test("loads with default MB → MiB units", async ({ page }) => {
    await page.goto("/data");
    await expect(page.locator("#from-unit")).toHaveValue("MB");
    await expect(page.locator("#to-unit")).toHaveValue("MiB");
  });

  test("converts 1 MB to MiB", async ({ page }) => {
    await convert(page, "/data", "1", "0.9536743", "MiB");
  });
});
