---
id: security.pii-out-of-logs
version: 1
title: "Personal data stays out of logs and traces"
category: security
priority: high
scope: service
summary: "Logs, traces, metrics and error reports carry ids, not names, emails, addresses, tokens or card data."
skill: microservice-security
appliesWhen: handles-pii
references:
  - title: "Logging Cheat Sheet (OWASP)"
    url: https://cheatsheetseries.owasp.org/cheatsheets/Logging_Cheat_Sheet.html
  - title: "GDPR Article 32: security of processing"
    url: https://gdpr-info.eu/art-32-gdpr/
---

## Why it matters

Logs are copied to more places, kept longer and read by more people than the database is. Personal data written to them escapes every control put on the database: access rules, encryption, retention, erasure. A request to delete a person's data can't be met if their email is in six months of log archives.

## How to apply it

* Log identifiers (`customerId`), not the personal fields themselves.
* Never log whole request or response bodies, headers, tokens or query strings by default.
* Mask at the logging library, with a deny-list of field names, so one careless log line doesn't leak.
* Apply the same rule to trace attributes, metric labels, error trackers and dead-letter queues.
* Add a test or a scan that searches log output for email and card patterns.
* Set log retention on purpose, and shorter than the data's own.

## Example

Good: `{"msg":"order placed","orderId":"8841","customerId":"c_1029"}`. Not: `{"msg":"order placed","email":"ana@example.com","address":"12 Rue…"}`. The logger redacts any field named `email`, `phone`, `address`, `authorization` or `cardNumber`.
