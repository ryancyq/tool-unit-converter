<script lang="ts">
  import { base } from "$app/paths";
  import {
    Ruler,
    Scale,
    Thermometer,
    Grid2x2,
    FlaskConical,
    Gauge,
    HardDrive,
  } from "lucide-svelte";
  import type { ComponentType } from "svelte";

  const converters: {
    href: string;
    label: string;
    icon: ComponentType;
    desc: string;
  }[] = [
    {
      href: `${base}/length`,
      label: "Length",
      icon: Ruler,
      desc: "km, m, cm, mi, ft, in…",
    },
    {
      href: `${base}/weight`,
      label: "Weight",
      icon: Scale,
      desc: "kg, g, lb, oz, st…",
    },
    {
      href: `${base}/temperature`,
      label: "Temperature",
      icon: Thermometer,
      desc: "°C, °F, K",
    },
    {
      href: `${base}/area`,
      label: "Area",
      icon: Grid2x2,
      desc: "m², ha, ac, ft²…",
    },
    {
      href: `${base}/volume`,
      label: "Volume",
      icon: FlaskConical,
      desc: "L, mL, gal, pt, fl oz…",
    },
    {
      href: `${base}/speed`,
      label: "Speed",
      icon: Gauge,
      desc: "m/s, km/h, mph, kn, Mach…",
    },
    {
      href: `${base}/data`,
      label: "Data",
      icon: HardDrive,
      desc: "B, KB, MB, GB, TiB…",
    },
  ];
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
        href={c.href}
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
