import { Gauge } from "lucide-svelte";
import { LinearConverter } from "./_linear";
import type { UnitDef } from "./_base";

class SpeedConverter extends LinearConverter {
  slug = "speed";
  order = 6;
  title = "Speed Converter";
  label = "Speed";
  icon = Gauge;
  desc = "m/s, km/h, mph, kn, Mach…";
  suggested = {
    default: { from: "kmh", to: "ms" },
    metric: { from: "kmh", to: "ms" },
    imperial: { from: "mph", to: "fts" },
  };
  units: UnitDef[] = [
    { label: "m/s", value: "ms", description: "Metre/second", group: "Metric" },
    {
      label: "km/h",
      value: "kmh",
      description: "Kilometre/hour",
      group: "Metric",
    },
    { label: "mph", value: "mph", description: "Mile/hour", group: "Imperial" },
    {
      label: "ft/s",
      value: "fts",
      description: "Foot/second",
      group: "Imperial",
    },
    { label: "kn", value: "kn", description: "Knot", group: "Other" },
    { label: "Mach", value: "mach", description: "Mach", group: "Other" },
  ];
  protected factors = {
    ms: 1,
    kmh: 1 / 3.6,
    mph: 0.44704,
    fts: 0.3048,
    kn: 0.514444,
    mach: 340.29,
  };
}

export default new SpeedConverter();
