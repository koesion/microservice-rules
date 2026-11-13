---
id: data.owned-data-declared
version: 1
title: The service owns its data and says what it holds
category: data
priority: high
scope: service
summary: Each data store belongs to this service alone, and the design says what is kept in it.
skill: database-per-service
wizardStep: 3-data-deps
check: data.owned-data-declared
appliesWhen: domain-service
references:
  - title: "Pattern: Database per service (microservices.io)"
    url: https://microservices.io/patterns/data/database-per-service.html
---

## Why it matters

A database shared by two services couples them more tightly than any API: neither can change a table without the other, and a slow query from one takes down both. Declaring what a service owns is what makes the boundary real. It also answers "where does customer data live?" without reading code.

## How to apply it

* List every store the service writes to, with its type and a sentence on what it holds.
* No other service reads or writes these stores. Others get the data through this service's API or its events.
* If the service is stateless, mark this rule not applicable and say so.

## Example

`orders-db (postgres)`: "Orders, order lines and their status history. The source of truth for order state."
