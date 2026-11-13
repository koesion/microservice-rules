# Microservice Rules

**Rules and checklists for building microservices that hold up in production.**

[![Validate](https://github.com/koesion/microservice-rules/actions/workflows/validate.yml/badge.svg)](https://github.com/koesion/microservice-rules/actions/workflows/validate.yml)
[![Content: CC BY 4.0](https://img.shields.io/badge/content-CC%20BY%204.0-blue)](rules/LICENSE)
[![Code: Apache 2.0](https://img.shields.io/badge/code-Apache%202.0-green)](LICENSE)

Each rule is one practice a service should follow, written to be read in a
minute: why it matters, how to apply it, an example, and sources. Checklists
group the rules by goal, such as getting a service ready for production or
carving one out of a monolith.

This repository is the source of the rule library at
[microservice.md/rules](https://microservice.md/rules) and of the checklists
at [microservice.md/checklists](https://microservice.md/checklists).

## Three ways to use it

1. **Read it.** Pick a checklist below and go through it with your team. Every
   rule links to a page with the reasoning, the steps and an example.
2. **Have it checked for you.** Describe a service in
   [MICROSERVICE.md](https://microservice.md), apply a checklist, and the rules
   marked "checked automatically" are evaluated against the design. A failing
   rule says what is missing and where to fix it.
3. **Build on it.** The rules are plain Markdown with a small YAML header, and
   the checklists are YAML. Use them in your own docs, reviews or tools, under
   the licences below.

## Checklists

<!-- checklists:start -->

### [Production Readiness](https://microservice.md/checklists/production-readiness)

Is this service ready for production traffic? Ownership, resilience, observability, security and deployment basics, checked against its design.

26 rules, 21 checked automatically once the checklist is applied to a service.

- **[An owning team is named](https://microservice.md/rules/ownership.team-set)** (Critical, checked automatically)  
  One team owns the service end to end, and the design says which.
- **[An on-call rotation or escalation contact is named](https://microservice.md/rules/ownership.oncall-set)** (High, checked automatically)  
  The design says who is reached, and how, when the service breaks outside office hours.
- **[A runbook exists](https://microservice.md/rules/ownership.runbook-present)** (High, checked automatically)  
  The service has written steps for its most likely failures, so the person on call does not start from zero.
- **[Every endpoint is described](https://microservice.md/rules/api.endpoints-described)** (Medium, checked automatically)  
  Each REST endpoint says what it does, so callers and coding agents do not have to guess from the path.
- **[API paths carry a version](https://microservice.md/rules/api.versioned-paths)** (Medium, checked automatically)  
  Every REST path includes a version segment, so a breaking change can ship next to the old contract.
- **[Create endpoints accept an idempotency key](https://microservice.md/rules/api.idempotency-keys-on-create)** (High, checked by hand)  
  A client can safely repeat a POST that creates something, because the server recognizes the repeat.
- **[Published events have a schema](https://microservice.md/rules/events.published-have-schema)** (High, checked automatically)  
  Every event the service publishes has a declared payload, so consumers code against a contract and not against samples.
- **[Published events name their broker and topic](https://microservice.md/rules/events.published-have-broker)** (Medium, checked automatically)  
  Each published event says where it is published, so a consumer knows where to subscribe.
- **[Events are published through an outbox](https://microservice.md/rules/events.publish-through-outbox)** (High, checked by hand)  
  A state change and the event that announces it are saved together, so one never happens without the other.
- **[Event consumers handle duplicates](https://microservice.md/rules/events.consumers-deduplicate)** (High, checked by hand)  
  Every consumed event can arrive more than once; processing it twice must not change the outcome.
- **[The service owns its data and says what it holds](https://microservice.md/rules/data.owned-data-declared)** (High, checked automatically)  
  Each data store belongs to this service alone, and the design says what is kept in it.
- **[Hard dependencies have a timeout](https://microservice.md/rules/resilience.hard-deps-have-timeouts)** (Critical, checked automatically)  
  Every synchronous call the service cannot work without has a declared timeout.
- **[Hard dependencies have a circuit breaker or a fallback](https://microservice.md/rules/resilience.hard-deps-fail-fast)** (High, checked automatically)  
  When a dependency the service needs is failing, calls to it stop quickly or are answered another way.
- **[Retries only on idempotent calls, with backoff and jitter](https://microservice.md/rules/resilience.retry-only-idempotent)** (High, checked by hand)  
  Retry a synchronous call only when repeating it is safe, and spread retries out so they don't pile onto a struggling dependency.
- **[An availability objective is set](https://microservice.md/rules/observability.availability-slo)** (High, checked automatically)  
  The service has a stated availability target, so "is it reliable enough?" has an answer.
- **[A p99 latency target is set](https://microservice.md/rules/observability.latency-target)** (Medium, checked automatically)  
  The service states how fast its slowest normal requests should be.
- **[Distributed tracing is on](https://microservice.md/rules/observability.traces-enabled)** (Medium, checked automatically)  
  Requests carry a trace context through the service, so one request can be followed across services.
- **[Alerts are defined](https://microservice.md/rules/observability.alerts-defined)** (High, checked automatically)  
  The service has alerts on symptoms its users would notice, each one actionable.
- **[A dashboard exists](https://microservice.md/rules/observability.dashboards-defined)** (Low, checked automatically)  
  The service has a dashboard showing its traffic, errors and latency at a glance.
- **[Every caller is authenticated](https://microservice.md/rules/security.authn-defined)** (Critical, checked automatically)  
  The design says how the service knows who is calling, for users and for other services.
- **[Access is authorized per resource](https://microservice.md/rules/security.authz-defined)** (High, checked automatically)  
  The design says how the service decides what an authenticated caller may do, down to the individual resource.
- **[Secrets live in a secret store](https://microservice.md/rules/security.secrets-in-store)** (Critical, checked automatically)  
  Credentials and keys are read from a secret manager at run time, never from the repository or plain configuration.
- **[Personal data handling is documented](https://microservice.md/rules/security.pii-handling-documented)** (High, checked by hand)  
  For the personal data it holds, the service states what it keeps, why, for how long and how it is erased.
- **[At least two replicas run](https://microservice.md/rules/deployment.min-two-replicas)** (High, checked automatically)  
  The service runs as two or more instances, so losing one does not take it down.
- **[CPU and memory limits are set](https://microservice.md/rules/deployment.resource-limits)** (Medium, checked automatically)  
  Each instance declares how much CPU and memory it needs and may use.
- **[Key decisions are recorded](https://microservice.md/rules/decisions.accepted-adr)** (Low, checked automatically)  
  At least one architecture decision is written down and accepted, with its context and consequences.

### [Data Ownership](https://microservice.md/checklists/data-ownership)

Does this service own its data cleanly? No shared database, clear consistency boundaries, sagas with a way back, safe schema changes and tested backups.

15 rules, 7 checked automatically once the checklist is applied to a service.

- **[The service owns its data and says what it holds](https://microservice.md/rules/data.owned-data-declared)** (High, checked automatically)  
  Each data store belongs to this service alone, and the design says what is kept in it.
- **[No other service reads or writes its database](https://microservice.md/rules/data.no-shared-database)** (Critical, checked by hand)  
  The service is the only thing that touches its tables. Everyone else goes through its API or its events.
- **[Other services' data is reached through their API or events](https://microservice.md/rules/data.other-services-data-via-contracts)** (High, checked by hand)  
  The service never reads another service's tables, files or cache. It calls the owner or keeps its own copy built from the owner's events.
- **[No transaction spans services](https://microservice.md/rules/data.no-distributed-transactions)** (High, checked by hand)  
  A business operation that changes several services is a sequence of local transactions with compensation, not a two-phase commit.
- **[The aggregates the service owns are declared](https://microservice.md/rules/data.aggregates-declared)** (Medium, checked automatically)  
  The service names its aggregates, so it is clear what changes together in one transaction and what does not.
- **[Each aggregate states its invariants](https://microservice.md/rules/data.aggregates-have-invariants)** (Medium, checked automatically)  
  Every aggregate lists the rules that must hold whenever it is saved, so the consistency boundary has a reason.
- **[Each saga names its trigger and its steps](https://microservice.md/rules/data.sagas-described)** (Medium, checked automatically)  
  A saga the service takes part in is written down: what starts it and the steps of the normal path, in order.
- **[Each saga has compensating steps](https://microservice.md/rules/data.sagas-have-compensation)** (High, checked automatically)  
  For every step of a saga that can be followed by a failure, there is a defined action that undoes it.
- **[A read model names the service that writes the data](https://microservice.md/rules/data.cqrs-reader-links-writer)** (Medium, checked automatically)  
  A service that is the read side of a CQRS pair says which service owns the writes, so the source of truth is never in doubt.
- **[Materialized views name their source and storage](https://microservice.md/rules/data.views-name-source)** (Medium, checked automatically)  
  Every materialized view says what it is built from and where it is kept.
- **[Derived data can be rebuilt from its source](https://microservice.md/rules/data.views-rebuildable)** (Medium, checked by hand)  
  A materialized view or read model can be dropped and recreated from the data it derives from, and the procedure has been run.
- **[Schema changes are backward compatible](https://microservice.md/rules/data.schema-changes-compatible)** (High, checked by hand)  
  A database migration never breaks the version of the service that is running: expand first, migrate, contract later.
- **[Retention and deletion are defined](https://microservice.md/rules/data.retention-defined)** (Medium, checked by hand)  
  For each kind of data it owns, the service says how long it is kept and how it is removed.
- **[Backups exist and a restore has been tested](https://microservice.md/rules/data.backups-restore-tested)** (High, checked by hand)  
  The data store is backed up automatically, and the team has restored from a backup recently enough to trust it.
- **[The database account has only the rights it needs](https://microservice.md/rules/security.least-privilege-data-access)** (Medium, checked by hand)  
  The service connects to its data store with an account limited to its own schema and to the operations it performs.

### [Event-Driven Essentials](https://microservice.md/checklists/event-driven-essentials)

Does this service publish and consume events safely? Naming, schemas, delivery, ordering and lag, checked against its design.

13 rules, 5 checked automatically once the checklist is applied to a service.

- **[Events are named as facts, in the past tense](https://microservice.md/rules/events.names-are-facts)** (Medium, checked automatically)  
  An event name says what happened (OrderPlaced), not what someone should do (CreateOrder).
- **[Published events have a schema](https://microservice.md/rules/events.published-have-schema)** (High, checked automatically)  
  Every event the service publishes has a declared payload, so consumers code against a contract and not against samples.
- **[Published events name their broker and topic](https://microservice.md/rules/events.published-have-broker)** (Medium, checked automatically)  
  Each published event says where it is published, so a consumer knows where to subscribe.
- **[Events carry an id, a time and a version](https://microservice.md/rules/events.envelope-fields)** (Medium, checked by hand)  
  Every published event has a unique id, the time it happened, its type and its schema version, in the same place on every event.
- **[Event schemas evolve compatibly](https://microservice.md/rules/events.schema-evolution)** (High, checked by hand)  
  A change to a published event never breaks a consumer already reading it: fields are added, not renamed or removed.
- **[Events are published through an outbox](https://microservice.md/rules/events.publish-through-outbox)** (High, checked by hand)  
  A state change and the event that announces it are saved together, so one never happens without the other.
- **[Consumed events have a schema](https://microservice.md/rules/events.consumed-have-schema)** (High, checked automatically)  
  For every event it consumes, the service records the payload it relies on, so a publisher change that breaks it can be seen in advance.
- **[Consumed events name their publisher](https://microservice.md/rules/events.consumed-name-source)** (Medium, checked automatically)  
  Each consumed event says which service publishes it, so the dependency shows up in the catalog and in impact analysis.
- **[Event consumers handle duplicates](https://microservice.md/rules/events.consumers-deduplicate)** (High, checked by hand)  
  Every consumed event can arrive more than once; processing it twice must not change the outcome.
- **[Messages that keep failing go to a dead-letter queue](https://microservice.md/rules/events.dead-letter-queue)** (High, checked by hand)  
  A message the consumer cannot process is set aside after a few attempts, with an alert, so it neither blocks the queue nor disappears.
- **[Ordering needs are explicit](https://microservice.md/rules/events.ordering-explicit)** (Medium, checked by hand)  
  The service states which events must be processed in order and how that is guaranteed, and copes with the rest arriving out of order.
- **[Stale data is expected and handled](https://microservice.md/rules/events.eventual-consistency-explicit)** (Medium, checked by hand)  
  Where the service acts on data copied from events, it says how stale that data can be and what happens when it is.
- **[Consumer lag is monitored](https://microservice.md/rules/observability.consumer-lag-monitored)** (High, checked by hand)  
  The service measures how far behind its consumers are and alerts before the delay hurts users.

### [Security Baseline](https://microservice.md/checklists/security-baseline)

Does this service cover the security basics? Authentication, authorization, input validation, secrets, personal data and audit, checked against its design.

14 rules, 5 checked automatically once the checklist is applied to a service.

- **[Every caller is authenticated](https://microservice.md/rules/security.authn-defined)** (Critical, checked automatically)  
  The design says how the service knows who is calling, for users and for other services.
- **[Access is authorized per resource](https://microservice.md/rules/security.authz-defined)** (High, checked automatically)  
  The design says how the service decides what an authenticated caller may do, down to the individual resource.
- **[Scopes or permissions are declared](https://microservice.md/rules/security.scopes-declared)** (Medium, checked automatically)  
  The service lists the scopes or permissions its API checks, so callers know what to ask for and reviewers know what is protected.
- **[The gateway states how it authenticates callers](https://microservice.md/rules/security.gateway-auth-declared)** (High, checked automatically)  
  Every API gateway in front of the service names its authentication method, so nobody assumes the other side is doing it.
- **[Service-to-service calls are authenticated](https://microservice.md/rules/security.service-to-service-auth)** (High, checked by hand)  
  A call from another service proves who is calling, with mTLS or a signed token. Being inside the network is not proof.
- **[Input is validated at the service boundary](https://microservice.md/rules/security.input-validated)** (High, checked by hand)  
  Every request and message is checked against a schema before any logic runs, whoever sent it.
- **[Callers are rate limited](https://microservice.md/rules/security.rate-limits)** (Medium, checked by hand)  
  Each caller has a request quota, enforced at the gateway or in the service, so one client cannot exhaust it for everyone.
- **[Secrets live in a secret store](https://microservice.md/rules/security.secrets-in-store)** (Critical, checked automatically)  
  Credentials and keys are read from a secret manager at run time, never from the repository or plain configuration.
- **[Secrets can be rotated without a release](https://microservice.md/rules/security.secrets-rotatable)** (Medium, checked by hand)  
  Every secret the service uses can be replaced on a schedule, or within the hour after a leak, without a code change.
- **[Personal data handling is documented](https://microservice.md/rules/security.pii-handling-documented)** (High, checked by hand)  
  For the personal data it holds, the service states what it keeps, why, for how long and how it is erased.
- **[Personal data stays out of logs and traces](https://microservice.md/rules/security.pii-out-of-logs)** (High, checked by hand)  
  Logs, traces, metrics and error reports carry ids, not names, emails, addresses, tokens or card data.
- **[The database account has only the rights it needs](https://microservice.md/rules/security.least-privilege-data-access)** (Medium, checked by hand)  
  The service connects to its data store with an account limited to its own schema and to the operations it performs.
- **[Sensitive actions leave an audit trail](https://microservice.md/rules/security.audit-log)** (Medium, checked by hand)  
  The service records who did what to what, and when, for actions that matter in a dispute or an investigation.
- **[Dependencies and images are scanned for known vulnerabilities](https://microservice.md/rules/security.dependencies-scanned)** (Medium, checked by hand)  
  Every build checks libraries and the base image against vulnerability databases, and someone owns fixing what is found.

### [Strangler Migration](https://microservice.md/checklists/strangler-migration)

Is this service being extracted from the legacy system safely? One capability at a time, behind a routing layer, with its data, a tested way back and the old code removed.

16 rules, 6 checked automatically once the checklist is applied to a service.

- **[The service names its bounded context](https://microservice.md/rules/architecture.bounded-context-named)** (High, checked automatically)  
  The service says which part of the business it belongs to, so its boundary can be judged and its language is unambiguous.
- **[One capability is extracted at a time](https://microservice.md/rules/architecture.one-capability-at-a-time)** (High, checked by hand)  
  The migration moves a single business capability end to end, and takes real traffic, before the next one starts.
- **[A routing layer sits between callers and the service](https://microservice.md/rules/architecture.routing-layer-declared)** (High, checked automatically)  
  Requests reach the service through a gateway or proxy that can send each route to the old system or the new one.
- **[The legacy model stays behind an anti-corruption layer](https://microservice.md/rules/architecture.anti-corruption-layer)** (High, checked by hand)  
  Calls to and from the legacy system pass through a translation layer, so its data model and quirks don't leak into the new service.
- **[The data moves with the capability](https://microservice.md/rules/architecture.data-moves-with-capability)** (High, checked by hand)  
  The extracted service owns the data for its capability in its own store. It does not keep reading or writing the legacy database.
- **[The service owns its data and says what it holds](https://microservice.md/rules/data.owned-data-declared)** (High, checked automatically)  
  Each data store belongs to this service alone, and the design says what is kept in it.
- **[Calls back to the legacy system are declared](https://microservice.md/rules/architecture.legacy-calls-declared)** (Medium, checked by hand)  
  Every call the new service still makes to the legacy system is listed as a dependency, with what it is for and how failure is handled.
- **[Hard dependencies have a timeout](https://microservice.md/rules/resilience.hard-deps-have-timeouts)** (Critical, checked automatically)  
  Every synchronous call the service cannot work without has a declared timeout.
- **[The API is covered by contract tests](https://microservice.md/rules/api.contract-tests)** (Medium, checked by hand)  
  Tests check that the service still answers the way its consumers expect, and run before every release.
- **[Behaviour is compared with the legacy system before cutover](https://microservice.md/rules/architecture.parity-verified)** (High, checked by hand)  
  The new service is run against real traffic alongside the old one, and the differences are examined, before it serves users.
- **[Traffic moves to the new version in steps](https://microservice.md/rules/deployment.progressive-rollout)** (Medium, checked by hand)  
  A release, or a cutover, reaches a small share of traffic first and grows only while the metrics stay healthy.
- **[Cutover is a routing change, not a release](https://microservice.md/rules/deployment.cutover-by-routing)** (High, checked by hand)  
  Switching traffic between the old system and the new service is a configuration change that takes effect in minutes.
- **[The way back to the legacy system has been rehearsed](https://microservice.md/rules/deployment.rollback-rehearsed)** (High, checked by hand)  
  The team has switched traffic back to the old system at least once, on purpose, and knows what happens to the data written meanwhile.
- **[Alerts are defined](https://microservice.md/rules/observability.alerts-defined)** (High, checked automatically)  
  The service has alerts on symptoms its users would notice, each one actionable.
- **[Key decisions are recorded](https://microservice.md/rules/decisions.accepted-adr)** (Low, checked automatically)  
  At least one architecture decision is written down and accepted, with its context and consequences.
- **[The replaced legacy code is removed](https://microservice.md/rules/architecture.legacy-retired)** (Medium, checked by hand)  
  Once the new service carries all the traffic, the old code path, its data and its routes are deleted.

<!-- checklists:end -->

## How a rule is written

One file per rule, at `rules/<category>/<slug>.md`:

```markdown
---
id: events.dead-letter-queue          # <category>.<slug>, never reused
version: 1                            # bumped when the meaning changes
title: Messages that keep failing go to a dead-letter queue
category: events
priority: high                        # critical, high, medium or low
scope: service
summary: One line, used in lists.
skill: async-messaging                # related agent skill (optional)
appliesWhen: consumes-events          # who the rule is for (optional)
references:
  - title: Dead Letter Channel (Enterprise Integration Patterns)
    url: https://www.enterpriseintegrationpatterns.com/patterns/messaging/DeadLetterChannel.html
---

## Why it matters

## How to apply it

## Example
```

A checklist is a YAML file at `checklists/<slug>.yaml` with a title, a
description and an ordered list of rule ids.

Two header fields connect a rule to MICROSERVICE.md:

- `check` names an automatic check. A rule with one is evaluated against the
  service design; a rule without one is ticked by hand.
- `appliesWhen` names a condition, such as `publishes-events`. When it is
  false for a service, the rule steps aside on its own.

The checks and conditions are implemented in the MICROSERVICE.md app. The ids
a rule may use are listed in [`schema/registry.json`](schema/registry.json).

## Contributing

Corrections, better examples, better sources and new rules are welcome. See
[CONTRIBUTING.md](CONTRIBUTING.md). In short:

```bash
npm install
npm run validate
```

## Licence

- The rules and checklists (`rules/`, `checklists/`) are licensed under
  [CC BY 4.0](rules/LICENSE). You can share and adapt them, including
  commercially, as long as you give credit: "Microservice Rules by Koesion,
  microservice.md".
- The scripts and everything else are licensed under [Apache 2.0](LICENSE).

MICROSERVICE.md is a trademark of Koesion. See also the
[MICROSERVICE.md specification](https://github.com/koesion/microservice-md).
