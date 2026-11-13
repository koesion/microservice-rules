---
id: deployment.progressive-rollout
version: 1
title: "Traffic moves to the new version in steps"
category: deployment
priority: medium
scope: service
summary: "A release, or a cutover, reaches a small share of traffic first and grows only while the metrics stay healthy."
skill: progressive-delivery
references:
  - title: "Canary Release (Martin Fowler)"
    url: https://martinfowler.com/bliki/CanaryRelease.html
  - title: "Canarying Releases (Google SRE workbook)"
    url: https://sre.google/workbook/canarying-releases/
---

## Why it matters

Tests and shadow traffic lower the risk; they don't remove it. Sending everything to new code at once means a missed case hits every user at the same moment. Sending 1% first means it hits a few, shows up in the metrics, and is undone before most people notice.

## How to apply it

* Release to a small share first: 1%, or internal users, or one region.
* Decide in advance what is watched (error rate, latency, a business metric) and the thresholds that stop the rollout.
* Grow in steps, with enough time at each for problems to show.
* Automate promotion and rollback where the platform allows it.
* Keep users on the same side between requests when the two versions differ in visible ways.

## Example

Cutover of `/api/notifications`: 1% for a day, 10% for a day, 50% for two days, then 100%. The rollout stops and reverts on its own if the 5xx rate passes 0.5% or delivery success falls below 98% for five minutes.
