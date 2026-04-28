<script lang="ts">
  import { Monitor } from "lucide-svelte";

  type Preset = { label: string; w: number; h: number; diag?: number };
  type PresetGroup = { group: string; presets: Preset[] };

  const presetGroups: PresetGroup[] = [
    {
      group: "Standard",
      presets: [
        { label: "HD — 1280 × 720", w: 1280, h: 720 },
        { label: "Full HD (1080p) — 1920 × 1080", w: 1920, h: 1080 },
        { label: "QHD (1440p) — 2560 × 1440", w: 2560, h: 1440 },
        { label: "4K UHD — 3840 × 2160", w: 3840, h: 2160 },
        { label: "5K — 5120 × 2880", w: 5120, h: 2880 },
        { label: "8K — 7680 × 4320", w: 7680, h: 4320 },
      ],
    },
    {
      group: "Ultrawide",
      presets: [
        { label: "UW FHD — 2560 × 1080", w: 2560, h: 1080 },
        { label: "UW QHD — 3440 × 1440", w: 3440, h: 1440 },
        { label: "Super UW — 5120 × 1440", w: 5120, h: 1440 },
        { label: "UW 4K — 5120 × 2160", w: 5120, h: 2160 },
      ],
    },
    {
      group: "Apple",
      presets: [
        {
          label: 'MacBook Air 13" (M2/M3) — 2560 × 1664',
          w: 2560,
          h: 1664,
          diag: 13.6,
        },
        {
          label: 'MacBook Air 15" (M2/M3) — 2880 × 1864',
          w: 2880,
          h: 1864,
          diag: 15.3,
        },
        {
          label: 'MacBook Pro 14" — 3024 × 1964',
          w: 3024,
          h: 1964,
          diag: 14.2,
        },
        {
          label: 'MacBook Pro 16" — 3456 × 2234',
          w: 3456,
          h: 2234,
          diag: 16.2,
        },
        { label: 'iMac 24" — 4480 × 2520', w: 4480, h: 2520, diag: 23.5 },
        {
          label: 'Studio Display 27" (5K Retina) — 5120 × 2880',
          w: 5120,
          h: 2880,
          diag: 27,
        },
        {
          label: 'Pro Display XDR 32" (6K Retina) — 6016 × 3384',
          w: 6016,
          h: 3384,
          diag: 31.6,
        },
      ],
    },
  ];

  let horizRes = "";
  let vertRes = "";
  let diagonal = "";
  let diagUnit: "in" | "cm" = "in";

  function applyPreset(e: Event) {
    const sel = e.target as HTMLSelectElement;
    const val = sel.value;
    if (!val) return;
    const idx = parseInt(val);
    const preset = presetGroups.flatMap((g) => g.presets)[idx];
    horizRes = String(preset.w);
    vertRes = String(preset.h);
    if (preset.diag != null) {
      diagonal = String(preset.diag);
      diagUnit = "in";
    }
    sel.value = "";
  }

  function gcd(a: number, b: number): number {
    return b === 0 ? a : gcd(b, a % b);
  }

  $: h = parseInt(horizRes) || 0;
  $: v = parseInt(vertRes) || 0;
  $: d = parseFloat(diagonal) || 0;
  $: dIn = diagUnit === "cm" ? d / 2.54 : d;

  $: valid = h > 0 && v > 0 && dIn > 0;

  $: ppi = valid ? Math.sqrt(h * h + v * v) / dIn : null;
  $: megapixels = valid ? (h * v) / 1_000_000 : null;
  $: aspectRatio = valid
    ? (() => {
        const g = gcd(h, v);
        return `${h / g}:${v / g}`;
      })()
    : null;
  $: physWidthIn = valid && ppi ? h / ppi : null;
  $: physHeightIn = valid && ppi ? v / ppi : null;
  $: dotPitchMm = valid && ppi ? 25.4 / ppi : null;

  type Tier = {
    label: string;
    good: boolean;
    description: string;
  };

  $: tier = ((): Tier | null => {
    if (!ppi) return null;
    if (ppi < 130)
      return {
        label: "Sharp at standard resolution (1×)",
        good: true,
        description:
          "Everything will look crisp at macOS's default setting. This display runs natively at 1× — no scaling tricks needed, so text and graphics stay pixel-perfect with no extra GPU work.",
      };
    if (ppi < 200)
      return {
        label: "May look blurry on macOS — scaling mismatch",
        good: false,
        description:
          "This PPI sits in an awkward range: too dense to look sharp at 1× (text appears small), yet not dense enough to run cleanly at 2× Retina. macOS will use fractional scaling to compensate, which softens the image. Technically: no integer scaling factor produces a clean pixel grid, leading to subpixel blending, higher VRAM usage, and potential shimmer during animations.",
      };
    return {
      label: "Sharp at Retina resolution (2×)",
      good: true,
      description:
        "Everything will look crisp at macOS's HiDPI Retina setting. The display is dense enough that 2× scaling works cleanly — each on-screen point maps to exactly 4 physical pixels, giving sharp text and graphics with no blurring.",
    };
  })();

  function fmt(n: number, decimals = 2): string {
    return n.toLocaleString("en-US", {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    });
  }
