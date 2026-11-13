---
id: data.other-services-data-via-contracts
version: 1
title: "Other services' data is reached through their API or events"
category: data
priority: high
scope: service
summary: "The service never reads another service's tables, files or cache. It calls the owner or keeps its own copy built from the owner's events."
skill: database-per-service
references:
  - title: "Pattern: API composition (microservices.io)"
    url: https://microservices.io/patterns/data/api-composition.html
  - title: "Data considerations for microservices (Azure Architecture Center)"
    url: https://learn.microsoft.com/en-us/azure/architecture/microservices/design/data-considerations
---

## Why it matters

Reading another team's tables is the fastest way to get data and the most expensive to live with. Your code now depends on their column names, their soft-delete flag, their half-finished migration. They can't see the dependency, so they break it without knowing, and you find out from wrong numbers.

## How to apply it

* When the service needs a fact another service owns, ask the owner through its API, or subscribe to its events and store what you need.
* Choose by need: call for data that must be current and is rarely read; keep a copy for data read often or needed when the owner is down.
* Store the owner's id as a reference, not a copy of its whole record.
* Don't share caches, files or queues as a back door either.
* If the owner offers no API or event for it, ask for one. Don't work around it.

## Example

Orders shows the customer name on an order. It keeps `customerId` and a `customerName` copied from `CustomerRenamed` events, and calls `GET /v1/customers/{id}` only on the detail page. It has no access to the customers database.
