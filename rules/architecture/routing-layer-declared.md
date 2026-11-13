---
id: architecture.routing-layer-declared
version: 1
title: "A routing layer sits between callers and the service"
category: architecture
priority: high
scope: service
summary: "Requests reach the service through a gateway or proxy that can send each route to the old system or the new one."
skill: strangler-fig-migration
wizardStep: 2-interfaces
check: architecture.routing-layer-declared
references:
  - title: "Strangler Fig (Martin Fowler)"
    url: https://martinfowler.com/bliki/StranglerFigApplication.html
  - title: "Strangler Fig pattern (Azure Architecture Center)"
    url: https://learn.microsoft.com/en-us/azure/architecture/patterns/strangler-fig
  - title: "Gateway Routing pattern (Azure Architecture Center)"
    url: https://learn.microsoft.com/en-us/azure/architecture/patterns/gateway-routing
---

## Why it matters

The strangler approach depends on one thing: something in front of both systems that decides, per route, which one answers. Without it, moving a capability means changing every caller at once, and moving it back means doing that again under pressure. With it, clients keep one address and never learn which system served them.

## How to apply it

* Put a gateway, reverse proxy or facade in front of the legacy system before extracting anything, and send all traffic through it.
* Declare it on the service, with the routes it sends here.
* Keep routing rules in configuration that can change without a release.
* Keep the layer thin: routing, authentication, limits. Business logic in it becomes the next monolith.
* Watch it: it is now a single point of failure, so run it redundantly.

## Example

Gateway `edge-proxy` fronts `shop.example.com`. `/api/notifications/*` goes to the new `notifications` service; every other path still goes to the monolith. The route table is a config map, changed without a deploy.
