<script lang="ts">
  import { createEventDispatcher, onMount } from "svelte";
  import { settings } from "$lib/stores/settings";
  import type { UnitSystem } from "$lib/stores/settings";

  const dispatch = createEventDispatcher<{ close: void }>();

  let container: HTMLDivElement;

  const unitSystems: { value: UnitSystem; label: string }[] = [
    { value: "default", label: "Default" },
    { value: "metric", label: "Metric" },
    { value: "imperial", label: "Imperial" },
  ];

  async function revokeOffline() {
    settings.setOfflineEnabled(false);
    if ("serviceWorker" in navigator) {
      const reg = await navigator.serviceWorker.getRegistration();
      if (reg) {
        await reg.unregister();
        const keys = await caches.keys();
        await Promise.all(keys.map((k) => caches.delete(k)));
        window.location.reload();
      }
    }
  }

  function toggleOffline() {
    if ($settings.offlineEnabled) {
      revokeOffline();
    } else {
      settings.setOfflineEnabled(true);
    }
  }

  function handleKeydown(e: KeyboardEvent) {
    if (e.key === "Escape") dispatch("close");
  }

  function handleClickOutside(e: MouseEvent) {
    if (!container.contains(e.target as Node)) dispatch("close");
  }

  onMount(() => {
    document.addEventListener("keydown", handleKeydown);
    const t = setTimeout(
      () => document.addEventListener("click", handleClickOutside),
      0,
    );
    return () => {
      document.removeEventListener("keydown", handleKeydown);
      clearTimeout(t);
      document.removeEventListener("click", handleClickOutside);
    };
  });
</script>

<div
  bind:this={container}
  class="absolute right-0 top-full z-50 mt-2 w-64 rounded-xl border border-slate-700 bg-surface-card p-4 shadow-2xl"
>
  <!-- Unit system -->
  <div class="mb-4">
    <p class="mb-2 text-xs font-medium uppercase tracking-wide text-slate-400">
      Unit system
    </p>
    <div class="flex overflow-hidden rounded-lg border border-slate-700">
      {#each unitSystems as sys}
        <button
          class="flex-1 py-1.5 text-sm transition-colors
                 {$settings.unitSystem === sys.value
            ? 'bg-sky-600 text-white'
            : 'text-slate-400 hover:text-white'}"
          on:click={() => settings.setUnitSystem(sys.value)}
        >
          {sys.label}
        </button>
      {/each}
    </div>
  </div>

  <!-- Offline toggle -->
  <div>
    <div class="flex items-center justify-between">
      <div>
        <p class="text-sm font-medium text-slate-200">Available offline</p>
        <p class="text-xs text-slate-500">Cache app for offline use</p>
      </div>
      <button
        role="switch"
        aria-label="Toggle offline availability"
        aria-checked={!!$settings.offlineEnabled}
        class="relative h-6 w-11 flex-shrink-0 rounded-full transition-colors
               {$settings.offlineEnabled ? 'bg-sky-600' : 'bg-slate-600'}"
        on:click={toggleOffline}
      >
        <span
          class="absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform
                 {$settings.offlineEnabled ? 'translate-x-5' : 'translate-x-0'}"
        ></span>
      </button>
    </div>
    {#if $settings.offlineEnabled === false}
      <p class="mt-2 text-xs text-slate-500">
        Cached files will be cleared on next visit.
      </p>
    {/if}
  </div>
</div>
