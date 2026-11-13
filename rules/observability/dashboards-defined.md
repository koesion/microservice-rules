---
id: observability.dashboards-defined
version: 1
title: A dashboard exists
category: observability
priority: low
scope: service
summary: The service has a dashboard showing its traffic, errors and latency at a glance.
skill: observability
check: observability.dashboards-defined
references:
  - title: The Four Golden Signals (Google SRE Book)
    url: https://sre.google/sre-book/monitoring-distributed-systems/#xref_monitoring_golden-signals
---

## Why it matters

During an incident the first question is "what changed, and when?". A dashboard that already exists answers it in seconds. Building one while the service is down does not.

## How to apply it

* Start with rate, errors and duration for the service as a whole, then per endpoint or consumer.
* Add the saturation signals that matter for this service: queue depth, connection pool use, database latency.
* Mark deploys on the graphs.
* Dashboards are listed in the **Dashboards** section of the MICROSERVICE.md.

## Example

"orders: overview" with request rate, error rate, p50/p99 latency, consumer lag on `orders.order-placed` and deploy markers.
