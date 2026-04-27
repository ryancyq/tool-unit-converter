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
  defaultFrom = "MB";
  defaultTo = "MiB";
  units: UnitDef[] = [
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
