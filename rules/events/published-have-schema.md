---
id: events.published-have-schema
version: 1
title: Published events have a schema
category: events
priority: high
scope: service
summary: Every event the service publishes has a declared payload, so consumers code against a contract and not against samples.
skill: designing-domain-events
wizardStep: 2-interfaces
check: events.published-have-schema
appliesWhen: publishes-events
references:
  - title: "AsyncAPI: the AsyncAPI document"
    url: https://www.asyncapi.com/docs/concepts/asyncapi-document
  - title: CloudEvents specification
    url: https://cloudevents.io/
---

## Why it matters

An event is a public API with consumers you may not know about. Without a schema they read the payload off the wire and build on whatever they saw that day. The first renamed field breaks them, and nobody finds out until the consumer's data is wrong.

## How to apply it

* Declare the payload of each published event: field names, types and which fields are required.
* Include a stable event id, the time it happened and the id of the thing it is about.
* Evolve it compatibly: add optional fields, never rename or remove. A change that can't be compatible is a new event.
* Keep the schema where the generated AsyncAPI file picks it up.

## Example

`OrderPlaced { eventId: uuid, occurredAt: timestamp, orderId: uuid, customerId: uuid, totalCents: int, currency: string }`
