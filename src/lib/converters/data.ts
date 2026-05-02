import { HardDrive } from "lucide-svelte";
import { LinearConverter } from "./_linear";
import type { UnitDef } from "./_base";

class DataConverter extends LinearConverter {
  slug = "data";
  order = 7;
  title = "Data Storage Converter";
  label = "Data";
  icon = HardDrive;
  desc = "B, KB, MB, GB, TiB…";
  suggested = {
    default: { from: "GB", to: "GiB" },
    metric: { from: "GB", to: "GiB" },
    imperial: { from: "GB", to: "GiB" },
  };
  units: UnitDef[] = [
    { label: "b", value: "b", description: "Bit", group: "Decimal (SI)" },
    { label: "B", value: "B", description: "Byte", group: "Decimal (SI)" },
    {
      label: "KB",
      value: "KB",
      description: "Kilobyte",
      group: "Decimal (SI)",
    },
    {
      label: "MB",
      value: "MB",
      description: "Megabyte",
      group: "Decimal (SI)",
    },
    {
      label: "GB",
      value: "GB",
      description: "Gigabyte",
      group: "Decimal (SI)",
    },
    {
      label: "TB",
      value: "TB",
      description: "Terabyte",
      group: "Decimal (SI)",
    },
    {
      label: "PB",
      value: "PB",
      description: "Petabyte",
      group: "Decimal (SI)",
    },
    {
      label: "KiB",
      value: "KiB",
      description: "Kibibyte",
      group: "Binary (IEC)",
    },
    {
      label: "MiB",
      value: "MiB",
      description: "Mebibyte",
      group: "Binary (IEC)",
    },
    {
      label: "GiB",
      value: "GiB",
      description: "Gibibyte",
      group: "Binary (IEC)",
    },
    {
      label: "TiB",
      value: "TiB",
      description: "Tebibyte",
      group: "Binary (IEC)",
    },
  ];
  protected factors = {
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
  };
}

export default new DataConverter();
