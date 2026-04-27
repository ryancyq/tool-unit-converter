import { writable } from "svelte/store";

export const updateAvailable = writable(false);
let swRegistration: ServiceWorkerRegistration | null = null;

export function initPWA() {
  if (typeof window === "undefined" || !("serviceWorker" in navigator)) return;

  navigator.serviceWorker.ready.then((registration) => {
    swRegistration = registration;

    registration.addEventListener("updatefound", () => {
      const newWorker = registration.installing;
      if (!newWorker) return;

      newWorker.addEventListener("statechange", () => {
        if (
          newWorker.state === "installed" &&
          navigator.serviceWorker.controller
        ) {
          updateAvailable.set(true);
        }
      });
    });
  });

  // Triggered after skipWaiting() causes controller change
  let refreshing = false;
  navigator.serviceWorker.addEventListener("controllerchange", () => {
    if (!refreshing) {
      refreshing = true;
      window.location.reload();
    }
  });
}

export function applyUpdate() {
  if (swRegistration?.waiting) {
    swRegistration.waiting.postMessage({ type: "SKIP_WAITING" });
  }
}
