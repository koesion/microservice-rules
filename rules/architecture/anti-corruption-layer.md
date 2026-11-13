---
id: architecture.anti-corruption-layer
version: 1
title: "The legacy model stays behind an anti-corruption layer"
category: architecture
priority: high
scope: service
summary: "Calls to and from the legacy system pass through a translation layer, so its data model and quirks don't leak into the new service."
skill: strangler-fig-migration
references:
  - title: "Anti-corruption Layer pattern (Azure Architecture Center)"
    url: https://learn.microsoft.com/en-us/azure/architecture/patterns/anti-corruption-layer
  - title: "Pattern: Anti-corruption layer (microservices.io)"
    url: https://microservices.io/patterns/refactoring/anti-corruption-layer.html
---

## Why it matters

During a migration the new service has to talk to the old system. If it uses the old system's tables, status codes and field names directly, it inherits the design it was meant to replace, and it can't be finished until the monolith is gone. A translation layer keeps the old model in one place that can be deleted later.

## How to apply it

* Put every interaction with the legacy system behind one adapter with an interface written in the new service's terms.
* Translate both ways there: names, types, status codes, error handling.
* Keep legacy ids as external references, not as the new service's keys.
* Don't let legacy types cross the adapter into the domain code.
* Plan to delete it: the adapter is temporary, and its size shows how much migration is left.

## Example

`LegacyCustomerAdapter.getCustomer(id)` calls the monolith's `/cust/lookup`, maps `CUST_STAT = "A"` to `status: active`, splits `NAME` into given and family name, and turns the legacy `-1` result into a `NotFound` error. Nothing outside the adapter knows the legacy field names.
