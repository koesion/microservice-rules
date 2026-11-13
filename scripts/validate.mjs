// Checks every rule and checklist, and that README.md lists them as they are.
// Run it before opening a pull request: npm run validate
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { ROOT, loadLibrary } from './lib.mjs'
import { renderReadme } from './render-readme.mjs'

const library = loadLibrary()
const errors = [...library.errors]

if (errors.length === 0) {
  const readme = readFileSync(join(ROOT, 'README.md'), 'utf8')
  try {
    if (renderReadme(readme, library) !== readme) errors.push('README.md is out of date. Run: npm run readme')
  } catch (e) {
    errors.push(e.message)
  }
}

if (errors.length) {
  console.error(`${errors.length} problem${errors.length === 1 ? '' : 's'} found:\n`)
  for (const error of errors) console.error(`  ${error}`)
  process.exit(1)
}

console.log(`OK: ${library.rules.size} rules, ${library.checklists.size} checklists`)
