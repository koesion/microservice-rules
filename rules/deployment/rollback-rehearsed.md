---
id: deployment.rollback-rehearsed
version: 1
title: "The way back to the legacy system has been rehearsed"
category: deployment
priority: high
scope: service
summary: "The team has switched traffic back to the old system at least once, on purpose, and knows what happens to the data written meanwhile."
skill: strangler-fig-migration
references:
  - title: "Strangler Fig pattern (Azure Architecture Center)"
    url: https://learn.microsoft.com/en-us/azure/architecture/patterns/strangler-fig
  - title: "Blue Green Deployment (Martin Fowler)"
    url: https://martinfowler.com/bliki/BlueGreenDeployment.html
---

## Why it matters

Every migration plan has a line saying "roll back if needed". Few have been tried. Sending the traffic back is the easy half. The hard half is the data the new service wrote while it was live: if the old system can't see it, going back loses orders. A rollback that has never been run is a hope.

## How to apply it

* Keep the legacy path deployed and working until the new one has run long enough to trust.
* Decide what happens to data written by the new service on rollback: synced back continuously, replayed, or accepted as a gap.
* Rehearse: switch a share of traffic to the new service, then back, and check nothing is lost.
* Write the steps and the decision criteria in the runbook, with who makes the call.
* Set the point of no return on purpose: the date the legacy path is removed.

## Example

While both paths were live, the new service published every notification it sent to a topic the monolith consumed, so the legacy log stayed complete. In week two the team rolled 10% back for an hour as a drill; no notification was lost or sent twice.
