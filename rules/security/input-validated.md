---
id: security.input-validated
version: 1
title: "Input is validated at the service boundary"
category: security
priority: high
scope: service
summary: "Every request and message is checked against a schema before any logic runs, whoever sent it."
skill: microservice-security
appliesWhen: has-api
references:
  - title: "Input Validation Cheat Sheet (OWASP)"
    url: https://cheatsheetseries.owasp.org/cheatsheets/Input_Validation_Cheat_Sheet.html
  - title: "REST Security Cheat Sheet (OWASP)"
    url: https://cheatsheetseries.owasp.org/cheatsheets/REST_Security_Cheat_Sheet.html
---

## Why it matters

Unvalidated input is behind injection, broken business rules and most "impossible" data in the database. In a microservice system the caller is often another service, which makes it tempting to skip the check. That caller has bugs too, and may be relaying what an attacker typed.

## How to apply it

* Validate type, length, range and format of every field against a schema, at the edge of the service.
* Use allow-lists: say what is accepted and reject everything else, unknown fields included.
* Set a maximum size on bodies, arrays and strings.
* Reject with a 400 and a message that names the field. Don't try to repair bad input.
* Validate event payloads the same way as HTTP requests.
* Use parameterized queries. Validation does not replace them.

## Example

`POST /v1/orders` is validated against the OpenAPI schema by middleware: `quantity` is an integer from 1 to 999, `sku` matches `^[A-Z0-9-]{4,20}$`, `lines` has at most 100 items, extra properties are rejected. The handler never sees a request that fails.
