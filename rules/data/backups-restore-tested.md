---
id: data.backups-restore-tested
version: 1
title: "Backups exist and a restore has been tested"
category: data
priority: high
scope: service
summary: "The data store is backed up automatically, and the team has restored from a backup recently enough to trust it."
skill: database-per-service
appliesWhen: owns-data
references:
  - title: "Data Integrity: What You Read Is What You Wrote (Google SRE book)"
    url: https://sre.google/sre-book/data-integrity/
  - title: "Back up data (AWS Well-Architected Reliability Pillar)"
    url: https://docs.aws.amazon.com/wellarchitected/latest/reliability-pillar/back-up-data.html
  - title: "PostgreSQL: backup and restore"
    url: https://www.postgresql.org/docs/current/backup.html
---

## Why it matters

Nobody needs a backup; they need a restore. Backups fail quietly: the job stopped months ago, the files are encrypted with a lost key, the restore takes two days when the business can stand two hours. The only proof is a restore that worked, and the only time to find out is before the incident.

## How to apply it

* Back up automatically, and keep copies out of reach of the service's own credentials and region.
* State how much data you may lose (RPO) and how long recovery may take (RTO), and check the backup schedule meets them.
* Restore into a scratch environment on a schedule, and check the data is usable.
* Time the restore and write the steps in the runbook.
* Use point-in-time recovery where the store offers it: most data loss is a bad deploy or a bad query, not a dead disk.
* Alert when a backup fails or is older than expected.

## Example

Postgres takes continuous WAL archives and a daily snapshot, kept 35 days in another region. RPO 5 minutes, RTO 1 hour. A monthly job restores the latest snapshot to a scratch instance and runs row-count checks; the last run took 22 minutes.
