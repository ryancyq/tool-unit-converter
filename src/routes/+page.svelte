<script lang="ts">
  import { getTools } from "$lib/tools";
  import FrogIcon from "$lib/components/FrogIcon.svelte";

  const tools = getTools();
</script>

<svelte:head>
  <title>Kaeru°</title>
  <meta name="description" content="Hop between units — works offline" />
</svelte:head>

<div class="space-y-6">
  <header class="flex flex-col items-center gap-2 text-center">
    <div class="flex items-center justify-center gap-4 text-sky-400">
      <span class="font-mono text-sm font-semibold">km</span>
      <div class="flex flex-col items-center">
        <svg
          width="64"
          height="20"
          viewBox="0 0 64 20"
          fill="none"
          class="text-sky-400/50"
        >
          <path
            d="M 4 18 Q 32 2 60 18"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-dasharray="4 2.5"
            stroke-linecap="round"
          />
        </svg>
        <FrogIcon size={52} class="-mt-1 text-sky-400" />
      </div>
      <span class="font-mono text-sm font-semibold">mi</span>
    </div>
    <h1 class="text-4xl font-bold text-sky-400">Kaeru°</h1>
    <p class="text-slate-400">Hop between units</p>
  </header>

  <!-- mobile: compact square grid; desktop: full card with description -->
  <div class="grid grid-cols-3 gap-3 sm:grid-cols-4 lg:grid-cols-3 lg:gap-4">
    {#each tools as tool}
      {@const Icon = tool.icon}
      <a
        href={tool.href}
        class="card group transition-colors hover:border hover:border-sky-600
               relative aspect-square overflow-hidden
               lg:aspect-auto lg:overflow-visible lg:flex lg:flex-col lg:gap-3"
      >
        <!-- mobile layout -->
        <div
          class="absolute inset-0 flex flex-col items-center justify-center gap-2 p-2 lg:hidden"
        >
          <Icon size={24} class="flex-shrink-0 text-sky-400" />
          <span
            class="text-center text-xs font-semibold leading-tight text-sky-300 group-hover:text-sky-200"
          >
            {tool.label}
          </span>
        </div>

        <!-- desktop layout -->
        <div class="hidden lg:contents">
          <Icon size={32} class="text-sky-400" />
          <span
            class="text-lg font-semibold text-sky-300 group-hover:text-sky-200"
          >
            {tool.label}
          </span>
          <span class="text-sm text-slate-400">{tool.desc}</span>
        </div>
      </a>
    {/each}
  </div>
</div>
