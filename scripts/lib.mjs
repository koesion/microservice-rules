// Loads and validates every rule and checklist in this repository.
// Used by validate.mjs (CI) and render-readme.mjs.
import { readFileSync, readdirSync, statSync } from 'node:fs'
import { join, dirname, relative, sep } from 'node:path'
import { fileURLToPath } from 'node:url'
import { parse as parseYaml } from 'yaml'

export const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
export const SITE = 'https://microservice.md'

const registry = JSON.parse(readFileSync(join(ROOT, 'schema', 'registry.json'), 'utf8'))

const SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/
const RULE_ID = /^[a-z]+\.[a-z0-9]+(?:-[a-z0-9]+)*$/
const FRONTMATTER = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/
const BODY_SECTIONS = ['## Why it matters', '## How to apply it', '## Example']

const RULE_FIELDS = {
  required: ['id', 'version', 'title', 'category', 'priority', 'scope', 'summary', 'references'],
  optional: ['skill', 'wizardStep', 'check', 'appliesWhen'],
}
const CHECKLIST_FIELDS = ['slug', 'version', 'title', 'description', 'ruleIds']
const CHECKLIST_OPTIONAL = ['rating']

const isText = (v) => typeof v === 'string' && v.trim().length > 0
const isVersion = (v) => Number.isInteger(v) && v > 0

function files(dir, extensions) {
  const out = []
  for (const name of readdirSync(dir).sort()) {
    const path = join(dir, name)
    if (statSync(path).isDirectory()) out.push(...files(path, extensions))
    else if (extensions.some((e) => name.endsWith(e))) out.push(path)
  }
  return out
}

const rel = (path) => relative(ROOT, path).split(sep).join('/')

function httpsUrl(value) {
  try {
    return new URL(value).protocol === 'https:'
  } catch {
    return false
  }
}

function parseRule(path) {
  const where = rel(path)
  const errors = []
  const fail = (message) => errors.push(`${where}: ${message}`)

  const match = readFileSync(path, 'utf8').match(FRONTMATTER)
  if (!match) return { errors: [`${where}: missing YAML frontmatter (--- … ---)`] }

  let fm
  try {
    fm = parseYaml(match[1])
  } catch (e) {
    return { errors: [`${where}: invalid YAML: ${e.message.split('\n')[0]}`] }
  }
  if (!fm || typeof fm !== 'object' || Array.isArray(fm)) return { errors: [`${where}: frontmatter must be a YAML mapping`] }

  const known = [...RULE_FIELDS.required, ...RULE_FIELDS.optional]
  for (const key of Object.keys(fm)) if (!known.includes(key)) fail(`unknown field '${key}'`)
  for (const key of RULE_FIELDS.required) if (fm[key] === undefined) fail(`missing field '${key}'`)
  if (errors.length) return { errors }

  if (typeof fm.id !== 'string' || !RULE_ID.test(fm.id)) fail(`id must look like '<category>.<slug>'`)
  if (!isVersion(fm.version)) fail('version must be a positive whole number')
  if (!isText(fm.title)) fail('title is empty')
  if (!isText(fm.summary)) fail('summary is empty')
  if (!registry.categories.includes(fm.category)) fail(`category must be one of: ${registry.categories.join(', ')}`)
  if (!registry.priorities.includes(fm.priority)) fail(`priority must be one of: ${registry.priorities.join(', ')}`)
  if (!registry.scopes.includes(fm.scope)) fail(`scope must be one of: ${registry.scopes.join(', ')}`)

  // rules/<category>/<slug>.md  →  <category>.<slug>
  const [, category, file] = where.split('/')
  const expectedId = `${category}.${file.replace(/\.md$/, '')}`
  if (fm.id !== expectedId) fail(`id '${fm.id}' must match the file path (expected '${expectedId}')`)
  if (fm.category !== category) fail(`category '${fm.category}' must match the folder '${category}'`)

  if (!Array.isArray(fm.references) || fm.references.length === 0) {
    fail('references needs at least one entry')
  } else {
    fm.references.forEach((ref, i) => {
      const keys = ref && typeof ref === 'object' ? Object.keys(ref).sort().join(',') : ''
      if (keys !== 'title,url') fail(`references[${i}] must have exactly 'title' and 'url'`)
      else if (!isText(ref.title)) fail(`references[${i}].title is empty`)
      else if (!httpsUrl(ref.url)) fail(`references[${i}].url must be an https URL`)
    })
  }

  if (fm.skill !== undefined && !registry.skills.includes(fm.skill)) fail(`unknown skill '${fm.skill}' (see schema/registry.json)`)
  if (fm.wizardStep !== undefined && !registry.wizardSteps.includes(fm.wizardStep)) {
    fail(`wizardStep must be one of: ${registry.wizardSteps.join(', ')}`)
  }
  if (fm.check !== undefined && !registry.checks.includes(fm.check)) {
    fail(`unknown check '${fm.check}'. Automatic checks are implemented in the app; open an issue to propose one`)
  }
  if (fm.appliesWhen !== undefined && !(fm.appliesWhen in registry.appliesWhen)) {
    fail(`unknown appliesWhen '${fm.appliesWhen}' (see schema/registry.json)`)
  }

  const body = match[2].trim()
  for (const heading of BODY_SECTIONS) if (!body.includes(heading)) fail(`body is missing the "${heading}" section`)

  return { errors, rule: { ...fm, body, path: where } }
}

