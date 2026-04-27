<script lang="ts">
  import ConverterCard from "$lib/components/ConverterCard.svelte";
  import { weightUnits, convertWeight } from "$lib/conversions";
</script>

<svelte:head>
  <title>Weight Converter · Conversion Tools</title>
</svelte:head>

<ConverterCard
  title="Weight / Mass Converter"
  units={weightUnits}
  convert={convertWeight}
  defaultFrom="kg"
  defaultTo="lb"
/>
