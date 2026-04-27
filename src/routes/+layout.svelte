<script lang="ts">
  import "../app.css";
  import NavBar from "$lib/components/NavBar.svelte";
  import UpdateBanner from "$lib/components/UpdateBanner.svelte";
  import { onMount } from "svelte";
  import { initPWA } from "$lib/pwa";

  onMount(() => initPWA());
</script>

<NavBar />
<main class="mx-auto max-w-5xl px-4 py-8">
  <slot />
</main>
<UpdateBanner />
