import { writable } from "svelte/store";
import { browser } from "$app/environment";
import { STORAGE_KEY } from "$lib/config";

export { APP_NAME } from "$lib/config";

export type UnitSystem = "default" | "imperial" | "metric";

export type Settings = {
  unitSystem: UnitSystem;
  offlineEnabled: boolean | null;
  swLastChecked: number | null;
};

const defaults: Settings = {
  unitSystem: "default",
  offlineEnabled: null,
  swLastChecked: null,
};

function createSettingsStore() {
  const initial: Settings = (() => {
    if (!browser) return defaults;
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) return { ...defaults, ...JSON.parse(stored) };
    } catch {}
    return defaults;
  })();

  const { subscribe, update } = writable<Settings>(initial);

  const persist = (value: Settings) => {
    if (browser) localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
  };

  return {
    subscribe,
    setUnitSystem(unitSystem: UnitSystem) {
      update((s) => {
        const next = { ...s, unitSystem };
        persist(next);
        return next;
      });
    },
    setOfflineEnabled(enabled: boolean) {
      update((s) => {
        const next = { ...s, offlineEnabled: enabled };
        persist(next);
        return next;
      });
    },
    onServiceWorkerUpdated(timestamp: number = Date.now()) {
      update((s) => {
        const next = { ...s, swLastChecked: timestamp };
        persist(next);
        return next;
      });
    },
  };
}

export const settings = createSettingsStore();
