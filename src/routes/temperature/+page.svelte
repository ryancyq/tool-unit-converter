<script lang="ts">
  import ConverterCard from "$lib/components/ConverterCard.svelte";
  import { temperatureUnits, convertTemperature } from "$lib/conversions";
</script>

<svelte:head>
  <title>Temperature Converter · Conversion Tools</title>
</svelte:head>

<ConverterCard
  title="Temperature Converter"
  units={temperatureUnits}
  convert={convertTemperature}
  defaultFrom="c"
  defaultTo="f"
/>
