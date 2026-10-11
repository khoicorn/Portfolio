# Case-study illustrations

Each script writes one SVG under `public/images/`. All values are fictional sample data.

| Script | Output | Run |
|---|---|---|
| `healthcare-map.mjs` | `case-studies/healthcare-dashboard.svg` | See below |
| `pdf-before-after.mjs` | `pdf-to-html/before-after.svg` | `node scripts/illustrations/pdf-before-after.mjs public/images/pdf-to-html/before-after.svg` |
| `payout-card.mjs` | `payout-alert-bot/payout-card.svg` | `node scripts/illustrations/payout-card.mjs public/images/payout-alert-bot/payout-card.svg` |

## Healthcare map

Inputs come from the Power BI Geographic Demo Kit. Set `$kit` to that folder, simplify the boundaries, then build the SVG:

```powershell
$kit = "path\to\GeoMap"
$src = "$kit\geoBoundaries-VNM-ADM2_simplified.geojson"
npx -y mapshaper@0.6.113 $src -simplify interval=1800 keep-shapes -o format=geojson precision=0.001 districts.json
npx -y mapshaper@0.6.113 $src -simplify interval=1800 keep-shapes -dissolve -o format=geojson precision=0.001 outline.json
node scripts/illustrations/healthcare-map.mjs districts.json outline.json "$kit\powerbi\vietnam_adm2_dummy_powerbi.csv" public/images/case-studies/healthcare-dashboard.svg
```

The map keeps the Hoàng Sa and Trường Sa archipelagos.
