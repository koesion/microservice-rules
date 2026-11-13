---
id: events.publish-through-outbox
version: 1
title: Events are published through an outbox
category: events
priority: high
scope: service
summary: A state change and the event that announces it are saved together, so one never happens without the other.
skill: transactional-outbox-inbox
wizardStep: 2-interfaces
appliesWhen: publishes-events
references:
  - title: "Pattern: Transactional outbox (microservices.io)"
    url: https://microservices.io/patterns/data/transactional-outbox.html
---

## Why it matters

Writing to the database and then publishing to the broker are two separate operations, and the process can die between them. Either the order is saved and no event goes out, so downstream services never hear of it, or the event goes out and the transaction rolls back, so they act on an order that does not exist. Both are silent.

## How to apply it

* In the same database transaction as the state change, insert the event into an **outbox** table.
* A separate relay (a poller, or change data capture on the outbox table) reads the table and publishes to the broker, marking rows as sent.
* The relay delivers at least once, so consumers must handle duplicates.
* Monitor the age of the oldest unsent row; a growing backlog is your signal that events have stopped flowing.

## Example

`placeOrder()` inserts into `orders` and `outbox` in one transaction. A relay publishes `OrderPlaced` to the broker a few milliseconds later and sets `outbox.sent_at`.
