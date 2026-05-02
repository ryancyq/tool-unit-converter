<script lang="ts">
  import { getTools } from "$lib/tools";

  const tools = getTools();
</script>

<svelte:head>
  <title>Unit Conversion Tool</title>
  <meta
    name="description"
    content="Unit and measurement conversion tools — works offline"
  />
</svelte:head>

<div class="space-y-8">
  <header class="text-center">
    <h1 class="text-4xl font-bold text-sky-400">Unit Conversion Tool</h1>
    <p class="mt-2 text-slate-400">Fast, offline-capable unit converters</p>
  </header>

  <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
    {#each tools as tool}
      <a
        href={tool.href}
        class="card group flex flex-col gap-3 transition-colors hover:border hover:border-sky-600"
      >
        <svelte:component this={tool.icon} size={32} class="text-sky-400" />
        <span
          class="text-lg font-semibold text-sky-300 group-hover:text-sky-200"
        >
          {tool.label}
        </span>
        <span class="text-sm text-slate-400">{tool.desc}</span>
      </a>
    {/each}
  </div>
</div>
