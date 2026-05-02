import type { Page } from "@playwright/test";
import { STORAGE_KEY } from "../src/lib/config";

// Seeds localStorage with offline consent before the next page.goto() call.
// Must be called before page.goto() — addInitScript runs at page initialization.
export async function seedOfflineConsent(page: Page) {
  await page.addInitScript((key) => {
    localStorage.setItem(
      key,
      JSON.stringify({ unitSystem: "default", offlineEnabled: true }),
    );
  }, STORAGE_KEY);
}

export async function waitForHydration(page: Page) {
  await page.waitForLoadState("networkidle");
}

export async function waitForServiceWorker(page: Page) {
  await page.evaluate(() =>
    navigator.serviceWorker.ready.then(
      () =>
        new Promise<void>((resolve) => {
          if (navigator.serviceWorker.controller) return resolve();
          navigator.serviceWorker.addEventListener(
            "controllerchange",
            () => resolve(),
            { once: true },
          );
        }),
    ),
  );
}
