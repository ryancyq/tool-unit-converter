<script lang="ts">
  import { base } from "$app/paths";
  import SettingsForm from "$lib/components/SettingsForm.svelte";
</script>

<svelte:head>
  <title>Settings · Unit Conversion</title>
</svelte:head>

<div class="space-y-4">
  <div class="card space-y-6">
    <SettingsForm compact={false} />
  </div>

  <div class="flex gap-3">
    <button
      class="flex-1 rounded-lg border border-slate-600 py-2 text-sm text-slate-300 transition-colors hover:border-slate-400 hover:text-white"
      onclick={() => history.back()}
    >
      Back
    </button>
    <a
      href="{base}/tos"
      class="flex-1 rounded-lg border border-slate-600 py-2 text-center text-sm text-slate-300 transition-colors hover:border-slate-400 hover:text-white"
    >
      Terms of Service
    </a>
  </div>

  <p class="text-center text-xs text-slate-500">
    🐸 by <a
      href="https://github.com/ryancyq"
      target="_blank"
      rel="noopener noreferrer"
      class="font-medium text-slate-400 transition-colors hover:text-white"
      >ryancyq</a
    >
  </p>
</div>
