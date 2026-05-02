<script lang="ts">
  import { base } from "$app/paths";
  import { ArrowLeft } from "lucide-svelte";
  import SettingsForm from "$lib/components/SettingsForm.svelte";
</script>

<svelte:head>
  <title>Settings · Unit Conversion</title>
</svelte:head>

<div class="space-y-6">
  <div class="flex items-center gap-3">
    <a
      href="{base}/"
      class="flex items-center justify-center rounded-lg p-1.5 text-slate-400 transition-colors hover:text-white"
      aria-label="Back"
    >
      <ArrowLeft size={20} />
    </a>
    <h1 class="text-xl font-semibold text-slate-100">Settings</h1>
  </div>

  <div class="card space-y-6">
    <SettingsForm compact={false} />
  </div>
</div>
