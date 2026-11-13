---
id: security.service-to-service-auth
version: 1
title: "Service-to-service calls are authenticated"
category: security
priority: high
scope: service
summary: "A call from another service proves who is calling, with mTLS or a signed token. Being inside the network is not proof."
skill: microservice-security
references:
  - title: "Microservices Security Cheat Sheet (OWASP)"
    url: https://cheatsheetseries.owasp.org/cheatsheets/Microservices_Security_Cheat_Sheet.html
  - title: "SPIFFE overview"
    url: https://spiffe.io/docs/latest/spiffe-about/overview/
  - title: "NIST SP 800-204: Security Strategies for Microservices-based Application Systems"
    url: https://csrc.nist.gov/pubs/sp/800/204/final
---

## Why it matters

If internal calls are trusted because they come from inside the network, one compromised service or one misconfigured ingress gives access to every other service. With many services and many deploys a day, the inside of the network is not a safe place. Each service has to know who is calling it.

## How to apply it

* Give every service its own identity: a workload certificate from the mesh or SPIFFE, or a client-credentials token.
* Require it on every internal endpoint, including admin and debug ones.
* Authorize by caller: list which services may call which operations, and reject the rest.
* Keep the end user's identity in the request too, so the callee can apply the user's permissions.
* Use short-lived credentials that are issued and rotated automatically.

## Example

The mesh issues each pod a certificate and enforces mTLS. An authorization policy lets only `checkout` and `support-console` call `POST /v1/refunds` on payments. The user's JWT travels in the `Authorization` header and payments checks its scope.
