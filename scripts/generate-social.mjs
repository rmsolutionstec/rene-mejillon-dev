import { readFileSync, writeFileSync } from 'node:fs'
const { personalInfo: person } = JSON.parse(readFileSync(new URL('../backend/resources/portfolio.json', import.meta.url), 'utf8'))
const escape = (text) => text.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;')
writeFileSync(new URL('../frontend/public/images/social-card.svg', import.meta.url), `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
<rect width="1200" height="630" fill="#0a0a0a"/><path d="M850 0h350v630H650Z" fill="#251010"/>
<rect x="76" y="65" width="72" height="72" rx="18" fill="#b90000"/><text x="112" y="111" text-anchor="middle" fill="white" font-family="Arial,sans-serif" font-size="27" font-weight="bold">RM</text>
<text x="76" y="251" font-family="Arial,sans-serif" font-size="78" font-weight="bold" fill="#f5f5f5">${escape(person.name)}</text>
<text x="80" y="325" font-family="Arial,sans-serif" font-size="38" fill="#ff6666">${escape(person.title)}</text>
<text x="80" y="397" font-family="Arial,sans-serif" font-size="27" fill="#dddddd">PHP · Laravel · JavaScript · React · MySQL</text>
<text x="80" y="447" font-family="Arial,sans-serif" font-size="25" fill="#bbbbbb">Laravel y React desde 2023 · Trayectoria TI desde 2008</text>
<text x="80" y="555" font-family="Arial,sans-serif" font-size="23" fill="#bbbbbb">Guayaquil, Ecuador · ${escape(person.email)}</text></svg>`)
console.log('Social card SVG generated from verified catalog')
