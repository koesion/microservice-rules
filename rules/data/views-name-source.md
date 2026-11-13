---
id: data.views-name-source
version: 1
title: "Materialized views name their source and storage"
category: data
priority: medium
scope: service
summary: "Every materialized view says what it is built from and where it is kept."
skill: cqrs
wizardStep: 3-data-deps
check: data.views-name-source
appliesWhen: has-materialized-views
references:
  - title: "Materialized View pattern (Azure Architecture Center)"
    url: https://learn.microsoft.com/en-us/azure/architecture/patterns/materialized-view
---

## Why it matters

A materialized view is derived data: a precomputed answer to a query. When it is wrong, the fix depends on knowing what it was computed from. A view with no recorded source can't be rebuilt, can't be checked, and slowly becomes a second source of truth that nobody dares to delete.

## How to apply it

* For each view, record the source: the events, tables or services it is built from.
* Record where it is stored: a table, an index, a cache.
* Say how it is refreshed: on each event, on a schedule, on demand.
* Note how stale it can be.
* Never let anything write to the view except the code that builds it.

## Example

`customer_order_summary`: built from `OrderPlaced` and `OrderCancelled` events; stored in the Postgres table `order_summaries`; updated on each event, usually under a second behind.
