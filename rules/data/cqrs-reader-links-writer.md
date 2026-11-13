---
id: data.cqrs-reader-links-writer
version: 1
title: "A read model names the service that writes the data"
category: data
priority: medium
scope: service
summary: "A service that is the read side of a CQRS pair says which service owns the writes, so the source of truth is never in doubt."
skill: cqrs
wizardStep: 3-data-deps
check: data.cqrs-reader-links-writer
appliesWhen: cqrs-reader
references:
  - title: "CQRS (Martin Fowler)"
    url: https://martinfowler.com/bliki/CQRS.html
  - title: "Pattern: CQRS (microservices.io)"
    url: https://microservices.io/patterns/data/cqrs.html
---

## Why it matters

A read model is a copy, shaped for queries. If it doesn't say whose data it copies, people start treating it as the truth: they write to it, fix data in it, or build another service on top of it. When it disagrees with the write side, nobody knows which one is right.

## How to apply it

* On the read side, name the service that owns the writes.
* Say how the data arrives: which events, or which change feed.
* Never accept writes on the read side. A correction goes to the writer and flows back.
* State how far behind the read model can be.
* If the read model combines several writers, name each one.

## Example

`order-search` is the read side for `orders`. It consumes `OrderPlaced`, `OrderConfirmed` and `OrderCancelled` into an OpenSearch index, usually under two seconds behind. It has no write endpoints.
