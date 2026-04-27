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
  defaultFrom = "kmh";
  defaultTo = "mph";
  units: UnitDef[] = [
    { label: "Metre/second (m/s)", value: "ms", group: "Metric" },
    { label: "Kilometre/hour (km/h)", value: "kmh", group: "Metric" },
    { label: "Mile/hour (mph)", value: "mph", group: "Imperial" },
    { label: "Foot/second (ft/s)", value: "fts", group: "Imperial" },
    { label: "Knot (kn)", value: "kn", group: "Other" },
    { label: "Mach (M)", value: "mach", group: "Other" },
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
