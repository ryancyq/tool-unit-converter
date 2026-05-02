import { FlaskConical } from "lucide-svelte";
import { LinearConverter } from "./_linear";
import type { UnitDef } from "./_base";

class VolumeConverter extends LinearConverter {
  slug = "volume";
  order = 5;
  title = "Volume Converter";
  label = "Volume";
  icon = FlaskConical;
  desc = "L, mL, gal, pt, fl oz…";
  suggested = {
    default: { from: "L", to: "mL" },
    metric: { from: "L", to: "mL" },
    imperial: { from: "gal", to: "floz" },
  };
  units: UnitDef[] = [
    { label: "m³", value: "m3", description: "Cubic metre", group: "Metric" },
    { label: "L", value: "L", description: "Litre", group: "Metric" },
    { label: "mL", value: "mL", description: "Millilitre", group: "Metric" },
    {
      label: "gal",
      value: "gal",
      description: "US gallon",
      group: "Imperial (US)",
    },
    {
      label: "qt",
      value: "qt",
      description: "US quart",
      group: "Imperial (US)",
    },
    {
      label: "pt",
      value: "pt",
      description: "US pint",
      group: "Imperial (US)",
    },
    {
      label: "cup",
      value: "cup",
      description: "US cup",
      group: "Imperial (US)",
    },
    {
      label: "fl oz",
      value: "floz",
      description: "US fl oz",
      group: "Imperial (US)",
    },
    {
      label: "imp gal",
      value: "impgal",
      description: "Imperial gallon",
      group: "Imperial (UK)",
    },
    { label: "in³", value: "in3", description: "Cubic inch", group: "Other" },
    { label: "ft³", value: "ft3", description: "Cubic foot", group: "Other" },
  ];
  protected factors = {
    m3: 1000,
    L: 1,
    mL: 0.001,
    gal: 3.785411784,
    qt: 0.946352946,
    pt: 0.473176473,
    cup: 0.2365882365,
    floz: 0.0295735296,
    impgal: 4.54609,
    in3: 0.016387064,
    ft3: 28.316846592,
  };
}

export default new VolumeConverter();
