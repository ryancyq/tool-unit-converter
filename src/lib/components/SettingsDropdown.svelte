<script lang="ts">
  import { createEventDispatcher, onMount } from "svelte";
  import SettingsForm from "./SettingsForm.svelte";

  const dispatch = createEventDispatcher<{ close: void }>();

  let container: HTMLDivElement;

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
  data-testid="settings-dropdown"
  class="absolute right-0 top-full z-50 mt-2 w-64 rounded-xl border border-slate-700 bg-surface-card p-4 shadow-2xl"
>
  <div class="space-y-4">
    <SettingsForm compact={true} />
  </div>
</div>
