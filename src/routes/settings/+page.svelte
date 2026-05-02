<script lang="ts">
  import SettingsForm from "$lib/components/SettingsForm.svelte";
</script>

<svelte:head>
  <title>Settings · Unit Conversion</title>
</svelte:head>

<div class="space-y-4">
  <div class="card space-y-6">
    <SettingsForm compact={false} />
  </div>

  <button
    class="w-full rounded-lg border border-slate-600 py-2 text-sm text-slate-300 transition-colors hover:border-slate-400 hover:text-white"
    onclick={() => history.back()}
  >
    Back
  </button>
</div>
