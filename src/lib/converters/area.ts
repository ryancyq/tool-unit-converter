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
    {
      label: "km²",
      value: "km2",
      description: "Square kilometre",
      group: "Metric",
    },
    { label: "m²", value: "m2", description: "Square metre", group: "Metric" },
    {
      label: "cm²",
      value: "cm2",
      description: "Square centimetre",
      group: "Metric",
    },
    { label: "ha", value: "ha", description: "Hectare", group: "Metric" },
    { label: "ac", value: "ac", description: "Acre", group: "Imperial" },
    {
      label: "mi²",
      value: "mi2",
      description: "Square mile",
      group: "Imperial",
    },
    {
      label: "yd²",
      value: "yd2",
      description: "Square yard",
      group: "Imperial",
    },
    {
      label: "ft²",
      value: "ft2",
      description: "Square foot",
      group: "Imperial",
    },
    {
      label: "in²",
      value: "in2",
      description: "Square inch",
      group: "Imperial",
    },
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
