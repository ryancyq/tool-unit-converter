<script lang="ts">
  import "../app.css";
  import { pwaInfo } from "virtual:pwa-info";
  import NavBar from "$lib/components/NavBar.svelte";
  import { onMount } from "svelte";
  import { afterNavigate } from "$app/navigation";
  import { PUBLIC_GA_MEASUREMENT_ID } from "$env/static/public";

  $: webManifestLink = pwaInfo ? pwaInfo.webManifest.linkTag : "";

  onMount(() => {
    if (!PUBLIC_GA_MEASUREMENT_ID || navigator.doNotTrack === "1") return;

    const script = document.createElement("script");
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${PUBLIC_GA_MEASUREMENT_ID}`;
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    window.gtag = function () {
      window.dataLayer.push(arguments);
    };
    window.gtag("js", new Date());
  });

  afterNavigate(({ to }) => {
    if (!PUBLIC_GA_MEASUREMENT_ID || typeof window.gtag === "undefined") return;
    window.gtag("config", PUBLIC_GA_MEASUREMENT_ID, {
      page_path: to?.url.pathname,
    });
  });
</script>

<svelte:head>
  {@html webManifestLink}
</svelte:head>

<NavBar />
<main class="mx-auto max-w-5xl px-4 py-8">
  <slot />
</main>

{#await import("$lib/components/ReloadPrompt.svelte") then { default: ReloadPrompt }}
  <ReloadPrompt />
{/await}
