---
id: architecture.legacy-retired
version: 1
title: "The replaced legacy code is removed"
category: architecture
priority: medium
scope: service
summary: "Once the new service carries all the traffic, the old code path, its data and its routes are deleted."
skill: strangler-fig-migration
references:
  - title: "Strangler Fig (Martin Fowler)"
    url: https://martinfowler.com/bliki/StranglerFigApplication.html
  - title: "Strangler fig pattern (AWS Prescriptive Guidance)"
    url: https://docs.aws.amazon.com/prescriptive-guidance/latest/modernization-decomposing-monoliths/strangler-fig.html
---

## Why it matters

A migration that stops at "the new service is live" leaves two implementations. The old one still gets called by a forgotten batch job, still has to be patched, and still confuses whoever reads the code next. The monolith only shrinks when the last step is done, and that is the step most often skipped.

## How to apply it

* Confirm nothing still calls the old path: log or count calls to it for a full business cycle, month-end included.
* Remove the code, its routes, its scheduled jobs and its configuration from the legacy system.
* Drop or archive its tables once the retention rules allow.
* Delete the migration scaffolding too: sync jobs, comparators, flags, and adapters that are no longer needed.
* Record the removal in an ADR, and update the catalog.

## Example

After 30 days with zero calls to the monolith's `NotificationSender`, the team deleted the class and its cron job, dropped `notification_log` after a final export, and removed the `notifications.target` flag and the sync topic.
