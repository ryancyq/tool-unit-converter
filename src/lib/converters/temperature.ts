import { Thermometer } from "lucide-svelte";
import { Converter } from "./_base";
import type { UnitDef } from "./_base";

class TemperatureConverter extends Converter {
  slug = "temperature";
  order = 3;
  title = "Temperature Converter";
  label = "Temperature";
  icon = Thermometer;
  desc = "°C, °F, K";
  suggested = {
    default: { from: "c", to: "f" },
    metric: { from: "c", to: "k" },
    imperial: { from: "f", to: "c" },
  };
  units: UnitDef[] = [
    { label: "°C", value: "c", description: "Celsius", group: "Metric" },
    { label: "K", value: "k", description: "Kelvin", group: "Metric" },
    { label: "°F", value: "f", description: "Fahrenheit", group: "Imperial" },
  ];

  convert(value: number, from: string, to: string): number {
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
}

export default new TemperatureConverter();
