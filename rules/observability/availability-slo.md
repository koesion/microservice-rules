---
id: observability.availability-slo
version: 1
title: An availability objective is set
category: observability
priority: high
scope: service
summary: "The service has a stated availability target, so \"is it reliable enough?\" has an answer."
skill: observability
wizardStep: 4-operations
check: observability.availability-slo
references:
  - title: Service Level Objectives (Google SRE Book)
    url: https://sre.google/sre-book/service-level-objectives/
---

## Why it matters

Without a target every outage is equally bad and every reliability project equally urgent. A target tells the team when to stop shipping features and fix stability, and tells callers what they can build on. It also sets the timeouts, replica counts and dependency choices in the rest of the design.

## How to apply it

* State the objective as a percentage over a window, measured where the user feels it: "99.9% of requests succeed over 30 days".
* Choose it from what users need, not from what looks good. Each extra nine costs roughly ten times more.
* A service can't promise more than the hard dependencies it calls. Check their objectives first.
* Derive the error budget from it and agree what happens when it runs out.

## Example

`slo.availability: 99.9%` over 30 days, which allows about 43 minutes of failed requests per month.
