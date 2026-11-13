---
id: events.ordering-explicit
version: 1
title: "Ordering needs are explicit"
category: events
priority: medium
scope: service
summary: "The service states which events must be processed in order and how that is guaranteed, and copes with the rest arriving out of order."
skill: async-messaging
appliesWhen: consumes-events
references:
  - title: "Apache Kafka documentation"
    url: https://kafka.apache.org/documentation/
  - title: "Resequencer (Enterprise Integration Patterns)"
    url: https://www.enterpriseintegrationpatterns.com/patterns/messaging/Resequencer.html
---

## Why it matters

Brokers give ordering only within narrow limits: one partition, one message group. Parallel consumers, retries and redeliveries reorder everything else. A consumer that assumes global order will, sooner or later, apply `OrderCancelled` before `OrderPlaced` and keep the wrong state.

## How to apply it

* Decide per event stream whether order matters. For most it only matters per entity.
* Where it does, publish with a key (the order id, the customer id) so related events share a partition or message group.
* Carry a sequence number or version in the event, and have the consumer ignore one that is older than what it has applied.
* Don't rely on timestamps from different machines to order events.
* Write the decision down next to the event.

## Example

All order events are keyed by `orderId`, so one order's events stay in order while different orders are processed in parallel. Each event carries `orderVersion`; the consumer skips an event whose version is not higher than the one stored.
