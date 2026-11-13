---
id: observability.alerts-defined
version: 1
title: Alerts are defined
category: observability
priority: high
scope: service
summary: The service has alerts on symptoms its users would notice, each one actionable.
skill: observability
check: observability.alerts-defined
references:
  - title: Monitoring Distributed Systems (Google SRE Book)
    url: https://sre.google/sre-book/monitoring-distributed-systems/
  - title: Alerting on SLOs (Google SRE Workbook)
    url: https://sre.google/workbook/alerting-on-slos/
---

## Why it matters

Without alerts you learn about an outage from your users. With the wrong alerts the team is paged for things that need no action, and learns to ignore the pager. Both end in the same place: a real incident that nobody reacts to.

## How to apply it

* Alert on **symptoms**: error rate, latency against the objective, queue lag. Causes (CPU, memory) belong on dashboards.
* Every alert that pages must need a human, now. If it can wait until morning it is a ticket.
* Tie alerts to the objective: page when the error budget is burning fast enough to run out.
* Link each alert to its runbook entry.
* Alerts are listed in the **Alerts** section of the MICROSERVICE.md.

## Example

"Page when more than 2% of requests fail for 5 minutes. Ticket when p99 latency is above 800 ms for 30 minutes."
