---
id: resilience.retry-only-idempotent
version: 1
title: Retries only on idempotent calls, with backoff and jitter
category: resilience
priority: high
scope: service
summary: "Retry a synchronous call only when repeating it is safe, and spread retries out so they don't pile onto a struggling dependency."
skill: resilience-patterns
wizardStep: 3-data-deps
appliesWhen: has-sync-deps
references:
  - title: "Timeouts, retries and backoff with jitter (Amazon Builders' Library)"
    url: https://aws.amazon.com/builders-library/timeouts-retries-and-backoff-with-jitter/
  - title: "Making retries safe with idempotent APIs (Amazon Builders' Library)"
    url: https://aws.amazon.com/builders-library/making-retries-safe-with-idempotent-APIs/
---

## Why it matters

A retry turns one request into several. On a call that isn't idempotent, a timeout followed by a retry can create two orders or two payments, because the first attempt may have succeeded. On a dependency that is already slow, synchronized retries from every caller multiply its load exactly when it can least take it.

## How to apply it

* Retry only reads and writes that are idempotent by design (PUT/DELETE semantics, or POST with an **idempotency key** the server deduplicates).
* Use exponential backoff **with jitter**, and cap attempts: about one retry on user-facing paths, a few on background work.
* Retry at **one** layer only (client library *or* service mesh, not both), and never on 4xx business errors.
* Keep a retry budget (for example, at most 10% extra traffic) so retries can't amplify an outage.

## Example

`checkout → payments` uses `POST /payments` with an `Idempotency-Key` header, a 300 ms timeout, one retry after 100–200 ms of jittered backoff, and no retry on `402 Payment Required`.
