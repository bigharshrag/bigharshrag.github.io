// Generates public/assets/data/city-roads.mobile.json from
// city-roads.json by stripping unvisited residential ('r') and tertiary
// ('3') edges. This is ~75% of the city road network by edge count and
// ~76% by byte size — pure waste on mobile, where the canvas pipeline
// would skip them at render anyway. Stripping them at build time saves
// the transfer + parse + memory cost on constrained devices.
//
// Visited edges of any type are kept. Major-road skeleton (secondary,
// primary, motorway, trunk) is kept whether visited or not.
//
// Run via the "prebuild" npm script before every Astro build, and once
// manually so the file is present for `astro dev`.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');

const inputPath = path.join(projectRoot, 'public/assets/data/city-roads.json');
const outputPath = path.join(projectRoot, 'public/assets/data/city-roads.mobile.json');

if (!fs.existsSync(inputPath)) {
  console.warn('[build-mobile-data] skipping — input not found:', inputPath);
  process.exit(0);
}

const raw = fs.readFileSync(inputPath, 'utf8');
const data = JSON.parse(raw);

const before = data.edges.length;
const filtered = data.edges.filter((e) => e.b >= 0 || (e.t !== 'r' && e.t !== '3'));
const after = filtered.length;

const output = { ...data, edges: filtered };
const outputJson = JSON.stringify(output);
fs.writeFileSync(outputPath, outputJson);

const inputMB = (raw.length / 1024 / 1024).toFixed(2);
const outputMB = (outputJson.length / 1024 / 1024).toFixed(2);
console.log(
  `[build-mobile-data] ${before} → ${after} edges, ${inputMB} MB → ${outputMB} MB`,
);
