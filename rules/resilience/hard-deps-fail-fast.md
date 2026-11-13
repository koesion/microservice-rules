---
id: resilience.hard-deps-fail-fast
version: 1
title: Hard dependencies have a circuit breaker or a fallback
category: resilience
priority: high
scope: service
summary: When a dependency the service needs is failing, calls to it stop quickly or are answered another way.
skill: resilience-patterns
wizardStep: 3-data-deps
check: resilience.hard-deps-fail-fast
appliesWhen: has-hard-sync-deps
references:
  - title: "Pattern: Circuit Breaker (microservices.io)"
    url: https://microservices.io/patterns/reliability/circuit-breaker.html
  - title: Circuit Breaker (Martin Fowler)
    url: https://martinfowler.com/bliki/CircuitBreaker.html
---

## Why it matters

A timeout limits how long one call waits. It does not stop the next thousand calls from waiting just as long against a dependency that is clearly down. A circuit breaker stops sending them, which protects your own capacity and gives the dependency room to recover. A fallback goes further and keeps the feature working in a reduced form.

## How to apply it

* Wrap calls to each hard dependency in a circuit breaker that opens after a failure threshold and probes before closing.
* Where a degraded answer is acceptable, add a fallback: a cached value, a default, or accepting the request and finishing it later.
* Say which you chose per dependency. A fallback that hides a failure nobody monitors is a new problem.
* Alert when a breaker opens.

## Example

`catalog → pricing` opens its breaker after 50% failures over 20 calls and serves the last cached price, flagged as possibly stale, until pricing answers again.
