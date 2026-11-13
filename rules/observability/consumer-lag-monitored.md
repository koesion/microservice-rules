---
id: observability.consumer-lag-monitored
version: 1
title: "Consumer lag is monitored"
category: observability
priority: high
scope: service
summary: "The service measures how far behind its consumers are and alerts before the delay hurts users."
skill: observability
appliesWhen: consumes-events
references:
  - title: "Monitor consumer lag (Confluent)"
    url: https://docs.confluent.io/platform/current/monitoring/monitor-consumer-lag.html
  - title: "Alerting (Prometheus practices)"
    url: https://prometheus.io/docs/practices/alerting/
---

## Why it matters

A consumer that has stopped looks healthy from the outside: no errors, no failed requests, just data that gets older. Lag is the one signal that shows it. Without it the first report comes from a user asking why their order from an hour ago is still pending.

## How to apply it

* Export lag for every consumer group or subscription: messages behind, and better, the age of the oldest unprocessed message.
* Alert on age, not on count. A thousand messages can be one second or one hour of work.
* Set the threshold from what users can tolerate, and page only when it is crossed for several minutes.
* Put lag on the service dashboard beside throughput and error rate.
* Watch the dead-letter queue the same way.

## Example

Alert: "shipping consumer: oldest unprocessed `OrderPlaced` is older than 5 minutes, for 10 minutes". The dashboard shows lag per partition, messages per second and dead-letter count.
