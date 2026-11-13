# Contributing

Thank you for helping. This page says what makes a good change and how to
get it merged.

## What we are looking for

- **Corrections**: a rule that is wrong, out of date or unclear.
- **Better examples and sources**: a clearer example, or a reference that
  supports the rule better than the current one.
- **New rules**: a practice that is missing. Open an issue first, so we can
  agree it belongs before you write it.
- **New checklists**: also start with an issue.

## What a good rule looks like

- **One practice per rule.** If the title needs "and", it is two rules.
- **Checkable.** A reader can say yes or no for their service. "Design for
  failure" is a principle; "hard dependencies have a timeout" is a rule.
- **Says when it does not apply.** Most rules do not fit every service. Use
  `appliesWhen`, or say it in the text.
- **Short.** About 150 words across the three sections. Plain words, no
  marketing.
- **Sourced.** At least one reference: a pattern description, a book
  chapter, a vendor guide, a standard. Prefer sources that will still be
  there in five years.
- **Vendor-neutral in the rule, concrete in the example.** The rule says
  "a dead-letter queue"; the example may name Kafka or SQS.

## The format

See "How a rule is written" in the [README](README.md). The rules of the
format:

- The file path gives the id: `rules/events/dead-letter-queue.md` is
  `events.dead-letter-queue`. An id is never reused or renamed, because
  people's answers are stored against it.
- The body has exactly these sections, in this order: `## Why it matters`,
  `## How to apply it`, `## Example`.
- Bump `version` when the **meaning** of a rule changes, so that people who
  marked it done are asked to confirm again. Do not bump it for wording,
  typos or new references.
- Every rule is in at least one checklist.
- Quote a `title` or `summary` that contains a colon followed by a space.

### `check` and `appliesWhen`

These two fields name code in the MICROSERVICE.md app: an automatic check,
and a condition that decides whether the rule applies to a service. The ids
that exist are in [`schema/registry.json`](schema/registry.json).

A pull request here can use an existing id but cannot add one. If your rule
could be checked automatically from a service's design, say so in the issue
and describe what the check would look at. Leave `check` out in the
meantime: the rule is then ticked by hand.

`schema/registry.json` is generated from the app. Please do not edit it.

### Scorecards

A checklist with a `rating` block is a scorecard (see the README). Adding a
rule to a scorecard, or changing a rule's `priority`, can change the level of
every service rated on it, so say so in the pull request. A scorecard needs at
least one critical, one high and one medium rule; the validator checks this.

## Before you open a pull request

```bash
npm install
npm run validate   # checks every rule and checklist
npm run readme     # only if you added, renamed or retitled a rule
```

The same validation runs on every pull request.

## What happens after a merge

The site at microservice.md takes its rules from this repository. A merged
change reaches the rule's page with the next release of the app.

## Licence of contributions

By opening a pull request you agree that:

- your changes to `rules/` and `checklists/` are licensed under
  [CC BY 4.0](rules/LICENSE);
- your changes to anything else are licensed under [Apache 2.0](LICENSE).

## Conduct

Be kind and specific. Disagree with the rule, not the person.
