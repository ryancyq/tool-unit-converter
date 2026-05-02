import { Ruler } from "lucide-svelte";
import { LinearConverter } from "./_linear";
import type { UnitDef } from "./_base";

class LengthConverter extends LinearConverter {
  slug = "length";
  order = 1;
  title = "Length Converter";
  label = "Length";
  icon = Ruler;
  desc = "km, m, cm, mi, ft, in…";
  suggested = {
    default: { from: "km", to: "m" },
    metric: { from: "km", to: "m" },
    imperial: { from: "mi", to: "ft" },
  };
  units: UnitDef[] = [
    { label: "km", value: "km", description: "Kilometre", group: "Metric" },
    { label: "m", value: "m", description: "Metre", group: "Metric" },
    { label: "cm", value: "cm", description: "Centimetre", group: "Metric" },
    { label: "mm", value: "mm", description: "Millimetre", group: "Metric" },
    { label: "µm", value: "um", description: "Micrometre", group: "Metric" },
    { label: "mi", value: "mi", description: "Mile", group: "Imperial" },
    { label: "yd", value: "yd", description: "Yard", group: "Imperial" },
    { label: "ft", value: "ft", description: "Foot", group: "Imperial" },
    { label: "in", value: "in", description: "Inch", group: "Imperial" },
    {
      label: "nmi",
      value: "nmi",
      description: "Nautical mile",
      group: "Imperial",
    },
  ];
  protected factors = {
    km: 1000,
    m: 1,
    cm: 0.01,
    mm: 0.001,
    um: 1e-6,
    mi: 1609.344,
    yd: 0.9144,
    ft: 0.3048,
    in: 0.0254,
    nmi: 1852,
  };
}

export default new LengthConverter();
