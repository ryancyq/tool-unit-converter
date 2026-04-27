import type { Converter } from "./_base";

const modules = import.meta.glob<{ default: Converter }>(
  ["./*.ts", "!./_*.ts", "!./index.ts"],
  { eager: true },
);

const registry = new Map(
  Object.values(modules).map((m) => [m.default.slug, m.default]),
);

export function entries() {
  return [...registry.keys()].map((slug) => ({ converter: slug }));
}

export function get(slug: string): Converter | undefined {
  return registry.get(slug);
}

export function all(): Converter[] {
  return [...registry.values()].sort((a, b) => a.order - b.order);
}
