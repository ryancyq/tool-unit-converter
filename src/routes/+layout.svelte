<script lang="ts">
  import "../app.css";
  import NavBar from "$lib/components/NavBar.svelte";
  import { onMount } from "svelte";
  import { afterNavigate } from "$app/navigation";
  import { env } from "$env/dynamic/public";

  const GA_ID = env.PUBLIC_GA_MEASUREMENT_ID;

  onMount(() => {
    if (!GA_ID || navigator.doNotTrack === "1") return;

    const script = document.createElement("script");
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    window.gtag = function () {
      window.dataLayer.push(arguments);
    };
    window.gtag("js", new Date());
  });

  afterNavigate(({ to }) => {
    if (!GA_ID || typeof window.gtag === "undefined") return;
    window.gtag("config", GA_ID, {
      page_path: to?.url.pathname,
    });
  });
</script>

<NavBar />
<main class="mx-auto max-w-5xl px-4 py-8">
  <slot />
</main>

{#await import("$lib/components/ReloadPrompt.svelte") then { default: ReloadPrompt }}
  <ReloadPrompt />
{/await}
