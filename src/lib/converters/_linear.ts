import { Converter } from "./_base";

export abstract class LinearConverter extends Converter {
  protected abstract readonly factors: Record<string, number>;

  convert(value: number, from: string, to: string): number {
    return (value * this.factors[from]) / this.factors[to];
  }
}
