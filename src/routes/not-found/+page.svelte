<script lang="ts">
  import { base } from "$app/paths";
  import { APP_NAME } from "$lib/config";
</script>

<svelte:head>
  <title>Page Not Found · {APP_NAME}</title>
</svelte:head>

<div class="space-y-4 text-center">
  <p class="text-6xl font-bold text-slate-600">404</p>
  <p class="text-slate-400">This page doesn't exist.</p>
  <a href="{base}/" class="inline-block text-sky-400 hover:underline"
    >Back to home</a
  >
</div>