function parseChecklist(path) {
  const where = rel(path)
  const errors = []
  const fail = (message) => errors.push(`${where}: ${message}`)

  let doc
  try {
    doc = parseYaml(readFileSync(path, 'utf8'))
  } catch (e) {
    return { errors: [`${where}: invalid YAML: ${e.message.split('\n')[0]}`] }
  }
  if (!doc || typeof doc !== 'object' || Array.isArray(doc)) return { errors: [`${where}: must be a YAML mapping`] }
  const ruleIds = Array.isArray(doc.ruleIds) ? doc.ruleIds.filter(isText) : []

  for (const key of Object.keys(doc)) {
    if (!CHECKLIST_FIELDS.includes(key) && !CHECKLIST_OPTIONAL.includes(key)) fail(`unknown field '${key}'`)
  }
  for (const key of CHECKLIST_FIELDS) if (doc[key] === undefined) fail(`missing field '${key}'`)
  if (errors.length) return { errors, ruleIds }

  const expectedSlug = where.split('/').pop().replace(/\.ya?ml$/, '')
  if (typeof doc.slug !== 'string' || !SLUG.test(doc.slug)) fail('slug must be lower-case words joined by hyphens')
  else if (doc.slug !== expectedSlug) fail(`slug '${doc.slug}' must match the file name (expected '${expectedSlug}')`)
  if (!isVersion(doc.version)) fail('version must be a positive whole number')
  if (!isText(doc.title)) fail('title is empty')
  if (!isText(doc.description)) fail('description is empty')
  if (!Array.isArray(doc.ruleIds) || doc.ruleIds.length === 0 || !doc.ruleIds.every(isText)) {
    fail('ruleIds must list at least one rule id')
  }

  if (doc.rating !== undefined) checkRating(doc.rating, fail)

  return { errors, checklist: { ...doc, path: where }, ruleIds }
}

const isMapping = (v) => !!v && typeof v === 'object' && !Array.isArray(v)

// `rating` makes a checklist a scorecard: every service gets a Level 0 to 3 on
// it. The scale is fixed (schema/registry.json, "rating"); a scorecard may only
// set, per service tier, the level expected of it. `rating: {}` keeps the defaults.
function checkRating(rating, fail) {
  const { serviceTiers, levelPriorities } = registry.rating
  if (!isMapping(rating)) return fail('rating must be a mapping, such as {} for the default targets')
  for (const key of Object.keys(rating)) {
    if (key !== 'targets') fail(`rating: unknown field '${key}'. A scorecard only sets 'targets'`)
  }
  if (rating.targets === undefined) return
  if (!isMapping(rating.targets)) return fail('rating.targets must map a service tier to a level')
  const tiers = serviceTiers.map(String)
  const levels = levelPriorities.map((_, i) => i + 1)
  for (const [tier, level] of Object.entries(rating.targets)) {
    if (!tiers.includes(tier)) fail(`rating.targets: '${tier}' is not a service tier (${tiers.join(', ')})`)
    else if (!levels.includes(level)) fail(`rating.targets.${tier} must be a level from ${levels[0]} to ${levels.at(-1)}`)
  }
}

// A scorecard's levels come from rule priority, so it needs a rule at each
// priority a level asks for; otherwise that level would be reached by default.
function checkScorecardLevels(checklist, rules) {
  const priorities = new Set(checklist.ruleIds.map((id) => rules.get(id)?.priority))
  return registry.rating.levelPriorities.flatMap((priority, i) =>
    priorities.has(priority) ? [] : [`${checklist.path}: has no ${priority} rule, so Level ${i + 1} would be empty`],
  )
}

/** Every rule and checklist, with the errors found in them and between them. */
export function loadLibrary() {
  const errors = []
  const rules = new Map()
  const invalid = new Set()
  const checklists = new Map()

  for (const path of files(join(ROOT, 'rules'), ['.md'])) {
    const parts = rel(path).split('/')
    if (parts.length !== 3) {
      errors.push(`${rel(path)}: rules live at rules/<category>/<slug>.md`)
      continue
    }
    const result = parseRule(path)
    errors.push(...result.errors)
    if (result.rule && result.errors.length === 0) rules.set(result.rule.id, result.rule)
    // A rule with errors is reported once, not again by every checklist that lists it.
    else invalid.add(`${parts[1]}.${parts[2].replace(/\.md$/, '')}`)
  }

  // Rule ids named by any checklist, valid or not, so one broken checklist
  // doesn't also report every rule it lists as "in no checklist".
  const listed = new Set()

  for (const path of files(join(ROOT, 'checklists'), ['.yaml', '.yml'])) {
    const result = parseChecklist(path)
    errors.push(...result.errors)
    for (const id of result.ruleIds ?? []) listed.add(id)
    if (!result.checklist || result.errors.length) continue
    const { slug, ruleIds } = result.checklist
    const seen = new Set()
    for (const id of ruleIds) {
      if (seen.has(id)) errors.push(`${result.checklist.path}: lists rule '${id}' twice`)
      seen.add(id)
      if (!rules.has(id) && !invalid.has(id)) errors.push(`${result.checklist.path}: references missing rule '${id}'`)
    }
    if (result.checklist.rating !== undefined) errors.push(...checkScorecardLevels(result.checklist, rules))
    checklists.set(slug, result.checklist)
  }

  for (const rule of rules.values()) {
    if (!listed.has(rule.id)) errors.push(`${rule.path}: is in no checklist; add it to one under checklists/`)
  }

  return { rules, checklists, errors, registry }
}
