<script lang="ts">
  import { ArrowLeftRight, ArrowUpDown, Calculator } from "lucide-svelte";
  import type { ComponentType } from "svelte";
  import type { UnitDef } from "$lib/converters/_base";

  export let title: string;
  export let icon: ComponentType = Calculator;
  export let units: UnitDef[];
  export let convert: (value: number, from: string, to: string) => number;
  export let defaultFrom: string = units[0].value;
  export let defaultTo: string = units[1].value;

  let rawValue = "";
  let inputDisplay = "";
  $: fromUnit = defaultFrom;
  $: toUnit = defaultTo;

  let inputEl: HTMLInputElement;
  let mirrorWidth = 0;
  $: suffixLeft = 16 + mirrorWidth + 8;

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

  function formatNumber(n: number): string {
    if (Number.isInteger(n)) return n.toLocaleString("en-US");
    const rounded = parseFloat(n.toPrecision(7));
    return rounded.toLocaleString("en-US", { maximumSignificantDigits: 7 });
  }

  $: result = (() => {
    const num = parseFloat(rawValue);
    if (isNaN(num)) return null;
    const converted = convert(num, fromUnit, toUnit);
    return isNaN(converted) ? null : converted;
  })();

  function onInput(e: Event) {
    const val = (e.target as HTMLInputElement).value;
    inputDisplay = val;
    rawValue = val.replace(/,/g, "");
  }

  function onBlur() {
    const num = parseFloat(rawValue);
    if (!isNaN(num)) {
      inputDisplay = num.toLocaleString("en-US", { maximumFractionDigits: 15 });
      inputEl.value = inputDisplay;
    }
  }

  function onFocus() {
    inputDisplay = rawValue;
    inputEl.value = rawValue;
  }
</script>

<div class="card space-y-4">
  <h2 class="flex items-center gap-2 text-xl font-semibold text-sky-400">
    <svelte:component this={icon} size={22} />
    {title}
  </h2>

  <div
    class="flex flex-col gap-4 sm:grid sm:grid-cols-[1fr_auto_1fr] sm:items-end sm:gap-x-2"
  >
    <div class="flex items-end gap-2 sm:contents">
      <div class="min-w-0 flex-1">
        <label
          for="from-unit"
          class="mb-1 block text-xs font-medium uppercase tracking-wide text-slate-400"
          >From</label
        >
        <select id="from-unit" class="select-field" bind:value={fromUnit}>
          {#each groupedUnits(units) as [group, groupUnits]}
            <optgroup label={group}>
              {#each groupUnits as unit}
                <option value={unit.value}>{unit.label}</option>
              {/each}
            </optgroup>
          {/each}
        </select>
      </div>

      <button
        class="flex h-[42px] w-[42px] flex-shrink-0 items-center justify-center rounded-lg border border-slate-600 text-slate-400
               transition-colors hover:border-sky-500 hover:text-sky-400"
        title="Swap units"
        on:click={swap}
      >
        <ArrowUpDown size={18} class="sm:hidden" />
        <ArrowLeftRight size={18} class="hidden sm:block" />
      </button>
    </div>

    <div>
      <label
        for="to-unit"
        class="mb-1 block text-xs font-medium uppercase tracking-wide text-slate-400"
        >To</label
      >
      <select id="to-unit" class="select-field" bind:value={toUnit}>
        {#each groupedUnits(units) as [group, groupUnits]}
          <optgroup label={group}>
            {#each groupUnits as unit}
              <option value={unit.value}>{unit.label}</option>
            {/each}
          </optgroup>
        {/each}
      </select>
    </div>

    <div>
      <label
        for="value-input"
        class="mb-1 block text-xs font-medium uppercase tracking-wide text-slate-400"
        >Value</label
      >
      <div
        class="relative flex h-[42px] w-full items-center overflow-hidden rounded-lg border border-slate-600 bg-surface focus-within:border-sky-500 focus-within:ring-1 focus-within:ring-sky-500"
      >
        <span
          aria-hidden="true"
          class="invisible absolute whitespace-pre text-base"
          bind:offsetWidth={mirrorWidth}>{inputDisplay}</span
        >
        <input
          id="value-input"
          type="text"
          inputmode="decimal"
          class="h-full w-full bg-transparent px-4 text-slate-100 placeholder-slate-400 outline-none"
          placeholder="Enter value"
          bind:this={inputEl}
          on:input={onInput}
          on:blur={onBlur}
          on:focus={onFocus}
        />
        {#if rawValue !== ""}
          <span
            class="pointer-events-none absolute text-sm text-slate-400"
            style="left: {suffixLeft}px">{fromUnit}</span
          >
        {/if}
      </div>
    </div>

    <div class="hidden sm:block"></div>

    <div>
      <label
        for="result-output"
        class="mb-1 block text-xs font-medium uppercase tracking-wide text-slate-400"
        >Result</label
      >
      <output
        id="result-output"
        class="flex h-[42px] items-center rounded-lg border border-slate-700 bg-surface px-4"
      >
        {#if result !== null}
          <span class="text-lg font-semibold text-sky-300"
            >{formatNumber(result)}</span
          >
          <span class="ml-2 truncate text-sm text-slate-400">{toUnit}</span>
        {:else}
          <span class="text-slate-600">—</span>
        {/if}
      </output>
    </div>
  </div>
</div>
