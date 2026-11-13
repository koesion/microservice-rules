---
id: deployment.cutover-by-routing
version: 1
title: "Cutover is a routing change, not a release"
category: deployment
priority: high
scope: service
summary: "Switching traffic between the old system and the new service is a configuration change that takes effect in minutes."
skill: strangler-fig-migration
references:
  - title: "Feature Toggles (Pete Hodgson)"
    url: https://martinfowler.com/articles/feature-toggles.html
  - title: "Blue Green Deployment (Martin Fowler)"
    url: https://martinfowler.com/bliki/BlueGreenDeployment.html
---

## Why it matters

If moving traffic to the new service needs a deploy of the monolith, a client release or a DNS change, then moving it back does too, and that takes hours on the day something goes wrong. Deploying the new service and sending users to it should be two separate acts, so the second can be small, fast and reversible.

## How to apply it

* Deploy the new service to production first, taking no user traffic.
* Switch with a routing rule or a flag in the gateway, not with code in the callers.
* Make the switch per route and per share of traffic, so it can go in steps.
* Check the switch takes effect quickly: no long DNS TTLs, no client-side caches of the old address.
* Record who may flip it and where, in the runbook.

## Example

Both systems are live. The gateway holds `notifications.target = legacy | new` with a weight. Changing the weight is a config push that applies in under a minute, and needs no deploy of the monolith, the new service or any client.
