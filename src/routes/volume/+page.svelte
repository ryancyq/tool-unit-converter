<script lang="ts">
  import ConverterCard from "$lib/components/ConverterCard.svelte";
  import { volumeUnits, convertVolume } from "$lib/conversions";
</script>

<svelte:head>
  <title>Volume Converter · Conversion Tools</title>
</svelte:head>

<ConverterCard
  title="Volume Converter"
  units={volumeUnits}
  convert={convertVolume}
  defaultFrom="L"
  defaultTo="gal"
/>
