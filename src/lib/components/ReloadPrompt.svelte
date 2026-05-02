<script lang="ts">
  import { get } from "svelte/store";
  import { LoaderCircle, X } from "lucide-svelte";
  import { useRegisterSW } from "virtual:pwa-register/svelte";
  import { settings } from "$lib/stores/settings";

  const SW_STALE_10_MINS_MS = 10 * 60 * 1000;
  const SW_INTERVAL_60_MINS_MS = 60 * 60 * 1000;

  let swVisibilityController: AbortController | undefined;
  let swIntervalId: ReturnType<typeof setInterval> | undefined;

  const isStale = () => {
    const ts = get(settings).swLastChecked;
    return !ts || Date.now() - ts >= SW_STALE_10_MINS_MS;
  };

  const loadSW = async (swUrl: string, reg: ServiceWorkerRegistration) => {
    if (reg.installing || !navigator) return;
    if ("connection" in navigator && !navigator.onLine) return;

    settings.onServiceWorkerUpdated(Date.now());

    const res = await fetch(swUrl, {
      cache: "no-store",
      headers: { cache: "no-store", "cache-control": "no-cache" },
    });

    if (res?.status === 200) await reg.update();
  };

  const checkForUpdate = (swUrl: string, reg: ServiceWorkerRegistration) => {
    if (isStale()) loadSW(swUrl, reg);
  };

  const { needRefresh, updateServiceWorker } = useRegisterSW({
    onRegisteredSW(swUrl, registration) {
      if (registration) {
        swVisibilityController?.abort();
        swVisibilityController = new AbortController();
        document.addEventListener(
          "visibilitychange",
          () => {
            if (document.visibilityState === "visible") {
              checkForUpdate(swUrl, registration);
            }
          },
          { signal: swVisibilityController.signal },
        );

        clearInterval(swIntervalId);
        swIntervalId = setInterval(
          () => checkForUpdate(swUrl, registration),
          SW_INTERVAL_60_MINS_MS,
        );

        checkForUpdate(swUrl, registration);
      }
    },
  });

  let updating = $state(false);
  const update = () => {
    updating = true;
    updateServiceWorker(true);
  };

  const dismiss = () => needRefresh.set(false);
</script>

{#if $needRefresh}
  <div
    class="fixed bottom-4 left-4 right-4 z-50 flex items-center gap-2 rounded-xl
           bg-sky-700 px-4 py-3 shadow-2xl
           sm:left-1/2 sm:right-auto sm:-translate-x-1/2 sm:gap-4 sm:px-5"
    role="alert"
  >
    <span class="flex-1 text-sm whitespace-nowrap text-white"
      >A new version is available.
    </span>
    <button
      class="shrink-0 inline-flex items-center gap-1.5 rounded-lg bg-white px-3 py-1
             text-sm font-semibold text-sky-700 transition-colors hover:bg-sky-100
             disabled:opacity-60 disabled:cursor-not-allowed"
      onclick={update}
      disabled={updating}
    >
      {#if updating}
        <LoaderCircle class="size-3.5 animate-spin" aria-hidden="true" />
      {/if}
      Update
    </button>
    <button
      class="shrink-0 text-sky-200 hover:text-white"
      aria-label="Dismiss"
      onclick={dismiss}
    >
      <X size={16} />
    </button>
  </div>
{/if}
