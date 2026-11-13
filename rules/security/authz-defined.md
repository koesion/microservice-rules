---
id: security.authz-defined
version: 1
title: Access is authorized per resource
category: security
priority: high
scope: service
summary: The design says how the service decides what an authenticated caller may do, down to the individual resource.
skill: microservice-security
wizardStep: 4-operations
check: security.authz-defined
references:
  - title: "OWASP API Security Top 10 (2023): API1 Broken Object Level Authorization"
    url: https://owasp.org/API-Security/editions/2023/en/0xa1-broken-object-level-authorization/
  - title: OWASP Authorization Cheat Sheet
    url: https://cheatsheetseries.owasp.org/cheatsheets/Authorization_Cheat_Sheet.html
---

## Why it matters

Knowing who is calling does not settle what they may see. The most common API vulnerability is an endpoint that checks the caller is signed in and then returns whichever record id was asked for, including someone else's.

## How to apply it

* State the model: roles, scopes, or ownership of the resource.
* Check on every request, in the service that owns the data. A check done only at the gateway does not survive a second entry point.
* Check the **object**, not just the endpoint: this caller, this order.
* Deny by default. A new endpoint with no rule is closed.

## Example

`security.authz: scope orders:read to read; a customer may read only orders whose customerId matches the token subject; orders:admin for refunds`.
