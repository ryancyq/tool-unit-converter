<script lang="ts">
  import { base } from "$app/paths";
  import { Wrench } from "lucide-svelte";
  import { all } from "$lib/converters/index";

  const links = all().map((c) => ({
    href: `${base}/${c.slug}`,
    label: c.label,
  }));
</script>

<nav class="border-b border-slate-700 bg-surface-card">
  <div
    class="mx-auto flex max-w-5xl items-center gap-1 overflow-x-auto px-4 py-3"
  >
    <a
      href="{base}/"
      class="mr-4 flex flex-shrink-0 items-center gap-2 font-bold text-sky-400"
    >
      <Wrench size={18} />
      <span>Converters</span>
    </a>
    {#each links as link}
      <a
        href={link.href}
        class="flex-shrink-0 rounded-lg px-3 py-1.5 text-sm text-slate-300
				       transition-colors hover:bg-surface-hover hover:text-white"
      >
        {link.label}
      </a>
    {/each}
  </div>
</nav>
