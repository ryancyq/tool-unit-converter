<script lang="ts">
  import ConverterCard from "$lib/components/ConverterCard.svelte";
  import { speedUnits, convertSpeed } from "$lib/conversions";
</script>

<svelte:head>
  <title>Speed Converter · Conversion Tools</title>
</svelte:head>

<ConverterCard
  title="Speed Converter"
  units={speedUnits}
  convert={convertSpeed}
  defaultFrom="kmh"
  defaultTo="mph"
/>
