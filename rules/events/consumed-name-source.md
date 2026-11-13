---
id: events.consumed-name-source
version: 1
title: "Consumed events name their publisher"
category: events
priority: medium
scope: service
summary: "Each consumed event says which service publishes it, so the dependency shows up in the catalog and in impact analysis."
skill: async-messaging
wizardStep: 2-interfaces
check: events.consumed-name-source
appliesWhen: consumes-events
references:
  - title: "What do you mean by \"Event-Driven\"? (Martin Fowler)"
    url: https://martinfowler.com/articles/201701-event-driven.html
  - title: "Pattern: Domain event (microservices.io)"
    url: https://microservices.io/patterns/data/domain-event.html
---

## Why it matters

Events hide dependencies well. Nothing in the code says who publishes `PaymentCaptured`, so when that service changes or goes down nobody knows this one is affected. Naming the publisher makes the dependency visible: the catalog can draw it, the publisher can find its consumers, and an incident has a first place to look.

## How to apply it

* For every consumed event, record the service that publishes it.
* Use the service's name as it appears in the catalog, so the two link up.
* If several services publish the same event type, name each of them, and ask whether it is really one event.
* Review the list when a subscription is added or removed.

## Example

`PaymentCaptured`, published by `payments`, on `kafka: payments.events`. The payments team can now see that shipping depends on it before they change the payload.
