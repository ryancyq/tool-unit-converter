import { Scale } from "lucide-svelte";
import { LinearConverter } from "./_linear";
import type { UnitDef } from "./_base";

class WeightConverter extends LinearConverter {
  slug = "weight";
  order = 2;
  title = "Weight / Mass Converter";
  label = "Weight";
  icon = Scale;
  desc = "kg, g, lb, oz, st…";
  defaultFrom = "kg";
  defaultTo = "lb";
  units: UnitDef[] = [
    { label: "t", value: "t", description: "Tonne", group: "Metric" },
    { label: "kg", value: "kg", description: "Kilogram", group: "Metric" },
    { label: "g", value: "g", description: "Gram", group: "Metric" },
    { label: "mg", value: "mg", description: "Milligram", group: "Metric" },
    { label: "lb", value: "lb", description: "Pound", group: "Imperial" },
    { label: "oz", value: "oz", description: "Ounce", group: "Imperial" },
    { label: "st", value: "st", description: "Stone", group: "Imperial" },
  ];
  protected factors = {
    t: 1000,
    kg: 1,
    g: 0.001,
    mg: 1e-6,
    lb: 0.45359237,
    oz: 0.028349523,
    st: 6.35029318,
  };
}

export default new WeightConverter();
