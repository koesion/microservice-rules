---
id: observability.traces-enabled
version: 1
title: Distributed tracing is on
category: observability
priority: medium
scope: service
summary: Requests carry a trace context through the service, so one request can be followed across services.
skill: observability
wizardStep: 4-operations
check: observability.traces-enabled
references:
  - title: "OpenTelemetry: traces"
    url: https://opentelemetry.io/docs/concepts/signals/traces/
  - title: W3C Trace Context
    url: https://www.w3.org/TR/trace-context/
---

## Why it matters

In a distributed system the question is rarely "is this service slow?" but "where did this request spend its time?". Logs and metrics from one service can't answer it. A trace can, but only if every service on the path passes the context along. One service that drops it cuts the trace in two.

## How to apply it

* Propagate the W3C `traceparent` header on every inbound and outbound call, and through message headers for events.
* Create a span around each outbound call and each significant unit of work.
* Put the trace id in every log line, so you can jump from a log to the trace.
* Sample: all errors, and a fraction of the successes.

## Example

A slow checkout shows one trace: gateway 12 ms, checkout 40 ms, payments 1.9 s, of which 1.8 s is a call to the fraud service.
