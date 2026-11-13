---
id: security.secrets-rotatable
version: 1
title: "Secrets can be rotated without a release"
category: security
priority: medium
scope: service
summary: "Every secret the service uses can be replaced on a schedule, or within the hour after a leak, without a code change."
skill: microservice-security
appliesWhen: has-secrets
references:
  - title: "Secrets Management Cheat Sheet (OWASP)"
    url: https://cheatsheetseries.owasp.org/cheatsheets/Secrets_Management_Cheat_Sheet.html
---

## Why it matters

Secrets leak: in a log line, a laptop backup, a former employee's notes. What decides the damage is how fast the secret can be replaced. If rotating a database password means a code change, a release and a maintenance window, it will not be done on schedule, and during an incident it will be done badly.

## How to apply it

* Read secrets from the secret store at start-up or on a refresh, never from the image or the repository.
* Make the service pick up a new value without a rebuild: a restart at most, a reload at best.
* Support two valid credentials at once during the change, so rotation has no downtime.
* Rotate on a schedule, automatically where the store supports it, so the path is exercised before it is needed.
* Prefer short-lived credentials issued on demand over long-lived ones.
* Write the rotation steps in the runbook, with who can do it.

## Example

The database password lives in the secret manager, which rotates it every 30 days by creating a second user and switching over. The service re-reads the secret when a connection fails authentication. The Stripe key is rotated by hand each quarter, following the runbook.
