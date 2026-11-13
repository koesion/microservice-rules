---
id: security.audit-log
version: 1
title: "Sensitive actions leave an audit trail"
category: security
priority: medium
scope: service
summary: "The service records who did what to what, and when, for actions that matter in a dispute or an investigation."
skill: microservice-security
references:
  - title: "Logging Cheat Sheet (OWASP)"
    url: https://cheatsheetseries.owasp.org/cheatsheets/Logging_Cheat_Sheet.html
  - title: "A09:2021 Security Logging and Monitoring Failures (OWASP Top 10)"
    url: https://owasp.org/Top10/A09_2021-Security_Logging_and_Monitoring_Failures/
---

## Why it matters

After a breach, a fraud claim or a customer complaint, the first question is who did what. Application logs rarely answer it: they are sampled, rotated and written for debugging. Without an audit trail the answer is a guess, and so is the report to the regulator or the customer.

## How to apply it

* Decide which actions are sensitive: sign-in, permission changes, refunds, exports, reading or deleting personal data, admin overrides.
* For each, record the actor (user and calling service), the action, the target, the time, the result and the request id.
* Record failures and refusals too.
* Keep the trail apart from debug logs: append-only, with its own retention and restricted access.
* Keep personal data out of it; ids are enough.
* Alert on patterns that should not happen, such as an export at 3 a.m. by a support account.

## Example

`{"at":"2026-03-02T09:14:07Z","actor":"user:u_77","via":"support-console","action":"order.refund","target":"order:8841","result":"allowed","requestId":"4bf9…"}`, written to an append-only store kept for seven years.
