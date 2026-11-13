---
id: api.idempotency-keys-on-create
version: 1
title: Create endpoints accept an idempotency key
category: api
priority: high
scope: service
summary: A client can safely repeat a POST that creates something, because the server recognizes the repeat.
skill: idempotency-deduplication
wizardStep: 2-interfaces
appliesWhen: has-create-endpoints
references:
  - title: The Idempotency-Key HTTP Header Field (IETF draft)
    url: https://datatracker.ietf.org/doc/draft-ietf-httpapi-idempotency-key-header/
  - title: "Making retries safe with idempotent APIs (Amazon Builders' Library)"
    url: https://aws.amazon.com/builders-library/making-retries-safe-with-idempotent-APIs/
---

## Why it matters

When a `POST` times out, the client can't tell whether the request never arrived or the response was lost. If it retries and the first attempt had succeeded, there are now two orders or two payments. Without a way to recognize the repeat, the client has to choose between duplicates and giving up.

## How to apply it

* Accept an `Idempotency-Key` header (a client-generated unique value) on every endpoint that creates a resource or triggers a side effect.
* Store the key with the result, in the same transaction as the write. On a repeat, return the stored result and do nothing else.
* Reject a key that is reused with a different request body.
* Keep keys at least as long as clients may retry: a day is a common floor.

## Example

`POST /v1/payments` with `Idempotency-Key: 7f3c…` is sent twice after a timeout. The second call returns the first call's `201` and payment id; the card is charged once.
