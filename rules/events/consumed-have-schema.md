---
id: events.consumed-have-schema
version: 1
title: "Consumed events have a schema"
category: events
priority: high
scope: service
summary: "For every event it consumes, the service records the payload it relies on, so a publisher change that breaks it can be seen in advance."
skill: event-driven-governance
wizardStep: 2-interfaces
check: events.consumed-have-schema
appliesWhen: consumes-events
references:
  - title: "Consumer-Driven Contracts (Martin Fowler)"
    url: https://martinfowler.com/articles/consumerDrivenContracts.html
  - title: "AsyncAPI: the AsyncAPI document"
    url: https://www.asyncapi.com/docs/concepts/asyncapi-document
---

## Why it matters

A consumer depends on a handful of fields in someone else's event. If that dependency is only in the code, the publishing team has no way to know which fields are safe to change, and the consumer finds out in production. Writing down what you read turns a hidden dependency into a contract both sides can check.

## How to apply it

* For each consumed event, declare the fields the service reads and their types. Leave out the ones it ignores.
* Take the shape from the publisher's schema, not from a sample message.
* Turn it into a consumer contract test when the publisher supports one.
* Parse tolerantly: ignore unknown fields, and fail loudly on a missing required one.

## Example

The shipping service consumes `OrderPlaced` and declares `{ orderId: uuid, deliveryAddress: Address, lines: [{ sku, quantity }] }`. It does not read `totalCents`, so the orders team can change pricing fields without asking.
