---
id: ownership.runbook-present
version: 1
title: A runbook exists
category: ownership
priority: high
scope: service
summary: The service has written steps for its most likely failures, so the person on call does not start from zero.
skill: documentation-standards
wizardStep: 4-operations
check: ownership.runbook-present
references:
  - title: Emergency Response (Google SRE Book)
    url: https://sre.google/sre-book/emergency-response/
---

## Why it matters

The person paged at 3 a.m. is often not the person who wrote the service. A runbook turns "figure it out" into "follow these steps", which shortens the outage and lowers the stress. Writing it is also a design review: a failure you can't describe a response to is a failure you haven't designed for.

## How to apply it

* Cover the failures you expect first: a dependency is down, the queue is backing up, the database is full, a bad deploy needs rolling back.
* For each one give the symptom, how to confirm it, the action to take and how to tell it worked.
* Link every alert to its runbook entry.
* Review the runbook after each incident; an entry that was wrong during an incident is worse than none.

## Example

"**Order queue lag above 5 minutes.** Check the consumer count on the `orders` dashboard. If consumers are healthy, scale the deployment to 6 replicas. If they are crash-looping, roll back the last release."
