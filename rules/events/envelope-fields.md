---
id: events.envelope-fields
version: 1
title: "Events carry an id, a time and a version"
category: events
priority: medium
scope: service
summary: "Every published event has a unique id, the time it happened, its type and its schema version, in the same place on every event."
skill: designing-domain-events
appliesWhen: publishes-events
references:
  - title: "CloudEvents specification"
    url: https://github.com/cloudevents/spec/blob/main/cloudevents/spec.md
  - title: "CloudEvents"
    url: https://cloudevents.io/
---

## Why it matters

Consumers need the same few things from every event: an id to drop duplicates, a time to order and audit, a type to route, a version to pick a parser, and a correlation id to follow a request across services. When each event carries them differently, or not at all, every consumer writes its own guesswork and deduplication stops being possible.

## How to apply it

* Agree on one envelope for all events: `id`, `type`, `source`, `time`, `specversion` or schema version, and the id of the thing it is about.
* Generate the id once, when the fact is recorded, so a republished event keeps the same id.
* Use the time the fact happened, in UTC, not the time it was sent.
* Pass a correlation or trace id through from the request that caused the event.
* CloudEvents is a ready-made envelope; adopt it before inventing one.

## Example

`{ "id": "7b1c…", "type": "com.shop.order.placed.v1", "source": "/orders", "time": "2026-03-02T09:14:07Z", "subject": "order/8841", "traceparent": "00-4bf9…", "data": { … } }`
