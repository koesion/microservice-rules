---
id: data.schema-changes-compatible
version: 1
title: "Schema changes are backward compatible"
category: data
priority: high
scope: service
summary: "A database migration never breaks the version of the service that is running: expand first, migrate, contract later."
skill: progressive-delivery
appliesWhen: owns-data
references:
  - title: "Evolutionary Database Design (Martin Fowler and Pramod Sadalage)"
    url: https://martinfowler.com/articles/evodb.html
  - title: "Parallel Change (Martin Fowler)"
    url: https://martinfowler.com/bliki/ParallelChange.html
---

## Why it matters

During a rolling deploy the old and new versions of the service run against the same database. A migration that renames or drops a column breaks the old version at once, and makes rollback impossible, because the previous release can no longer read the data.

## How to apply it

* Split a breaking change into steps: add the new column or table (expand), write to both and backfill, switch reads, then remove the old one (contract) in a later release.
* Make every single migration safe for the version before it and the version after it.
* Keep migrations in version control and run them from the pipeline.
* Avoid long locks: add indexes concurrently, backfill in batches.
* Drop the old column only once no running version and no rollback target reads it.

## Example

Renaming `orders.total` to `total_cents`: release 1 adds `total_cents` and writes both; a job backfills old rows; release 2 reads `total_cents`; release 3, a week later, drops `total`. Each release can be rolled back to the one before.
