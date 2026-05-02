import { writable } from "svelte/store";
import { browser } from "$app/environment";

export type UnitSystem = "default" | "imperial" | "metric";

export type Settings = {
  unitSystem: UnitSystem;
  offlineEnabled: boolean | null;
};

const STORAGE_KEY = "unit-converter-settings";

const defaults: Settings = {
  unitSystem: "default",
  offlineEnabled: null,
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
  };
}

export const settings = createSettingsStore();
