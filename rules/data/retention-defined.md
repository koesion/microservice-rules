---
id: data.retention-defined
version: 1
title: "Retention and deletion are defined"
category: data
priority: medium
scope: service
summary: "For each kind of data it owns, the service says how long it is kept and how it is removed."
skill: database-per-service
appliesWhen: owns-data
references:
  - title: "GDPR Article 5: principles relating to processing of personal data"
    url: https://gdpr-info.eu/art-5-gdpr/
  - title: "GDPR Article 17: right to erasure"
    url: https://gdpr-info.eu/art-17-gdpr/
---

## Why it matters

Data kept forever by default costs more every year, slows every query and backup, and widens what a breach exposes. For personal data, keeping it longer than needed is against the law in many places. Deciding retention late means deleting from tables that were never designed for it.

## How to apply it

* For each store or table group, state the retention period and the reason: legal, contractual, operational.
* Implement removal as a scheduled job or a store feature (TTL, partition drop), not a manual task.
* Cover the copies: backups, caches, search indexes, logs and the copies other services built from your events.
* Publish an event when data is erased, so those copies can follow.
* Prefer anonymizing to deleting where totals must stay correct.

## Example

"Orders are kept seven years for tax reasons, then anonymized by a monthly job. Carts are deleted after 30 days of inactivity by a TTL index. Erasing a customer publishes `CustomerErased`; backups expire after 35 days."
