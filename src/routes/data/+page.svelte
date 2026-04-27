<script lang="ts">
  import ConverterCard from "$lib/components/ConverterCard.svelte";
  import { dataUnits, convertData } from "$lib/conversions";
</script>

<svelte:head>
  <title>Data Storage Converter · Conversion Tools</title>
</svelte:head>

<ConverterCard
  title="Data Storage Converter"
  units={dataUnits}
  convert={convertData}
  defaultFrom="MB"
  defaultTo="MiB"
/>
