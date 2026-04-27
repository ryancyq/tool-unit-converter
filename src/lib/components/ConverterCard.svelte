<script lang="ts">
  import { ArrowLeftRight } from "lucide-svelte";
  import type { UnitDef } from "$lib/converters/_base";

  export let title: string;
  export let units: UnitDef[];
  export let convert: (value: number, from: string, to: string) => number;
  export let defaultFrom: string = units[0].value;
  export let defaultTo: string = units[1].value;

  let inputValue = "";
  let fromUnit = defaultFrom;
  let toUnit = defaultTo;

  function groupedUnits(list: UnitDef[]): [string, UnitDef[]][] {
    const map = new Map<string, UnitDef[]>();
    for (const u of list) {
      if (!map.has(u.group)) map.set(u.group, []);
      map.get(u.group)!.push(u);
    }
    return [...map.entries()];
  }

  function swap() {
    [fromUnit, toUnit] = [toUnit, fromUnit];
  }

  function formatResult(n: number): string {
    if (Number.isInteger(n)) return n.toString();
    // up to 7 significant figures, strip trailing zeros
    return parseFloat(n.toPrecision(7)).toString();
  }

  $: result = (() => {
    const num = parseFloat(inputValue);
    if (isNaN(num) || inputValue === "") return null;
    return convert(num, fromUnit, toUnit);
  })();

  $: toLabel = units.find((u) => u.value === toUnit)?.label ?? "";
</script>

<div class="card space-y-4">
  <h2 class="text-xl font-semibold text-sky-400">{title}</h2>

  <div class="grid grid-cols-[1fr_auto_1fr] items-end gap-x-2 gap-y-4">
    <!-- FROM -->
    <div>
      <label
        class="mb-1 block text-xs font-medium uppercase tracking-wide text-slate-400"
        >From</label
      >
      <select class="select-field" bind:value={fromUnit}>
        {#each groupedUnits(units) as [group, groupUnits]}
          <optgroup label={group}>
            {#each groupUnits as unit}
              <option value={unit.value}>{unit.label}</option>
            {/each}
          </optgroup>
        {/each}
      </select>
    </div>

    <!-- swap -->
    <button
      class="flex h-[42px] w-[42px] flex-shrink-0 items-center justify-center rounded-lg border border-slate-600 text-slate-400
             transition-colors hover:border-sky-500 hover:text-sky-400"
      title="Swap units"
      on:click={swap}
    >
      <ArrowLeftRight size={18} />
    </button>

    <!-- TO -->
    <div>
      <label
        class="mb-1 block text-xs font-medium uppercase tracking-wide text-slate-400"
        >To</label
      >
      <select class="select-field" bind:value={toUnit}>
        {#each groupedUnits(units) as [group, groupUnits]}
          <optgroup label={group}>
            {#each groupUnits as unit}
              <option value={unit.value}>{unit.label}</option>
            {/each}
          </optgroup>
        {/each}
      </select>
    </div>

    <!-- VALUE -->
    <div>
      <label
        class="mb-1 block text-xs font-medium uppercase tracking-wide text-slate-400"
        >Value</label
      >
      <input
        type="number"
        class="input-field"
        placeholder="Enter value"
        bind:value={inputValue}
      />
    </div>

    <!-- empty space below swap -->
    <div></div>

    <!-- RESULT -->
    <div>
      <label
        class="mb-1 block text-xs font-medium uppercase tracking-wide text-slate-400"
        >Result</label
      >
      <div
        class="flex h-[42px] items-center rounded-lg border border-slate-700 bg-surface px-4"
      >
        {#if result !== null}
          <span class="text-lg font-semibold text-sky-300"
            >{formatResult(result)}</span
          >
          <span class="ml-2 truncate text-sm text-slate-400"
            >{toLabel.replace(/\s*\(.*\)/, "")}</span
          >
        {:else}
          <span class="text-slate-600">—</span>
        {/if}
      </div>
    </div>
  </div>
</div>
