---
id: resilience.hard-deps-have-timeouts
version: 1
title: Hard dependencies have a timeout
category: resilience
priority: critical
scope: service
summary: Every synchronous call the service cannot work without has a declared timeout.
skill: resilience-patterns
wizardStep: 3-data-deps
check: resilience.hard-deps-have-timeouts
appliesWhen: has-hard-sync-deps
references:
  - title: "Timeouts, retries and backoff with jitter (Amazon Builders' Library)"
    url: https://aws.amazon.com/builders-library/timeouts-retries-and-backoff-with-jitter/
  - title: Addressing Cascading Failures (Google SRE Book)
    url: https://sre.google/sre-book/addressing-cascading-failures/
---

## Why it matters

A call without a timeout waits as long as the other side takes, which during an outage is forever. Each waiting call holds a thread or a connection. When the pool is empty, your service stops answering too, including the requests that never needed the slow dependency. This is how one slow service becomes a platform outage.

## How to apply it

* Set a timeout on **every** outbound call: connection and response.
* Derive it from the dependency's normal latency (a little above its p99), not from a round number.
* Keep it shorter than your own callers' timeout, so you fail before they give up on you.
* Decide what happens when it fires: an error to the caller, a fallback, or a queued retry.

## Example

`checkout → payments`: connect 100 ms, response 800 ms (payments p99 is 450 ms). Checkout's own callers time out at 2 s.
