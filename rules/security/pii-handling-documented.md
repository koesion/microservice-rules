---
id: security.pii-handling-documented
version: 1
title: Personal data handling is documented
category: security
priority: high
scope: service
summary: For the personal data it holds, the service states what it keeps, why, for how long and how it is erased.
skill: microservice-security
wizardStep: 4-operations
appliesWhen: handles-pii
references:
  - title: "GDPR Article 5: principles relating to processing of personal data"
    url: https://gdpr-info.eu/art-5-gdpr/
  - title: "NIST SP 800-122: Guide to Protecting the Confidentiality of PII"
    url: https://csrc.nist.gov/pubs/sp/800/122/final
---

## Why it matters

Personal data brings obligations that ordinary data does not: a person can ask what you hold and ask you to delete it, and a leak has to be reported. A service that can't list the personal data it holds can't meet any of them, and finds out during the request or the breach.

## How to apply it

* List the personal fields the service stores and the reason each is needed. Drop the ones without a reason.
* State the retention period and how deletion works, including in backups, caches, logs and events already published.
* Keep personal data out of logs, traces and event payloads where an id will do.
* Encrypt it at rest and in transit, and limit who can query it.
* Record this in the service's documentation or an ADR.

## Example

"Stores name, email and delivery address for order fulfilment. Kept 24 months after the last order, then anonymized by a nightly job. Erasure requests are handled by `DELETE /v1/customers/{id}/personal-data`, which also publishes `CustomerErased`."
