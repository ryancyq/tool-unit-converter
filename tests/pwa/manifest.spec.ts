import { test, expect } from "@playwright/test";

test.describe("web app manifest", () => {
  test("is linked in the document head", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator('link[rel="manifest"]')).toHaveAttribute(
      "href",
      /manifest\.webmanifest/,
    );
  });

  test("is reachable and valid JSON", async ({ page }) => {
    const response = await page.request.get("/manifest.webmanifest");
    expect(response.ok()).toBe(true);
    const manifest = await response.json();
    expect(manifest).toBeTruthy();
  });

  test("contains required PWA fields", async ({ page }) => {
    const response = await page.request.get("/manifest.webmanifest");
    const manifest = await response.json();

    expect(manifest.name).toBeTruthy();
    expect(manifest.short_name).toBeTruthy();
    expect(manifest.description).toBeTruthy();
    expect(manifest.theme_color).toBeTruthy();
    expect(manifest.display).toBe("standalone");
    expect(manifest.start_url).toBeTruthy();
    expect(manifest.scope).toBeTruthy();
  });

  test("includes 192x192 and 512x512 icons", async ({ page }) => {
    const response = await page.request.get("/manifest.webmanifest");
    const manifest = await response.json();
    const sizes: string[] = manifest.icons.map(
      (icon: { sizes: string }) => icon.sizes,
    );

    expect(sizes).toContain("192x192");
    expect(sizes).toContain("512x512");
  });

  test("all icons are reachable", async ({ page }) => {
    const response = await page.request.get("/manifest.webmanifest");
    const manifest = await response.json();

    for (const icon of manifest.icons as { src: string }[]) {
      const iconResponse = await page.request.get(icon.src);
      expect(iconResponse.ok(), `icon ${icon.src} should be reachable`).toBe(
        true,
      );
    }
  });
});
