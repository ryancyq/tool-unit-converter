<script lang="ts">
  import { base } from "$app/paths";
  import { Menu, Monitor, Wrench, X } from "lucide-svelte";
  import { all } from "$lib/converters/index";

  const links = [
    ...all().map((c) => ({
      href: `${base}/${c.slug}`,
      label: c.label,
      icon: c.icon,
    })),
    { href: `${base}/screen-ppi`, label: "Screen PPI", icon: Monitor },
  ];

  let mobileOpen = false;
</script>

<nav class="border-b border-slate-700 bg-surface-card">
  <div class="mx-auto flex max-w-5xl items-center px-4 py-3">
    <a
      href="{base}/"
      class="mr-4 flex flex-shrink-0 items-center gap-2 font-bold text-sky-400"
    >
      <Wrench size={18} />
      <span>Unit Conversion</span>
    </a>

    <!-- desktop links -->
    <div class="hidden items-center gap-1 sm:flex">
      {#each links as link}
        <a
          href={link.href}
          class="flex flex-shrink-0 items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm text-slate-300
                 transition-colors hover:bg-surface-hover hover:text-white"
        >
          <svelte:component this={link.icon} size={14} />
          {link.label}
        </a>
      {/each}
    </div>

    <!-- hamburger (mobile only) -->
    <button
      class="ml-auto flex items-center justify-center rounded-lg p-1.5 text-slate-400
             transition-colors hover:text-white sm:hidden"
      aria-label="Toggle menu"
      on:click={() => (mobileOpen = !mobileOpen)}
    >
      {#if mobileOpen}
        <X size={20} />
      {:else}
        <Menu size={20} />
      {/if}
    </button>
  </div>

  <!-- mobile dropdown -->
  {#if mobileOpen}
    <div class="border-t border-slate-700 px-4 py-2 sm:hidden">
      {#each links as link}
        <a
          href={link.href}
          class="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-slate-300
                 transition-colors hover:bg-surface-hover hover:text-white"
          on:click={() => (mobileOpen = false)}
        >
          <svelte:component this={link.icon} size={16} />
          {link.label}
        </a>
      {/each}
    </div>
  {/if}
</nav>
