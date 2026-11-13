// Rewrites the list of checklists in README.md from the files in this
// repository. Run `npm run readme` after adding or renaming a rule.
// With --check it only reports whether README.md is up to date (used in CI).
import { readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { ROOT, SITE, loadLibrary } from './lib.mjs'

const START = '<!-- checklists:start -->'
const END = '<!-- checklists:end -->'
// Production Readiness first, then by title.
const FIRST = 'production-readiness'
const PRIORITY = { critical: 'Critical', high: 'High', medium: 'Medium', low: 'Low' }

export function renderChecklists({ rules, checklists }) {
  const ordered = [...checklists.values()].sort((a, b) =>
    a.slug === FIRST ? -1 : b.slug === FIRST ? 1 : a.title.localeCompare(b.title),
  )
  const blocks = ordered.map((checklist) => {
    const listed = checklist.ruleIds.map((id) => rules.get(id)).filter(Boolean)
    const auto = listed.filter((r) => r.check).length
    const lines = listed.map((r) => {
      const how = r.check ? 'checked automatically' : 'checked by hand'
      return `- **[${r.title}](${SITE}/rules/${r.id})** (${PRIORITY[r.priority]}, ${how})  \n  ${r.summary}`
    })
    return [
      `### [${checklist.title}](${SITE}/checklists/${checklist.slug})`,
      '',
      checklist.description,
      '',
      `${listed.length} rules, ${auto} checked automatically once the checklist is applied to a service.`,
      '',
      ...lines,
    ].join('\n')
  })
  return blocks.join('\n\n')
}

export function renderReadme(current, library) {
  const start = current.indexOf(START)
  const end = current.indexOf(END)
  if (start === -1 || end === -1 || end < start) {
    throw new Error(`README.md must contain ${START} and ${END}`)
  }
  return `${current.slice(0, start + START.length)}\n\n${renderChecklists(library)}\n\n${current.slice(end)}`
}

if (process.argv[1] === new URL(import.meta.url).pathname) {
  const path = join(ROOT, 'README.md')
  const current = readFileSync(path, 'utf8')
  const next = renderReadme(current, loadLibrary())
  if (process.argv.includes('--check')) {
    if (next !== current) {
      console.error('README.md is out of date. Run: npm run readme')
      process.exit(1)
    }
  } else {
    writeFileSync(path, next)
    console.log('README.md updated')
  }
}
