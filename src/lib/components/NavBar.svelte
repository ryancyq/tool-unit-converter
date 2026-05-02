<script lang="ts">
  import { onMount } from "svelte";
  import { page } from "$app/stores";
  import { base } from "$app/paths";
  import {
    Cloud,
    CloudDownload,
    CloudOff,
    Home,
    Menu,
    Settings,
    Wrench,
    X,
  } from "lucide-svelte";
  import { getTools } from "$lib/tools";
  import { settings } from "$lib/stores/settings";
  import SettingsDropdown from "./SettingsDropdown.svelte";

  const tools = getTools();

  let menuOpen = $state(false);
  let settingsOpen = $state(false);
  let offlineReady = $state(false);

  const toolName = $derived($page.data.toolName as string | undefined);
  const currentTool = $derived(
    tools.find((t) => t.href === $page.url.pathname),
  );
  const NavIcon = $derived(currentTool?.icon ?? Wrench);

  function handleControllerChange() {
    offlineReady = !!navigator.serviceWorker.controller;
  }

  onMount(() => {
    if (!("serviceWorker" in navigator)) return;
    offlineReady = !!navigator.serviceWorker.controller;
    navigator.serviceWorker.addEventListener(
      "controllerchange",
      handleControllerChange,
    );
    return () =>
      navigator.serviceWorker.removeEventListener(
        "controllerchange",
        handleControllerChange,
      );
  });
</script>

<nav class="border-b border-slate-700 bg-surface-card">
  <div class="mx-auto flex max-w-5xl items-center px-4 py-3">
    <!-- hamburger: all screen sizes, left side -->
    <button
      class="mr-2 flex items-center justify-center rounded-lg p-1.5 text-slate-400
             transition-colors hover:text-white"
      aria-label="Toggle menu"
      onclick={() => (menuOpen = !menuOpen)}
    >
      {#if menuOpen}
        <X size={20} />
      {:else}
        <Menu size={20} />
      {/if}
    </button>

    <!-- tool icon + name (display only, non-navigable) -->
    <div class="flex flex-shrink-0 items-center gap-2 font-bold text-sky-400">
      <NavIcon size={18} />
      <span>{toolName ?? "Unit Conversion Tool"}</span>
    </div>

    <!-- right side: offline status + gear -->
    <div class="ml-auto flex items-center">
      {#if offlineReady}
        <div
          class="p-1.5 text-emerald-400"
          title="Available Offline"
          aria-label="Available Offline"
        >
          <CloudOff size={16} aria-hidden="true" />
        </div>
      {:else if $settings.offlineEnabled === true}
        <div
          class="animate-pulse p-1.5 text-sky-400"
          title="Downloading for offline use…"
          aria-label="Downloading for offline use"
        >
          <CloudDownload size={16} aria-hidden="true" />
        </div>
      {:else}
        <div
          class="p-1.5 text-slate-400"
          title="Working Online"
          aria-label="Working Online"
        >
          <Cloud size={16} aria-hidden="true" />
        </div>
      {/if}

      <!-- desktop gear: opens inline dropdown -->
      <div class="relative hidden lg:block">
        <button
          class="flex items-center justify-center rounded-lg p-1.5 text-slate-400
                 transition-colors hover:text-white"
          aria-label="Settings"
          onclick={() => (settingsOpen = !settingsOpen)}
        >
          <Settings size={16} />
        </button>
        {#if settingsOpen}
          <SettingsDropdown on:close={() => (settingsOpen = false)} />
        {/if}
      </div>

      <!-- small screen gear: navigates to settings page -->
      <a
        href="{base}/settings"
        class="flex items-center justify-center rounded-lg p-1.5 text-slate-400
               transition-colors hover:text-white lg:hidden"
        aria-label="Settings"
        onclick={() => (menuOpen = false)}
      >
        <Settings size={16} />
      </a>
    </div>
  </div>

  <!-- nav menu: all screen sizes -->
  {#if menuOpen}
    <div data-testid="nav-menu" class="border-t border-slate-700 px-4 py-2">
      <a
        href="{base}/"
        class="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-slate-300
               transition-colors hover:bg-surface-hover hover:text-white"
        onclick={() => (menuOpen = false)}
      >
        <Home size={16} />
        Home
      </a>
      {#each tools as tool}
        {@const ToolIcon = tool.icon}
        <a
          href={tool.href}
          class="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-slate-300
                 transition-colors hover:bg-surface-hover hover:text-white"
          onclick={() => (menuOpen = false)}
        >
          <ToolIcon size={16} />
          {tool.label}
        </a>
      {/each}
    </div>
  {/if}
</nav>
