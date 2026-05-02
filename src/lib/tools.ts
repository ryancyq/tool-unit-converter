import type { ComponentType } from "svelte";
import { Monitor } from "lucide-svelte";
import { base } from "$app/paths";
import { all } from "$lib/converters/index";

export type ToolEntry = {
  slug: string;
  label: string;
  desc: string;
  icon: ComponentType;
  href: string;
};

export function getTools(): ToolEntry[] {
  return [
    ...all().map((c) => ({
      slug: c.slug,
      label: c.label,
      desc: c.desc,
      icon: c.icon,
      href: `${base}/${c.slug}`,
    })),
    {
      slug: "screen-ppi",
      label: "Screen PPI",
      desc: "PPI, megapixels, aspect ratio — macOS HiDPI scaling check",
      icon: Monitor as ComponentType,
      href: `${base}/screen-ppi`,
    },
  ];
}
