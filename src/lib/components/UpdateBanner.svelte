<script lang="ts">
  import { X } from "lucide-svelte";
  import { updateAvailable, applyUpdate } from "$lib/pwa";
</script>

{#if $updateAvailable}
  <div
    class="fixed bottom-4 left-1/2 z-50 flex -translate-x-1/2 items-center gap-4 rounded-xl
		       bg-sky-700 px-5 py-3 shadow-2xl"
    role="alert"
  >
    <span class="text-sm text-white">A new version is available.</span>
    <button
      class="rounded-lg bg-white px-3 py-1 text-sm font-semibold text-sky-700
			       transition-colors hover:bg-sky-100"
      on:click={applyUpdate}
    >
      Update
    </button>
    <button
      class="text-sky-200 hover:text-white"
      aria-label="Dismiss"
      on:click={() => updateAvailable.set(false)}
    >
      <X size={16} />
    </button>
  </div>
{/if}
