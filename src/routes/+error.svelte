<script lang="ts">
  import { base } from "$app/paths";
  import { page } from "$app/stores";
</script>

<div class="space-y-4 text-center">
  <p class="text-6xl font-bold text-slate-600">{$page.status}</p>
  <p class="text-slate-400">{$page.error?.message ?? "Something went wrong"}</p>
  <a href="{base}/" class="inline-block text-sky-400 hover:underline">Back</a>
</div>
