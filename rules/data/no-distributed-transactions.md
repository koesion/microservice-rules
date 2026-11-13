---
id: data.no-distributed-transactions
version: 1
title: "No transaction spans services"
category: data
priority: high
scope: service
summary: "A business operation that changes several services is a sequence of local transactions with compensation, not a two-phase commit."
skill: saga-pattern
references:
  - title: "Pattern: Saga (microservices.io)"
    url: https://microservices.io/patterns/data/saga.html
  - title: "Two-Phase Commit (Patterns of Distributed Systems)"
    url: https://martinfowler.com/articles/patterns-of-distributed-systems/two-phase-commit.html
---

## Why it matters

A transaction across services holds locks in every one of them until the slowest answers, and needs all of them up to finish. Availability becomes the product of everyone's availability, and a coordinator crash leaves rows locked. Most brokers and many databases don't support it at all, so the usual result is a transaction that only looks atomic.

## How to apply it

* Keep each transaction inside one service and one database.
* For an operation across services, use a saga: each step commits locally and triggers the next, and each has an action that undoes it.
* Publish the event for a step in the same transaction as the change, through an outbox.
* Accept that the whole is briefly inconsistent, and design the intermediate states: `PENDING`, `RESERVED`.
* If two things truly have to change together, they probably belong in the same service.

## Example

Placing an order: orders saves it as `PENDING` and publishes `OrderPlaced`; payments captures and publishes `PaymentCaptured`; orders marks it `CONFIRMED`. If payment fails, orders marks it `REJECTED` and inventory releases the reservation. No step holds a lock in another service.
