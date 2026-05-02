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
  test("loads with default km → m units", async ({ page }) => {
    await page.goto("/length");
    await expect(page.locator("#from-unit")).toHaveValue("km");
    await expect(page.locator("#to-unit")).toHaveValue("m");
  });

  test("converts 1 km to metres", async ({ page }) => {
    await convert(page, "/length", "1", "1,000", "m");
  });

  test("swaps units", async ({ page }) => {
    await page.goto("/length");
    await waitForHydration(page);
    await page.fill("#value-input", "1000");
    await page.click('button[title="Swap units"]');
    await expect(page.locator("#from-unit")).toHaveValue("m");
    await expect(page.locator("#to-unit")).toHaveValue("km");
    await expect(page.locator("#result-output")).toContainText("1");
    await expect(page.locator("#result-output")).toContainText("km");
  });
});

test.describe("Weight converter", () => {
  test("loads with default kg → g units", async ({ page }) => {
    await page.goto("/weight");
    await expect(page.locator("#from-unit")).toHaveValue("kg");
    await expect(page.locator("#to-unit")).toHaveValue("g");
  });

  test("converts 1 kg to grams", async ({ page }) => {
    await convert(page, "/weight", "1", "1,000", "g");
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
  test("loads with default km² → m² units", async ({ page }) => {
    await page.goto("/area");
    await expect(page.locator("#from-unit option:checked")).toContainText(
      "km²",
    );
    await expect(page.locator("#to-unit option:checked")).toContainText("m²");
  });

  test("converts 1 km² to square metres", async ({ page }) => {
    await convert(page, "/area", "1", "1,000,000", "m²");
  });
});

test.describe("Volume converter", () => {
  test("loads with default L → mL units", async ({ page }) => {
    await page.goto("/volume");
    await expect(page.locator("#from-unit")).toHaveValue("L");
    await expect(page.locator("#to-unit")).toHaveValue("mL");
  });

  test("converts 1 L to millilitres", async ({ page }) => {
    await convert(page, "/volume", "1", "1,000", "mL");
  });
});

test.describe("Speed converter", () => {
  test("loads with default km/h → m/s units", async ({ page }) => {
    await page.goto("/speed");
    await expect(page.locator("#from-unit")).toHaveValue("kmh");
    await expect(page.locator("#to-unit")).toHaveValue("ms");
  });

  test("converts 1 km/h to m/s", async ({ page }) => {
    await convert(page, "/speed", "1", "0.2777778", "m/s");
  });
});

test.describe("Data converter", () => {
  test("loads with default GB → GiB units", async ({ page }) => {
    await page.goto("/data");
    await expect(page.locator("#from-unit")).toHaveValue("GB");
    await expect(page.locator("#to-unit")).toHaveValue("GiB");
  });

  test("converts 1 GB to GiB", async ({ page }) => {
    await convert(page, "/data", "1", "0.9313226", "GiB");
  });
});
