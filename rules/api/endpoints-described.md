---
id: api.endpoints-described
version: 1
title: Every endpoint is described
category: api
priority: medium
scope: service
summary: Each REST endpoint says what it does, so callers and coding agents do not have to guess from the path.
skill: sync-communication
wizardStep: 2-interfaces
check: api.endpoints-described
appliesWhen: has-rest-api
references:
  - title: "OpenAPI Specification: Operation Object"
    url: https://spec.openapis.org/oas/latest.html#operation-object
---

## Why it matters

A path and a method are not a contract. `POST /orders/{id}/cancel` does not say whether cancelling a shipped order fails, refunds or is ignored. Callers who guess build on the guess, and a coding agent given only the path will invent the behavior.

## How to apply it

* Write one sentence per endpoint that states the outcome and the main rule: what changes, and when the call is refused.
* Describe behavior, not implementation ("cancels the order if it has not shipped", not "updates the status column").
* Keep the description in the design, so the generated OpenAPI file carries it.

## Example

`POST /v1/orders/{id}/cancel`: "Cancels an order that has not shipped yet and releases its stock reservation. Returns 409 once the order has shipped."
