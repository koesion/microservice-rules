---
id: security.authn-defined
version: 1
title: Every caller is authenticated
category: security
priority: critical
scope: service
summary: The design says how the service knows who is calling, for users and for other services.
skill: microservice-security
wizardStep: 4-operations
check: security.authn-defined
references:
  - title: "OWASP API Security Top 10 (2023): API2 Broken Authentication"
    url: https://owasp.org/API-Security/editions/2023/en/0xa2-broken-authentication/
  - title: "Pattern: Access token (microservices.io)"
    url: https://microservices.io/patterns/security/access-token.html
---

## Why it matters

"It's only reachable inside the network" is not authentication. Anything that gets a foothold in the network, such as a compromised service or a misrouted request, can call an unauthenticated service as anyone. Broken authentication has been near the top of the API risk lists for years.

## How to apply it

* Authenticate every request, including service-to-service calls: signed tokens validated by the service, or mutual TLS between services.
* Validate the token yourself (signature, expiry, audience). Don't trust a header because a gateway usually sets it.
* Keep health checks as the only unauthenticated endpoints, and make them say nothing.

## Example

`security.authn: OAuth 2.0 bearer JWT validated against the issuer's keys (audience orders-api); mTLS between services`.
