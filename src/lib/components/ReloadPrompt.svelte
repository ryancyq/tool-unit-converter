<script lang="ts">
  import { X } from "lucide-svelte";
  import { useRegisterSW } from "virtual:pwa-register/svelte";

  const { needRefresh, offlineReady, updateServiceWorker } = useRegisterSW({
    onRegisteredSW(swUrl, registration) {
      if (!registration) return;
      setInterval(
        async () => {
          if (registration.installing) return;
          if ("connection" in navigator && !navigator.onLine) return;
          const response = await fetch(swUrl, {
            cache: "no-store",
            headers: { cache: "no-store", "cache-control": "no-cache" },
          });
          if (response?.status === 200) await registration.update();
        },
        60 * 60 * 1000,
      );
    },
  });

  const dismiss = () => {
    offlineReady.set(false);
    needRefresh.set(false);
  };
</script>

{#if $offlineReady || $needRefresh}
  <div
    class="fixed bottom-4 left-1/2 z-50 flex -translate-x-1/2 items-center gap-4 rounded-xl
           bg-sky-700 px-5 py-3 shadow-2xl"
    role="alert"
  >
    {#if $offlineReady}
      <span class="text-sm text-white">App ready to work offline.</span>
    {:else}
      <span class="text-sm text-white">A new version is available.</span>
      <button
        class="rounded-lg bg-white px-3 py-1 text-sm font-semibold text-sky-700
               transition-colors hover:bg-sky-100"
        onclick={() => updateServiceWorker(true)}
      >
        Update
      </button>
    {/if}
    <button
      class="text-sky-200 hover:text-white"
      aria-label="Dismiss"
      onclick={dismiss}
    >
      <X size={16} />
    </button>
  </div>
{/if}
