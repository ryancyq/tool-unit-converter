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
  defaultFrom = "m";
  defaultTo = "ft";
  units: UnitDef[] = [
    { label: "Kilometre (km)", value: "km", group: "Metric" },
    { label: "Metre (m)", value: "m", group: "Metric" },
    { label: "Centimetre (cm)", value: "cm", group: "Metric" },
    { label: "Millimetre (mm)", value: "mm", group: "Metric" },
    { label: "Micrometre (µm)", value: "um", group: "Metric" },
    { label: "Mile (mi)", value: "mi", group: "Imperial" },
    { label: "Yard (yd)", value: "yd", group: "Imperial" },
    { label: "Foot (ft)", value: "ft", group: "Imperial" },
    { label: "Inch (in)", value: "in", group: "Imperial" },
    { label: "Nautical mile (nmi)", value: "nmi", group: "Imperial" },
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
