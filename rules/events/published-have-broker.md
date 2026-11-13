---
id: events.published-have-broker
version: 1
title: Published events name their broker and topic
category: events
priority: medium
scope: service
summary: Each published event says where it is published, so a consumer knows where to subscribe.
skill: async-messaging
wizardStep: 2-interfaces
check: events.published-have-broker
appliesWhen: publishes-events
references:
  - title: "AsyncAPI: channels"
    url: https://www.asyncapi.com/docs/concepts/channel
---

## Why it matters

"We publish `OrderPlaced`" is half of a contract. A consumer also needs the broker and the topic or exchange, and so does whoever draws the topology or reviews what a change will affect. When it is missing, the answer lives in someone's head or in a config file in another repository.

## How to apply it

* For each published event, name the broker and the topic, stream or exchange.
* Keep one event type per topic unless the events must be ordered together; then say so.
* Use the same names as the infrastructure, so that searching for the topic finds this service.

## Example

`OrderPlaced` is published to `kafka: orders.order-placed.v1`.
