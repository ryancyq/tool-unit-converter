# Conversion Tools

Fast, offline-capable unit conversion tools.

## Converters

| Converter   | Notable units                                               |
| ----------- | ----------------------------------------------------------- |
| Length      | km, m, cm, mm, µm, mi, yd, ft, in, nautical mile            |
| Weight      | tonne, kg, g, mg, lb, oz, stone                             |
| Temperature | °C, °F, K                                                   |
| Area        | km², m², cm², ha, acre, mi², yd², ft², in²                  |
| Volume      | m³, L, mL, US/Imperial gallon, qt, pt, cup, fl oz, in³, ft³ |
| Speed       | m/s, km/h, mph, ft/s, knot, Mach                            |
| Data        | Bit, B, KB–PB (SI) and KiB–TiB (IEC binary)                 |

## Getting Started

```bash
npm install
npm run dev     # http://localhost:5173
```

## Scripts

```bash
npm run dev      # start development server
npm run build    # build static site to build/
npm run preview  # preview production build locally
npm run check    # type-check with svelte-check
```

## Deployment

Automatically built and deployed to GitHub Pages on every push to `main`. The `build/` directory is a fully self-contained static site — no server required.

To deploy under a subpath, set `BASE_PATH` before building:

```bash
BASE_PATH=/my-subpath npm run build
```
