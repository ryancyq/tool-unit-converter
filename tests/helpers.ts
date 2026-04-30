import type { Page } from "@playwright/test";

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
