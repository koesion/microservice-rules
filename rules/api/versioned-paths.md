---
id: api.versioned-paths
version: 1
title: API paths carry a version
category: api
priority: medium
scope: service
summary: Every REST path includes a version segment, so a breaking change can ship next to the old contract.
skill: sync-communication
wizardStep: 2-interfaces
check: api.versioned-paths
appliesWhen: has-rest-api
references:
  - title: "Web API design: versioning (Microsoft Azure Architecture Center)"
    url: https://learn.microsoft.com/en-us/azure/architecture/best-practices/api-design#implement-versioning
  - title: "AIP-185: API versioning (Google)"
    url: https://google.aip.dev/185
---

## Why it matters

Sooner or later an API needs a breaking change. Without a version in the contract, the only options are breaking every caller at once or never changing. With one, the new contract ships beside the old, and callers move when they can.

## How to apply it

* Put a major version in the path (`/v1/orders`). It is visible in logs, easy to route on and hard to forget.
* Bump it only for breaking changes. Adding a field or an endpoint is not one.
* When `/v2` ships, announce an end date for `/v1` and watch its traffic drop before removing it.
* If you version through a header or a media type instead, mark this rule not applicable and say so in the reason.

## Example

`GET /v1/orders/{id}` and `GET /v2/orders/{id}` are served by the same service while callers migrate.
