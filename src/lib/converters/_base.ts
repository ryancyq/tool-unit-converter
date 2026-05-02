import type { ComponentType } from "svelte";

export type UnitDef = {
  label: string;
  value: string;
  description: string;
  group: string;
};

export type SuggestedPair = { from: string; to: string };

export abstract class Converter {
  abstract readonly slug: string;
  abstract readonly order: number;
  abstract readonly title: string;
  abstract readonly label: string;
  abstract readonly icon: ComponentType;
  abstract readonly desc: string;
  abstract readonly units: UnitDef[];
  abstract readonly suggested: Record<
    "default" | "metric" | "imperial",
    SuggestedPair
  >;
  abstract convert(value: number, from: string, to: string): number;
}
