import { test, expect } from "@playwright/test";
import { waitForHydration, waitForServiceWorker } from "../helpers";

test.describe("service worker", () => {
  test("registers and reaches activated state", async ({ page }) => {
    await page.goto("/");
    await waitForHydration(page);

    const state = await page.evaluate(async () => {
      const reg = await navigator.serviceWorker.ready;
      return reg.active?.state;
    });

    expect(state).toBe("activated");
  });

  test("becomes controller of the page", async ({ page }) => {
    await page.goto("/");
    await waitForHydration(page);
    await waitForServiceWorker(page);

    const isControlled = await page.evaluate(
      () => !!navigator.serviceWorker.controller,
    );
    expect(isControlled).toBe(true);
  });
});

test.describe("offline navigation", () => {
  test("home page loads from cache after going offline", async ({
    page,
    context,
  }) => {
    await page.goto("/");
    await waitForHydration(page);
    await waitForServiceWorker(page);

    await context.setOffline(true);
    await page.reload();

    await expect(page).toHaveTitle(/Conversion Tools/);
  });

  test("converter pages are accessible offline after first visit", async ({
    page,
    context,
  }) => {
    await page.goto("/");
    await waitForHydration(page);
    await waitForServiceWorker(page);

    await context.setOffline(true);

    for (const route of ["/length", "/weight", "/temperature"]) {
      await page.goto(route);
      await expect(page.locator("#value-input")).toBeVisible();
    }
  });

  test("unknown route serves the navigate fallback offline", async ({
    page,
    context,
  }) => {
    await page.goto("/");
    await waitForHydration(page);
    await waitForServiceWorker(page);

    await context.setOffline(true);
    await page.goto("/this-route-does-not-exist");

    await expect(page.locator("nav")).toBeVisible();
    await expect(page.getByText("404")).toBeVisible();
    await expect(page.getByText("This page doesn't exist.")).toBeVisible();
  });

  test("converter remains functional while offline", async ({
    page,
    context,
  }) => {
    await page.goto("/length");
    await waitForHydration(page);
    await waitForServiceWorker(page);

    await context.setOffline(true);
    await page.reload();
    await waitForHydration(page);

    await page.fill("#value-input", "1");
    await expect(page.locator("#result-output")).toContainText("3.28084");
  });
});
