---
id: security.gateway-auth-declared
version: 1
title: "The gateway states how it authenticates callers"
category: security
priority: high
scope: service
summary: "Every API gateway in front of the service names its authentication method, so nobody assumes the other side is doing it."
skill: api-gateway
wizardStep: 2-interfaces
check: security.gateway-auth-declared
appliesWhen: behind-gateway
references:
  - title: "Gateway Offloading pattern (Azure Architecture Center)"
    url: https://learn.microsoft.com/en-us/azure/architecture/patterns/gateway-offloading
  - title: "Pattern: Access token (microservices.io)"
    url: https://microservices.io/patterns/security/access-token.html
---

## Why it matters

When a gateway sits in front of a service, authentication can happen at the gateway, in the service, or in both. The dangerous case is neither: the service trusts the gateway and the gateway route was added without a check. Writing down what the gateway does makes the split explicit and reviewable.

## How to apply it

* For each gateway, record how it authenticates callers: OAuth 2.0 JWT validation, API key, mTLS.
* Say what it passes on to the service: the original token, or a signed internal one with the caller's identity.
* Have the service verify that token. It should not trust plain headers such as `X-User-Id`.
* Make sure the service can't be reached around the gateway: network policy, private ingress.
* Keep fine-grained authorization in the service, which knows the data.

## Example

Gateway `public-api`: validates the OAuth 2.0 access token (issuer, audience, expiry) and forwards it unchanged. The orders service validates the signature again and checks `orders:write`. Its ingress only accepts traffic from the gateway.
