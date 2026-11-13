---
id: observability.latency-target
version: 1
title: A p99 latency target is set
category: observability
priority: medium
scope: service
summary: The service states how fast its slowest normal requests should be.
skill: performance-scalability
wizardStep: 4-operations
check: observability.latency-target
references:
  - title: Service Level Objectives (Google SRE Book)
    url: https://sre.google/sre-book/service-level-objectives/
  - title: The Tail at Scale (Dean and Barroso, Communications of the ACM)
    url: https://research.google/pubs/the-tail-at-scale/
---

## Why it matters

Averages hide the requests that hurt. The p99 is what one user in a hundred gets, and in a chain of calls most users hit somebody's p99. A stated target lets callers set their timeouts from a fact and lets you alert before "slow" turns into "down".

## How to apply it

* Set the target on a high percentile (p99, or p95 for low-traffic services), per endpoint class if they differ a lot.
* Measure it at the server and, where you can, at the caller.
* Budget it: your target has to fit inside your callers' timeouts, and your dependencies' targets have to fit inside yours.

## Example

`slo.latencyP99: 300 ms` for reads and 800 ms for writes, with the gateway timeout at 2 s.
