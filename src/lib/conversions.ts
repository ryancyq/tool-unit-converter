export type UnitDef = { label: string; value: string; group: string };

type ConversionMap = Record<string, number>; // factor relative to SI base unit

function makeConverter(toBase: ConversionMap) {
  return (value: number, from: string, to: string): number => {
    const base = value * toBase[from];
    return base / toBase[to];
  };
}

// ── Length (base: metre) ──────────────────────────────────────────────────────
export const lengthUnits: UnitDef[] = [
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
export const convertLength = makeConverter({
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
});

// ── Weight / Mass (base: kilogram) ───────────────────────────────────────────
export const weightUnits: UnitDef[] = [
  { label: "Tonne (t)", value: "t", group: "Metric" },
  { label: "Kilogram (kg)", value: "kg", group: "Metric" },
  { label: "Gram (g)", value: "g", group: "Metric" },
  { label: "Milligram (mg)", value: "mg", group: "Metric" },
  { label: "Pound (lb)", value: "lb", group: "Imperial" },
  { label: "Ounce (oz)", value: "oz", group: "Imperial" },
  { label: "Stone (st)", value: "st", group: "Imperial" },
];
export const convertWeight = makeConverter({
  t: 1000,
  kg: 1,
  g: 0.001,
  mg: 1e-6,
  lb: 0.45359237,
  oz: 0.028349523,
  st: 6.35029318,
});

// ── Temperature (special: non-linear) ────────────────────────────────────────
export const temperatureUnits: UnitDef[] = [
  { label: "Celsius (°C)", value: "c", group: "Metric" },
  { label: "Kelvin (K)", value: "k", group: "Metric" },
  { label: "Fahrenheit (°F)", value: "f", group: "Imperial" },
];
export function convertTemperature(
  value: number,
  from: string,
  to: string,
): number {
  let celsius: number;
  switch (from) {
    case "f":
      celsius = ((value - 32) * 5) / 9;
      break;
    case "k":
      celsius = value - 273.15;
      break;
    default:
      celsius = value;
  }
  switch (to) {
    case "f":
      return (celsius * 9) / 5 + 32;
    case "k":
      return celsius + 273.15;
    default:
      return celsius;
  }
}

// ── Area (base: m²) ───────────────────────────────────────────────────────────
export const areaUnits: UnitDef[] = [
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
export const convertArea = makeConverter({
  km2: 1e6,
  m2: 1,
  cm2: 1e-4,
  ha: 1e4,
  ac: 4046.856,
  mi2: 2589988.11,
  yd2: 0.836127,
  ft2: 0.092903,
  in2: 6.4516e-4,
});

// ── Volume (base: litre) ──────────────────────────────────────────────────────
export const volumeUnits: UnitDef[] = [
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
export const convertVolume = makeConverter({
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
});

// ── Speed (base: m/s) ─────────────────────────────────────────────────────────
export const speedUnits: UnitDef[] = [
  { label: "Metre/second (m/s)", value: "ms", group: "Metric" },
  { label: "Kilometre/hour (km/h)", value: "kmh", group: "Metric" },
  { label: "Mile/hour (mph)", value: "mph", group: "Imperial" },
  { label: "Foot/second (ft/s)", value: "fts", group: "Imperial" },
  { label: "Knot (kn)", value: "kn", group: "Other" },
  { label: "Mach (M)", value: "mach", group: "Other" },
];
export const convertSpeed = makeConverter({
  ms: 1,
  kmh: 1 / 3.6,
  mph: 0.44704,
  kn: 0.514444,
  fts: 0.3048,
  mach: 340.29,
});

// ── Digital storage (base: byte) ──────────────────────────────────────────────
export const dataUnits: UnitDef[] = [
  { label: "Bit (b)", value: "b", group: "Decimal (SI)" },
  { label: "Byte (B)", value: "B", group: "Decimal (SI)" },
  { label: "Kilobyte (KB)", value: "KB", group: "Decimal (SI)" },
  { label: "Megabyte (MB)", value: "MB", group: "Decimal (SI)" },
  { label: "Gigabyte (GB)", value: "GB", group: "Decimal (SI)" },
  { label: "Terabyte (TB)", value: "TB", group: "Decimal (SI)" },
  { label: "Petabyte (PB)", value: "PB", group: "Decimal (SI)" },
  { label: "Kibibyte (KiB)", value: "KiB", group: "Binary (IEC)" },
  { label: "Mebibyte (MiB)", value: "MiB", group: "Binary (IEC)" },
  { label: "Gibibyte (GiB)", value: "GiB", group: "Binary (IEC)" },
  { label: "Tebibyte (TiB)", value: "TiB", group: "Binary (IEC)" },
];
export const convertData = makeConverter({
  b: 0.125,
  B: 1,
  KB: 1e3,
  MB: 1e6,
  GB: 1e9,
  TB: 1e12,
  PB: 1e15,
  KiB: 1024,
  MiB: 1048576,
  GiB: 1073741824,
  TiB: 1099511627776,
});
