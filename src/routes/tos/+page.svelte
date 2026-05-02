<svelte:head>
  <title>Terms of Service · Kaeru°</title>
</svelte:head>

<div class="space-y-4">
  <div class="card space-y-6">
    <div>
      <h1 class="text-lg font-semibold text-slate-100">Terms of Service</h1>
      <p class="mt-1 text-xs text-slate-500">Last updated: May 2026</p>
    </div>

    <div class="space-y-4 text-sm text-slate-300">
      <section class="space-y-1">
        <h2 class="font-medium text-slate-200">Use of the app</h2>
        <p>
          Kaeru° is a free, offline-capable unit conversion tool provided as-is.
          You may use it for personal or commercial purposes without
          restriction.
        </p>
      </section>

      <section class="space-y-1">
        <h2 class="font-medium text-slate-200">Accuracy</h2>
        <p>
          Conversions are provided for reference only. Always verify results
          independently for safety-critical or high-stakes applications.
        </p>
      </section>

      <section class="space-y-1">
        <h2 class="font-medium text-slate-200">Privacy</h2>
        <p>
          No personal data is collected or transmitted. Your settings are stored
          locally in your browser and never leave your device.
        </p>
      </section>

      <section class="space-y-1">
        <h2 class="font-medium text-slate-200">Disclaimer</h2>
        <p>
          This app is provided without warranty of any kind. The authors are not
          liable for any damages arising from its use.
        </p>
      </section>
    </div>
  </div>

  <button
    class="w-full rounded-lg border border-slate-600 py-2 text-sm text-slate-300 transition-colors hover:border-slate-400 hover:text-white"
    onclick={() => history.back()}
  >
    Back
  </button>
</div>
