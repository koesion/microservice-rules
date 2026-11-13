---
id: deployment.min-two-replicas
version: 1
title: At least two replicas run
category: deployment
priority: high
scope: service
summary: The service runs as two or more instances, so losing one does not take it down.
skill: kubernetes-deployment
wizardStep: 4-operations
check: deployment.min-two-replicas
appliesWhen: runs-replicas
references:
  - title: "Kubernetes: Deployments"
    url: https://kubernetes.io/docs/concepts/workloads/controllers/deployment/
  - title: "Kubernetes: specifying a disruption budget"
    url: https://kubernetes.io/docs/tasks/run-application/configure-pdb/
---

## Why it matters

One instance is a single point of failure, and it fails more often than people expect: every deploy, every node upgrade and every crash is downtime. Two instances turn each of those into a non-event, and are also what makes a rolling deploy possible.

## How to apply it

* Run at least two replicas in production, on different nodes and preferably different zones.
* Size them so the service still meets its objective with one replica gone.
* Make the service safe to run twice: no in-memory state another request depends on, and scheduled jobs that take a lock.
* Set a disruption budget so maintenance never removes all replicas at once.

## Example

`deployment.replicas: 3` across three zones, with a disruption budget of at most one unavailable.
