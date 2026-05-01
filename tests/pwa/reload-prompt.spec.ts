import { test, expect, type Page } from "@playwright/test";
import { waitForHydration, waitForServiceWorker } from "../helpers";

async function setupSwUpdateRoute(page: Page) {
  let swFetchCount = 0;

  // log every network request/response that touches sw.js (including ones that
  // may bypass the route handler, e.g. SW-infrastructure fetches)
  page.context().on("request", (req) => {
    if (req.url().includes("sw.js"))
      console.log(
        `[net:request]  ${req.resourceType().padEnd(12)} ${req.url()}`,
      );
  });
  page.context().on("response", (res) => {
    if (res.url().includes("sw.js"))
      console.log(`[net:response] ${res.status()} ${res.url()}`);
  });

  // capture browser-side console (ReloadPrompt logs + any SW errors)
  page.on("console", (msg) =>
    console.log(`[browser:${msg.type()}] ${msg.text()}`),
  );
  page.on("pageerror", (err) => console.log(`[page:error] ${err.message}`));

  await page.context().route("**/sw.js", async (route) => {
    swFetchCount++;
    const url = route.request().url();
    const type = route.request().resourceType();
    if (swFetchCount === 1) {
      console.log(`[route] #${swFetchCount} PASS-THROUGH (${type}) ${url}`);
      return route.continue();
    }
    console.log(`[route] #${swFetchCount} MODIFIED   (${type}) ${url}`);
    const response = await route.fetch();
    const body = await response.text();
    await route.fulfill({
      status: 200,
      contentType: "application/javascript",
      body: body + "\n",
    });
  });
}

test.describe("reload prompt", () => {
  test("shows update notification when a new version is available", async ({
    page,
  }) => {
    await setupSwUpdateRoute(page);
    await page.goto("/");
    await waitForHydration(page);
    await waitForServiceWorker(page);

    await expect(page.getByRole("alert")).toBeVisible({ timeout: 15000 });
    await expect(page.getByRole("alert")).toContainText(
      "A new version is available",
    );
  });

  test("dismiss button hides the update notification", async ({ page }) => {
    await setupSwUpdateRoute(page);
    await page.goto("/");
    await waitForHydration(page);
    await waitForServiceWorker(page);

    await expect(page.getByRole("alert")).toBeVisible({ timeout: 15000 });
    await page.getByRole("button", { name: "Dismiss" }).click();
    await expect(page.getByRole("alert")).not.toBeAttached();
  });
});
