---
id: security.scopes-declared
version: 1
title: "Scopes or permissions are declared"
category: security
priority: medium
scope: service
summary: "The service lists the scopes or permissions its API checks, so callers know what to ask for and reviewers know what is protected."
skill: microservice-security
check: security.scopes-declared
appliesWhen: has-api
references:
  - title: "OAuth 2.0 scope"
    url: https://oauth.net/2/scope/
  - title: "Authorization Cheat Sheet (OWASP)"
    url: https://cheatsheetseries.owasp.org/cheatsheets/Authorization_Cheat_Sheet.html
---

## Why it matters

"Authorization: scopes" says how access is decided, not what the decisions are. Without the list, a client team guesses which scope it needs, tokens get issued with everything, and a reviewer can't tell whether deleting an order needs more than reading one. A written list is also the only thing an access review can be checked against.

## How to apply it

* List every scope or permission the service checks, named `resource:action`.
* Separate reading from writing, and keep destructive or administrative actions in their own scope.
* Say which endpoints need which scope, in the API description.
* Check the scope in the service itself, even when the gateway checks it too.
* Issue each client the smallest set it needs.

## Example

Scopes: `orders:read`, `orders:write`, `orders:refund`. `GET /v1/orders/{id}` needs `orders:read`; `POST /v1/orders/{id}/refund` needs `orders:refund`, which only the support console holds.
