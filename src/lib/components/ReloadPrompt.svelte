<script lang="ts">
  import { X } from "lucide-svelte";
  import { useRegisterSW } from "virtual:pwa-register/svelte";

  let swVisibilityController: AbortController | undefined;
  let swIntervalId: ReturnType<typeof setInterval> | undefined;

  const { needRefresh, updateServiceWorker } = useRegisterSW({
    onRegisteredSW(swUrl, registration) {
      if (!registration) return;

      const STALE_10_MINS_MS = 10 * 60 * 1000;
      const TS_KEY = "unit-converter-pwa-sw-last-updated";

      async function checkForUpdate() {
        if (registration.installing || !navigator.onLine) return;
        const res = await fetch(swUrl, {
          cache: "no-store",
          headers: { cache: "no-store", "cache-control": "no-cache" },
        });
        if (res?.status === 200) await registration.update();
        localStorage.setItem(TS_KEY, String(Date.now()));
      }

      function isStale() {
        const ts = localStorage.getItem(TS_KEY);
        return !ts || Date.now() - Number(ts) >= STALE_10_MINS_MS;
      }

      if (isStale()) checkForUpdate();

      swVisibilityController?.abort();
      swVisibilityController = new AbortController();
      document.addEventListener(
        "visibilitychange",
        () => { if (document.visibilityState === "visible" && isStale()) checkForUpdate(); },
        { signal: swVisibilityController.signal },
      );

      clearInterval(swIntervalId);
      swIntervalId = setInterval(checkForUpdate, 60 * 60 * 1000);
    },
  });

  const dismiss = () => needRefresh.set(false);
</script>

{#if $needRefresh}
  <div
    class="fixed bottom-4 left-1/2 z-50 flex -translate-x-1/2 items-center gap-4 rounded-xl
           bg-sky-700 px-5 py-3 shadow-2xl"
    role="alert"
  >
    <span class="text-sm text-white">A new version is available.</span>
    <button
      class="rounded-lg bg-white px-3 py-1 text-sm font-semibold text-sky-700
             transition-colors hover:bg-sky-100"
      onclick={() => updateServiceWorker(true)}
    >
      Update
    </button>
    <button
      class="text-sky-200 hover:text-white"
      aria-label="Dismiss"
      onclick={dismiss}
    >
      <X size={16} />
    </button>
  </div>
{/if}
