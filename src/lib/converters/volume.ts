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
  defaultFrom = "L";
  defaultTo = "gal";
  units: UnitDef[] = [
    { label: "Cubic metre (m³)", value: "m3", group: "Metric" },
    { label: "Litre (L)", value: "L", group: "Metric" },
    { label: "Millilitre (mL)", value: "mL", group: "Metric" },
    { label: "US gallon (gal)", value: "gal", group: "Imperial (US)" },
    { label: "US quart (qt)", value: "qt", group: "Imperial (US)" },
    { label: "US pint (pt)", value: "pt", group: "Imperial (US)" },
    { label: "US cup (cup)", value: "cup", group: "Imperial (US)" },
    { label: "US fl oz (fl oz)", value: "floz", group: "Imperial (US)" },
    { label: "Imperial gallon", value: "impgal", group: "Imperial (UK)" },
    { label: "Cubic inch (in³)", value: "in3", group: "Other" },
    { label: "Cubic foot (ft³)", value: "ft3", group: "Other" },
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
