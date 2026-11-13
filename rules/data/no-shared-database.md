---
id: data.no-shared-database
version: 1
title: "No other service reads or writes its database"
category: data
priority: critical
scope: service
summary: "The service is the only thing that touches its tables. Everyone else goes through its API or its events."
skill: database-per-service
appliesWhen: owns-data
references:
  - title: "Pattern: Database per service (microservices.io)"
    url: https://microservices.io/patterns/data/database-per-service.html
  - title: "Pattern: Shared database (microservices.io)"
    url: https://microservices.io/patterns/data/shared-database.html
---

## Why it matters

A table two services use is a contract nobody wrote down. Neither team can change a column without breaking the other, both have to deploy together, and a slow query from one takes the other down. The services look separate on a diagram and behave like one application with two deploy pipelines.

## How to apply it

* Give the service its own database or schema, with credentials no other service holds.
* Offer other services what they need through an API or through events they can keep a copy of.
* Treat reports and analytics the same way: feed a warehouse from events or a replica made for it, not from the live tables.
* If a shared table exists today, name the one owner, list the other readers and writers, and move them off one at a time.
* Let the database refuse the access. A convention is not enough.

## Example

Shipping needs delivery addresses. It does not query the `orders` schema: it consumes `OrderPlaced`, which carries the address, and stores its own copy. The `orders` schema grants access to `orders_app` only.
