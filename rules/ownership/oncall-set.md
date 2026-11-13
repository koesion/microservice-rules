---
id: ownership.oncall-set
version: 1
title: An on-call rotation or escalation contact is named
category: ownership
priority: high
scope: service
summary: The design says who is reached, and how, when the service breaks outside office hours.
skill: team-topologies-ownership
wizardStep: 1-identity
check: ownership.oncall-set
references:
  - title: Being On-Call (Google SRE Book)
    url: https://sre.google/sre-book/being-on-call/
---

## Why it matters

An alert that reaches nobody is not an alert. Callers of your service need to know where to escalate when it misbehaves, and they need to know before the incident, not during it.

## How to apply it

* Name the rotation or the escalation path, not an individual: a paging service key, a rotation name or a shared channel that is watched.
* Make sure the rotation has at least two people, so that being on call is survivable.
* State the expected response time if it differs from your organization's default.

## Example

`owner.oncall: payments-primary rotation, 15 minutes to acknowledge, escalates to payments-secondary`.
