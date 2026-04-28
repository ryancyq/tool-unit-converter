# Unit Conversion Tool

Fast, offline-capable unit converters and measurement tools.

## Tools

| Tool        | Description / Notable units                                          |
| ----------- | -------------------------------------------------------------------- |
| Length      | km, m, cm, mm, µm, mi, yd, ft, in, nmi                               |
| Weight      | t, kg, g, mg, lb, oz, st                                             |
| Temperature | °C, °F, K                                                            |
| Area        | km², m², cm², ha, ac, mi², yd², ft², in²                             |
| Volume      | m³, L, mL, gal (US), imp gal, qt, pt, cup, fl oz, in³, ft³           |
| Speed       | m/s, km/h, mph, ft/s, kn, Mach                                       |
| Data        | b, B, KB–PB (SI decimal) and KiB–TiB (IEC binary)                    |
| Screen PPI  | PPI, megapixels, aspect ratio, dot pitch — macOS HiDPI scaling check |

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
