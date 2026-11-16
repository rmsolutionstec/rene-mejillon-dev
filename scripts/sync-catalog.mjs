import { readFileSync, writeFileSync } from 'node:fs'
// Generated snapshot keeps Vercel's frontend root self-contained and Docker's backend root independent.
const catalog = JSON.parse(readFileSync(new URL('../backend/resources/portfolio.json', import.meta.url), 'utf8'))
writeFileSync(new URL('../frontend/src/data/catalog.json', import.meta.url), JSON.stringify(catalog, null, 2) + '\n')
console.log('Frontend catalog snapshot synchronized')
