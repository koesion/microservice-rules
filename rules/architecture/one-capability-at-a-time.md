---
id: architecture.one-capability-at-a-time
version: 1
title: "One capability is extracted at a time"
category: architecture
priority: high
scope: service
summary: "The migration moves a single business capability end to end, and takes real traffic, before the next one starts."
skill: strangler-fig-migration
references:
  - title: "How to break a Monolith into Microservices (Zhamak Dehghani)"
    url: https://martinfowler.com/articles/break-monolith-into-microservices.html
  - title: "Pattern: Strangler application (microservices.io)"
    url: https://microservices.io/patterns/refactoring/strangler-application.html
---

## Why it matters

Migrations fail by being wide. Five services half extracted means five places where the old and new systems must be kept in step, and nothing in production to learn from. One capability taken all the way, with its data and its traffic, proves the pipeline, the routing and the team's habits while the stakes are small.

## How to apply it

* State the one capability this service takes over, and what stays in the legacy system for now.
* Pick early ones that are loosely coupled and change often: low risk, visible gain.
* Take the whole vertical slice: API, logic and data. A service that still reads the monolith's tables has not been extracted.
* Finish means the legacy code path is off, not that the new service exists.
* Start the next extraction only after this one runs in production.

## Example

"This service takes over **order notifications** (email and SMS on order status changes). Out of scope, still in the monolith: marketing emails, notification preferences. Done when the monolith's `NotificationSender` is no longer called."
