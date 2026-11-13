---
id: deployment.resource-limits
version: 1
title: CPU and memory limits are set
category: deployment
priority: medium
scope: service
summary: Each instance declares how much CPU and memory it needs and may use.
skill: kubernetes-deployment
wizardStep: 4-operations
check: deployment.resource-limits
appliesWhen: runs-replicas
references:
  - title: "Kubernetes: resource management for pods and containers"
    url: https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/
---

## Why it matters

Without a declared request the scheduler packs the service onto a node by guesswork, and a noisy neighbor starves it. Without a limit a memory leak takes the node down along with everything else on it. Stated numbers are also the starting point for capacity planning and for cost.

## How to apply it

* Set a memory request and limit from what the service uses under load, with headroom. Keep them equal or close, so the instance is not the first one evicted.
* Set a CPU request from measured use. Be careful with tight CPU limits: throttling shows up as latency, not as an error.
* Revisit the numbers after load tests and after traffic grows.

## Example

`deployment.resources: { cpu: 500m, memory: 512Mi }`, measured at 300m and 380Mi at peak.
