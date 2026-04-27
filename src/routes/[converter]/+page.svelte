<script lang="ts">
  import ConverterCard from "$lib/components/ConverterCard.svelte";
  import { get } from "$lib/converters/index";

  export let data: { slug: string };

  $: converter = get(data.slug)!;
</script>

<svelte:head>
  <title>{converter.title} · Conversion Tools</title>
</svelte:head>

<ConverterCard
  title={converter.title}
  units={converter.units}
  convert={(v, f, t) => converter.convert(v, f, t)}
  defaultFrom={converter.defaultFrom}
  defaultTo={converter.defaultTo}
/>
