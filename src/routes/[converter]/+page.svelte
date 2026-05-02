<script lang="ts">
  import Converter from "$lib/components/Converter.svelte";
  import { get } from "$lib/converters/index";

  export let data: { slug: string };

  $: converter = get(data.slug)!;
</script>

<svelte:head>
  <title>{converter.title} · Unit Conversion</title>
</svelte:head>

<Converter
  title={converter.title}
  icon={converter.icon}
  units={converter.units}
  convert={(v, f, t) => converter.convert(v, f, t)}
  suggested={converter.suggested}
  standalone={true}
/>
