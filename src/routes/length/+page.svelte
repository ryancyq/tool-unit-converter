<script lang="ts">
  import ConverterCard from "$lib/components/ConverterCard.svelte";
  import { lengthUnits, convertLength } from "$lib/conversions";
</script>

<svelte:head>
  <title>Length Converter · Conversion Tools</title>
</svelte:head>

<ConverterCard
  title="Length Converter"
  units={lengthUnits}
  convert={convertLength}
  defaultFrom="m"
  defaultTo="ft"
/>
