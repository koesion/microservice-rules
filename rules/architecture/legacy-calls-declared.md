---
id: architecture.legacy-calls-declared
version: 1
title: "Calls back to the legacy system are declared"
category: architecture
priority: medium
scope: service
summary: "Every call the new service still makes to the legacy system is listed as a dependency, with what it is for and how failure is handled."
skill: strangler-fig-migration
references:
  - title: "Strangler fig pattern (AWS Prescriptive Guidance)"
    url: https://docs.aws.amazon.com/prescriptive-guidance/latest/modernization-decomposing-monoliths/strangler-fig.html
  - title: "Patterns of Legacy Displacement (Martin Fowler)"
    url: https://martinfowler.com/articles/patterns-legacy-displacement/
---

## Why it matters

An extracted service nearly always calls back into the monolith for data that hasn't moved yet. Those calls are the remaining coupling: they decide whether the service survives a monolith outage and what is left to migrate. Undeclared, they are forgotten until the day someone tries to turn the monolith off.

## How to apply it

* List the legacy system as a synchronous dependency of the service, with the reason for each call.
* Mark it hard or soft: can the service still do its job when the monolith is down?
* Put a timeout on every call, and a circuit breaker or fallback on the hard ones.
* Give each call an exit: which later extraction or event removes it.
* Declare the reverse direction too, when the monolith calls the new service.

## Example

Dependency: `monolith` (hard): "customer email and phone for sending notifications; replaced by `CustomerContactChanged` events once the customer service is extracted". Timeout 500 ms, circuit breaker, falls back to the contact details stored with the last notification.
