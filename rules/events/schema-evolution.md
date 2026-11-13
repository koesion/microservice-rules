---
id: events.schema-evolution
version: 1
title: "Event schemas evolve compatibly"
category: events
priority: high
scope: service
summary: "A change to a published event never breaks a consumer already reading it: fields are added, not renamed or removed."
skill: event-driven-governance
appliesWhen: publishes-events
references:
  - title: "Schema evolution and compatibility (Confluent)"
    url: https://docs.confluent.io/platform/current/schema-registry/fundamentals/schema-evolution.html
  - title: "Parallel Change (Martin Fowler)"
    url: https://martinfowler.com/bliki/ParallelChange.html
---

## Why it matters

You can't deploy every consumer of an event at the same moment as its publisher, and old events stay in the log long after the code that wrote them is gone. A renamed or removed field breaks consumers you may not know exist, and breaks replay of history for everyone.

## How to apply it

* Only make additive changes: new optional fields with a default. Never rename, remove or change the type of a field.
* When a change can't be compatible, publish a new event type or version alongside the old one, and retire the old one once nobody reads it.
* Check compatibility in CI, with a schema registry or a contract test, so a breaking change fails the build.
* Tell consumers to ignore fields they don't know.

## Example

`OrderPlaced` gains an optional `salesChannel`. Old consumers ignore it and new ones read it. Changing `total` from a number to an object is not compatible, so the team publishes `OrderPlaced.v2` next to `v1` for a quarter, then stops `v1` when the registry shows no readers.
