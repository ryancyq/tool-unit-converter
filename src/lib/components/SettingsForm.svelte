<script lang="ts">
  import { settings } from "$lib/stores/settings";
  import type { UnitSystem } from "$lib/stores/settings";

  interface Props {
    compact?: boolean;
  }

  const { compact = false }: Props = $props();

  const unitSystems: { value: UnitSystem; label: string; desc: string }[] = [
    {
      value: "default",
      label: "Default",
      desc: "Use each converter's built-in default units",
    },
    {
      value: "metric",
      label: "Metric / SI",
      desc: "Pre-select metric units where available",
    },
    {
      value: "imperial",
      label: "Imperial",
      desc: "Pre-select imperial units where available",
    },
  ];

  let justRevoked = $state(false);

  async function revokeOffline() {
    justRevoked = true;
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
</script>

<!-- Unit system -->
<div>
  {#if compact}
    <p class="mb-2 text-xs font-medium uppercase tracking-wide text-slate-400">
      Unit system
    </p>
    <div
      class="flex divide-x divide-slate-700 overflow-hidden rounded-lg border border-slate-700"
    >
      {#each unitSystems as sys}
        <button
          class="flex-1 py-1.5 text-sm transition-colors
                 {$settings.unitSystem === sys.value
            ? 'bg-sky-600 text-white'
            : 'text-slate-400 hover:text-white'}"
          onclick={() => settings.setUnitSystem(sys.value)}
        >
          {sys.label}
        </button>
      {/each}
    </div>
  {:else}
    <h2 class="mb-1 text-sm font-semibold text-slate-200">Unit system</h2>
    <p class="mb-3 text-xs text-slate-500">
      Controls which units are pre-selected on converter pages
    </p>
    <div class="space-y-2">
      {#each unitSystems as sys}
        <button
          class="flex w-full items-center justify-between rounded-lg border px-4 py-3 text-left transition-colors
                 {$settings.unitSystem === sys.value
            ? 'border-sky-600 bg-sky-900/20 text-white'
            : 'border-slate-700 text-slate-300 hover:border-slate-600'}"
          onclick={() => settings.setUnitSystem(sys.value)}
        >
          <div>
            <p class="text-sm font-medium">{sys.label}</p>
            <p class="text-xs text-slate-500">{sys.desc}</p>
          </div>
          {#if $settings.unitSystem === sys.value}
            <span class="h-2 w-2 flex-shrink-0 rounded-full bg-sky-400"></span>
          {/if}
        </button>
      {/each}
    </div>
  {/if}
</div>

<!-- Offline toggle -->
<div class="border-t border-slate-700 {compact ? 'pt-4' : 'pt-6'}">
  <div class="flex items-center justify-between">
    <div>
      {#if compact}
        <p class="text-sm font-medium text-slate-200">Available offline</p>
        <p class="text-xs text-slate-500">Cache app for offline use</p>
      {:else}
        <h2 class="text-sm font-semibold text-slate-200">Available offline</h2>
        <p class="text-xs text-slate-500">Cache app for use without internet</p>
      {/if}
    </div>
    <button
      role="switch"
      aria-label="Toggle offline availability"
      aria-checked={!!$settings.offlineEnabled}
      class="relative h-6 w-11 flex-shrink-0 rounded-full transition-colors
             {$settings.offlineEnabled ? 'bg-sky-600' : 'bg-slate-600'}"
      onclick={toggleOffline}
    >
      <span
        class="absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform
               {$settings.offlineEnabled ? 'translate-x-5' : 'translate-x-0'}"
      ></span>
    </button>
  </div>
  {#if justRevoked}
    <p class="mt-2 text-xs text-slate-500">
      Cached files will be cleared on next visit.
    </p>
  {/if}
</div>
