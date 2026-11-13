---
id: architecture.bounded-context-named
version: 1
title: "The service names its bounded context"
category: architecture
priority: high
scope: service
summary: "The service says which part of the business it belongs to, so its boundary can be judged and its language is unambiguous."
skill: identifying-bounded-contexts
wizardStep: 1-identity
check: architecture.bounded-context-named
references:
  - title: "Bounded Context (Martin Fowler)"
    url: https://martinfowler.com/bliki/BoundedContext.html
  - title: "Pattern: Decompose by subdomain (microservices.io)"
    url: https://microservices.io/patterns/decomposition/decompose-by-subdomain.html
---

## Why it matters

"Customer" means one thing to billing and another to support. A bounded context is the area in which a word has one meaning and one model. A service that doesn't say which context it lives in tends to absorb a little of each neighbour, and a service carved out of a monolith along a technical seam, not a business one, takes the monolith's tangles with it.

## How to apply it

* Name the bounded context the service belongs to, in the business's words: Ordering, Billing, Fulfilment.
* Check that the service's responsibilities all fall inside it. One that doesn't is a sign of a wrong boundary.
* Keep one model per context. Translate at the edge when another context uses the same word differently.
* Several services may share a context; one service should not span two.
* When extracting from a monolith, pick the context first, then find the code.

## Example

Service `orders`, bounded context **Ordering**. It owns orders and carts. It does not own the customer profile (Customer context) or stock levels (Inventory context), and refers to both by id.
