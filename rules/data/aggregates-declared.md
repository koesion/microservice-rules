---
id: data.aggregates-declared
version: 1
title: "The aggregates the service owns are declared"
category: data
priority: medium
scope: service
summary: "The service names its aggregates, so it is clear what changes together in one transaction and what does not."
skill: designing-service-boundaries
wizardStep: 3-data-deps
check: data.aggregates-declared
appliesWhen: owns-data
references:
  - title: "DDD Aggregate (Martin Fowler)"
    url: https://martinfowler.com/bliki/DDD_Aggregate.html
  - title: "Pattern: Aggregate (microservices.io)"
    url: https://microservices.io/patterns/data/aggregate.html
---

## Why it matters

An aggregate is the unit that is loaded, changed and saved as a whole: an order with its lines. Naming them answers the questions a data model alone doesn't: what one transaction may touch, what an event is about, what can be split out later. Without them, transactions grow until they span half the schema.

## How to apply it

* List the aggregates the service owns, each with its root entity.
* Keep them small: only what has to be consistent at the moment of the change.
* Refer to other aggregates by id, not by object reference or foreign-key join in the write path.
* Change one aggregate per transaction; reach the others through events.
* Name events after the aggregate they are about: `OrderPlaced`, `OrderLineRemoved`.

## Example

The orders service owns `Order` (root `Order`, with `OrderLine` and the value object `Money`) and `Cart`. `Order` refers to the customer by `customerId`; the customer is an aggregate of another service.
