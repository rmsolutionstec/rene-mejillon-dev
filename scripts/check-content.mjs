import { readFileSync, existsSync } from 'node:fs'
import assert from 'node:assert/strict'
const catalog = JSON.parse(readFileSync(new URL('../backend/resources/portfolio.json', import.meta.url), 'utf8'))
assert.deepEqual(JSON.parse(readFileSync(new URL('../frontend/src/data/catalog.json', import.meta.url), 'utf8')), catalog, 'Run node scripts/sync-catalog.mjs after editing the canonical catalog')
assert.equal(catalog.projects.length, 8)
assert.equal(catalog.projects[0].catalog_key, 'academia')
assert.equal(catalog.projects[1].catalog_key, 'fundacion')
assert.equal(catalog.personalInfo.email, 'renemejillon@alphaecuador.com')
assert.ok(catalog.experience.some((item) => item.company === 'RM Solutions Tec' && item.period.includes('2008')))
assert.equal(catalog.skills.filter((item) => 'level' in item).length, 0)
assert.ok(catalog.skills.every((item) => ['practice', 'academic', 'learning'].includes(item.experience)))
assert.equal(new Set(catalog.skills.map((item) => item.catalog_key)).size, catalog.skills.length)
assert.ok(catalog.services.every((item) => item.price === null))
assert.equal(new Set(catalog.projects.map((item) => item.catalog_key)).size, 8)
for (const item of catalog.projects) {
  if (item.github_url) assert.ok(['https://github.com/rmsolutionstec/alpha-ecuador-tts', 'https://github.com/rmsolutionstec/rene-mejillon-dev'].includes(item.github_url))
}
const pdf = new URL('../frontend/public/cv/rene-mejillon-cv.pdf', import.meta.url)
assert.equal(readFileSync(pdf).subarray(0, 5).toString(), '%PDF-')
if (process.argv.includes('--dist')) {
  const built = new URL('../frontend/dist/cv/rene-mejillon-cv.pdf', import.meta.url)
  assert.ok(existsSync(new URL('../frontend/dist/index.html', import.meta.url)))
  assert.deepEqual(readFileSync(built), readFileSync(pdf))
}
console.log('Catalog, professional content and CV checks passed')
