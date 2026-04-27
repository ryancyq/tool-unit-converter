import type { ComponentType } from "svelte";

export type UnitDef = { label: string; value: string; group: string };

export abstract class Converter {
  abstract readonly slug: string;
  abstract readonly order: number;
  abstract readonly title: string;
  abstract readonly label: string;
  abstract readonly icon: ComponentType;
  abstract readonly desc: string;
  abstract readonly units: UnitDef[];
  abstract readonly defaultFrom: string;
  abstract readonly defaultTo: string;
  abstract convert(value: number, from: string, to: string): number;
}
