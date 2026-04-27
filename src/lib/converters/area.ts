import { Grid2x2 } from "lucide-svelte";
import { LinearConverter } from "./_linear";
import type { UnitDef } from "./_base";

class AreaConverter extends LinearConverter {
  slug = "area";
  order = 4;
  title = "Area Converter";
  label = "Area";
  icon = Grid2x2;
  desc = "m², ha, ac, ft²…";
  defaultFrom = "m2";
  defaultTo = "ft2";
  units: UnitDef[] = [
    { label: "Square kilometre (km²)", value: "km2", group: "Metric" },
    { label: "Square metre (m²)", value: "m2", group: "Metric" },
    { label: "Square centimetre (cm²)", value: "cm2", group: "Metric" },
    { label: "Hectare (ha)", value: "ha", group: "Metric" },
    { label: "Acre (ac)", value: "ac", group: "Imperial" },
    { label: "Square mile (mi²)", value: "mi2", group: "Imperial" },
    { label: "Square yard (yd²)", value: "yd2", group: "Imperial" },
    { label: "Square foot (ft²)", value: "ft2", group: "Imperial" },
    { label: "Square inch (in²)", value: "in2", group: "Imperial" },
  ];
  protected factors = {
    km2: 1e6,
    m2: 1,
    cm2: 1e-4,
    ha: 1e4,
    ac: 4046.856,
    mi2: 2589988.11,
    yd2: 0.836127,
    ft2: 0.092903,
    in2: 6.4516e-4,
  };
}

export default new AreaConverter();