</script>

<svelte:head>
  <title>Screen PPI Calculator · Conversion Tools</title>
  <meta
    name="description"
    content="Calculate pixels per inch (PPI) for any monitor and check macOS HiDPI scaling compatibility."
  />
</svelte:head>

<div class="space-y-4">
  <div class="card space-y-6">
    <h2 class="flex items-center gap-2 text-xl font-semibold text-sky-400">
      <Monitor size={22} />
      Screen PPI Calculator
    </h2>

    <div class="grid grid-cols-2 gap-x-4 gap-y-4">
      <!-- row 1: diagonal (left) | preset (right) -->
      <div>
        <label
          for="diagonal"
          class="mb-1 block text-xs font-medium uppercase tracking-wide text-slate-400"
          >Diagonal size</label
        >
        <div class="flex h-[42px] gap-2">
          <div class="relative flex flex-1 items-center">
            <input
              id="diagonal"
              type="text"
              inputmode="decimal"
              placeholder={diagUnit === "in" ? "e.g. 27" : "e.g. 68.6"}
              bind:value={diagonal}
              class="input-field h-full w-full pr-12"
            />
            <span
              class="pointer-events-none absolute right-3 text-sm text-slate-400"
              >{diagUnit}</span
            >
          </div>
          <div
            class="flex h-full overflow-hidden rounded-lg border border-slate-600 text-sm"
          >
            <button
              class="px-2.5 transition-colors {diagUnit === 'in'
                ? 'bg-sky-600 text-white'
                : 'text-slate-400 hover:text-white'}"
              on:click={() => (diagUnit = "in")}>in</button
            >
            <button
              class="px-2.5 transition-colors {diagUnit === 'cm'
                ? 'bg-sky-600 text-white'
                : 'text-slate-400 hover:text-white'}"
              on:click={() => (diagUnit = "cm")}>cm</button
            >
          </div>
        </div>
      </div>

      <div>
        <label
          for="preset"
          class="mb-1 block text-xs font-medium uppercase tracking-wide text-slate-400"
          >Resolution preset</label
        >
        <select
          id="preset"
          class="select-field text-sm"
          on:change={applyPreset}
        >
          <option value="">Select a display…</option>
          {#each presetGroups as { group, presets }, gi}
            <optgroup label={group}>
              {#each presets as p, pi}
                {@const idx =
                  presetGroups
                    .slice(0, gi)
                    .reduce((s, g) => s + g.presets.length, 0) + pi}
                <option value={idx}>{p.label}</option>
              {/each}
            </optgroup>
          {/each}
        </select>
      </div>

      <!-- row 2: horizontal (left) | vertical (right) -->
      <div>
        <label
          for="horiz-res"
          class="mb-1 block text-xs font-medium uppercase tracking-wide text-slate-400"
          >Horizontal resolution</label
        >
        <div class="relative flex h-[42px] items-center">
          <input
            id="horiz-res"
            type="text"
            inputmode="numeric"
            placeholder="e.g. 2560"
            bind:value={horizRes}
            class="input-field h-full w-full pr-14"
          />
          <span
            class="pointer-events-none absolute right-3 text-sm text-slate-400"
            >px</span
          >
        </div>
      </div>

      <div>
        <label
          for="vert-res"
          class="mb-1 block text-xs font-medium uppercase tracking-wide text-slate-400"
          >Vertical resolution</label
        >
        <div class="relative flex h-[42px] items-center">
          <input
            id="vert-res"
            type="text"
            inputmode="numeric"
            placeholder="e.g. 1440"
            bind:value={vertRes}
            class="input-field h-full w-full pr-14"
          />
          <span
            class="pointer-events-none absolute right-3 text-sm text-slate-400"
            >px</span
          >
        </div>
      </div>
    </div>

    {#if valid && ppi !== null}
      <div class="space-y-3 border-t border-slate-700 pt-4">
        <div class="flex items-baseline gap-3">
          <span id="ppi-result" class="text-5xl font-bold text-sky-300"
            >{fmt(ppi, 1)}</span
          >
          <span class="text-xl text-slate-400">PPI</span>
        </div>

        {#if physWidthIn !== null && physHeightIn !== null}
          <div
            class="rounded-lg border border-slate-700 bg-slate-800/40 px-4 py-3"
          >
            <p
              class="text-xs font-medium uppercase tracking-wide text-slate-500"
            >
              Physical display size
            </p>
            <p class="mt-1 text-lg font-semibold text-slate-200">
              {#if diagUnit === "in"}
                {fmt(physWidthIn, 2)}" × {fmt(physHeightIn, 2)}"
                <span class="ml-2 text-sm font-normal text-slate-400">
                  ({fmt(physWidthIn * 2.54, 2)} cm × {fmt(
                    physHeightIn * 2.54,
                    2,
                  )} cm)
                </span>
              {:else}
                {fmt(physWidthIn * 2.54, 2)} cm × {fmt(physHeightIn * 2.54, 2)} cm
                <span class="ml-2 text-sm font-normal text-slate-400">
                  ({fmt(physWidthIn, 2)}" × {fmt(physHeightIn, 2)}")
                </span>
              {/if}
            </p>
          </div>
        {/if}

        <!-- megapixels / aspect ratio / dot pitch -->
        <div class="grid grid-cols-3 gap-3">
          <div
            class="rounded-lg border border-slate-700 bg-slate-800/40 px-4 py-3"
          >
            <p
              class="text-xs font-medium uppercase tracking-wide text-slate-500"
            >
              Megapixels
            </p>
            <p class="mt-1 text-lg font-semibold text-slate-200">
              {fmt(megapixels!, 2)} MP
            </p>
          </div>

          <div
            class="rounded-lg border border-slate-700 bg-slate-800/40 px-4 py-3"
          >
            <p
              class="text-xs font-medium uppercase tracking-wide text-slate-500"
            >
              Aspect ratio
            </p>
            <p class="mt-1 text-lg font-semibold text-slate-200">
              {aspectRatio}
            </p>
          </div>

          <div
            class="rounded-lg border border-slate-700 bg-slate-800/40 px-4 py-3"
          >
            <p
              class="text-xs font-medium uppercase tracking-wide text-slate-500"
            >
              Dot pitch
            </p>
            <p class="mt-1 text-lg font-semibold text-slate-200">
              {fmt(dotPitchMm!, 4)} mm
            </p>
          </div>
        </div>
      </div>
    {/if}
  </div>

  {#if tier}
    <div
      class="card border {tier.good
        ? 'border-green-700 bg-green-900/10'
        : 'border-red-700 bg-red-900/10'} space-y-2"
    >
      <div class="flex items-center gap-2">
        <span
          class="inline-block h-2.5 w-2.5 rounded-full {tier.good
            ? 'bg-green-400'
            : 'bg-red-400'}"
        ></span>
        <h3
          class="font-semibold {tier.good ? 'text-green-300' : 'text-red-300'}"
        >
          macOS scaling: {tier.label}
        </h3>
      </div>
      <p class="text-sm text-slate-300">{tier.description}</p>
      <p class="text-sm">
        <a
          href="https://bjango.com/articles/macexternaldisplays/"
          target="_blank"
          rel="noopener noreferrer"
          class="text-sky-400 underline hover:text-sky-300"
          >Learn more about macOS external display scaling →</a
        >
      </p>
    </div>
  {:else if !valid && (horizRes || vertRes || diagonal)}
    <div class="card border border-slate-700 text-sm text-slate-400">
      Enter all three values to see results.
    </div>
  {/if}
</div>
