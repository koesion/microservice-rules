---
id: security.rate-limits
version: 1
title: "Callers are rate limited"
category: security
priority: medium
scope: service
summary: "Each caller has a request quota, enforced at the gateway or in the service, so one client cannot exhaust it for everyone."
skill: microservice-security
appliesWhen: has-api
references:
  - title: "API4:2023 Unrestricted Resource Consumption (OWASP API Security Top 10)"
    url: https://owasp.org/API-Security/editions/2023/en/0xa4-unrestricted-resource-consumption/
  - title: "Denial of Service Cheat Sheet (OWASP)"
    url: https://cheatsheetseries.owasp.org/cheatsheets/Denial_of_Service_Cheat_Sheet.html
---

## Why it matters

Without a limit, one client with a retry bug or one person scraping the API can use all the service's capacity, and every other caller pays for it. Limits also slow down password guessing and enumeration, and cap the bill for anything charged per call.

## How to apply it

* Set a quota per caller (client id, API key or user), not one global number.
* Enforce it where the caller is known: usually the gateway, plus a coarser limit in the service as a backstop.
* Answer `429` with a `Retry-After` header, and document the limits.
* Use tighter limits on expensive or sensitive operations: search, export, login, password reset.
* Limit page sizes and payload sizes too.
* Alert when a caller is throttled for long: it is usually a bug on their side.

## Example

The gateway allows each client 100 requests per second with a burst of 200, and 5 per minute on `POST /v1/exports`. Over the limit it returns `429` with `Retry-After: 2`. List endpoints cap `pageSize` at 200.
