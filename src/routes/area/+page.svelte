<script lang="ts">
  import ConverterCard from "$lib/components/ConverterCard.svelte";
  import { areaUnits, convertArea } from "$lib/conversions";
</script>

<svelte:head>
  <title>Area Converter · Conversion Tools</title>
</svelte:head>

<ConverterCard
  title="Area Converter"
  units={areaUnits}
  convert={convertArea}
  defaultFrom="m2"
  defaultTo="ft2"
/>
