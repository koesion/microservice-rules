---
id: data.aggregates-have-invariants
version: 1
title: "Each aggregate states its invariants"
category: data
priority: medium
scope: service
summary: "Every aggregate lists the rules that must hold whenever it is saved, so the consistency boundary has a reason."
skill: designing-service-boundaries
wizardStep: 3-data-deps
check: data.aggregates-have-invariants
appliesWhen: has-aggregates
references:
  - title: "Using tactical DDD to design microservices (Azure Architecture Center)"
    url: https://learn.microsoft.com/en-us/azure/architecture/microservices/model/tactical-ddd
  - title: "DDD Aggregate (Martin Fowler)"
    url: https://martinfowler.com/bliki/DDD_Aggregate.html
---

## Why it matters

An aggregate exists to protect rules: an order total equals the sum of its lines, a shipped order can't be cancelled. If the rules aren't written, the boundary is arbitrary and nobody can say whether it is too big or too small. The rules also end up enforced in handlers and screens, where each caller remembers a different subset.

## How to apply it

* For each aggregate, write the rules that must always be true after a change, in business terms.
* Enforce them inside the aggregate, in the methods that change it. Callers should not be able to bypass them.
* A rule that spans two aggregates can't be guaranteed in one transaction: make it an eventual check or redraw the boundary.
* Turn each invariant into a unit test.
* If an aggregate has no invariant, ask whether it is an aggregate or just a record.

## Example

`Order`: "the total equals the sum of line totals"; "an order has at least one line"; "status only moves PENDING → CONFIRMED → SHIPPED, or to CANCELLED before SHIPPED".
