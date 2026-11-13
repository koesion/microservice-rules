---
id: api.contract-tests
version: 1
title: "The API is covered by contract tests"
category: api
priority: medium
scope: service
summary: "Tests check that the service still answers the way its consumers expect, and run before every release."
skill: contract-testing
appliesWhen: has-api
references:
  - title: "Contract Test (Martin Fowler)"
    url: https://martinfowler.com/bliki/ContractTest.html
  - title: "Pact documentation"
    url: https://docs.pact.io/
  - title: "Pattern: Service integration contract test (microservices.io)"
    url: https://microservices.io/patterns/testing/service-integration-contract-test.html
---

## Why it matters

A service can pass all its own tests and still break a caller, by renaming a field or tightening a validation. End-to-end tests catch that late and slowly. A contract test catches it in the provider's build, in seconds. In a migration it is also how you show the new service honours what clients expected of the old one.

## How to apply it

* Have each consumer record the requests it makes and the parts of the response it uses.
* Run those contracts against the provider in its pipeline, and block the release when one fails.
* Cover events as well as HTTP.
* Where consumer-driven contracts are not practical, test the provider against its own OpenAPI or AsyncAPI document.
* When replacing a legacy endpoint, capture its real behaviour as the first contract.

## Example

The web app's pact says: `GET /v1/orders/8841` returns 200 with `id`, `status` and `lines[].sku`. The orders pipeline verifies every consumer's pact; a change that removes `status` fails the build before it reaches staging.
