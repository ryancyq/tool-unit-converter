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
    { label: "Tonne (t)", value: "t", group: "Metric" },
    { label: "Kilogram (kg)", value: "kg", group: "Metric" },
    { label: "Gram (g)", value: "g", group: "Metric" },
    { label: "Milligram (mg)", value: "mg", group: "Metric" },
    { label: "Pound (lb)", value: "lb", group: "Imperial" },
    { label: "Ounce (oz)", value: "oz", group: "Imperial" },
    { label: "Stone (st)", value: "st", group: "Imperial" },
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
