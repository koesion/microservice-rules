---
id: data.views-rebuildable
version: 1
title: "Derived data can be rebuilt from its source"
category: data
priority: medium
scope: service
summary: "A materialized view or read model can be dropped and recreated from the data it derives from, and the procedure has been run."
skill: cqrs
appliesWhen: has-materialized-views
references:
  - title: "Materialized View pattern (Azure Architecture Center)"
    url: https://learn.microsoft.com/en-us/azure/architecture/patterns/materialized-view
  - title: "CQRS pattern (Azure Architecture Center)"
    url: https://learn.microsoft.com/en-us/azure/architecture/patterns/cqrs
---

## Why it matters

Views drift: an event was missed, a projection had a bug for a week, the shape needs a new column. If the only way to fix a view is to patch rows by hand, it is no longer derived data. It is a second database with no owner. Being able to rebuild is what makes a view safe to change.

## How to apply it

* Keep the source long enough to rebuild from: the event log, or the writer's tables and an API to page through them.
* Write the rebuild as a job, not a one-off script on someone's laptop.
* Build the new copy beside the old one and switch when it has caught up, so readers see no gap.
* Know how long a full rebuild takes at current volume.
* Run it once in production before you need it.

## Example

A bug miscounted cancelled orders for three days. The team deploys the fix, starts `rebuild-order-summaries`, which replays the topic from offset 0 into `order_summaries_v2`, and switches the reader over 40 minutes later.
