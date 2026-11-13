---
id: events.names-are-facts
version: 1
title: "Events are named as facts, in the past tense"
category: events
priority: medium
scope: service
summary: "An event name says what happened (OrderPlaced), not what someone should do (CreateOrder)."
skill: designing-domain-events
wizardStep: 2-interfaces
check: events.names-are-facts
appliesWhen: publishes-events
references:
  - title: "Domain Event (Martin Fowler)"
    url: https://martinfowler.com/eaaDev/DomainEvent.html
  - title: "Pattern: Domain event (microservices.io)"
    url: https://microservices.io/patterns/data/domain-event.html
---

## Why it matters

An event reports something that already happened. A command asks for something to happen. When a topic carries a name like `CreateOrder`, the publisher is telling consumers what to do, so it has to know who they are and what they do. That is the coupling events were meant to remove. Readers also can't tell whether the thing happened or was only requested.

## How to apply it

* Name each event with a noun and a past participle: `OrderPlaced`, `PaymentCaptured`.
* Use business language. `OrderRowUpdated` describes a table, not something the business cares about.
* Publish one event per fact. A catch-all `OrderChanged` forces every consumer to work out what changed.
* If you need a specific service to do something, that is a command: call that service or send to its queue.

## Example

Facts: `OrderPlaced`, `PaymentCaptured`, `ShipmentDelayed`. Not facts: `CreateOrder`, `ProcessPayment`, `OrderUpdate`.
