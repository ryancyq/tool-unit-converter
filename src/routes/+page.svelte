<script lang="ts">
  import { base } from "$app/paths";
  import { all } from "$lib/converters/index";

  const converters = all();
</script>

<svelte:head>
  <title>Conversion Tools</title>
  <meta
    name="description"
    content="Unit and measurement conversion tools — works offline"
  />
</svelte:head>

<div class="space-y-8">
  <header class="text-center">
    <h1 class="text-4xl font-bold text-sky-400">Conversion Tools</h1>
    <p class="mt-2 text-slate-400">Fast, offline-capable unit converters</p>
  </header>

  <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
    {#each converters as c}
      <a
        href="{base}/{c.slug}"
        class="card group flex flex-col gap-3 transition-colors hover:border hover:border-sky-600"
      >
        <svelte:component this={c.icon} size={32} class="text-sky-400" />
        <span
          class="text-lg font-semibold text-sky-300 group-hover:text-sky-200"
          >{c.label}</span
        >
        <span class="text-sm text-slate-400">{c.desc}</span>
      </a>
    {/each}
  </div>
</div>
