---
id: decisions.accepted-adr
version: 1
title: Key decisions are recorded
category: decisions
priority: low
scope: service
summary: At least one architecture decision is written down and accepted, with its context and consequences.
skill: writing-adrs
wizardStep: 4-operations
check: decisions.accepted-adr
references:
  - title: Documenting Architecture Decisions (Michael Nygard)
    url: https://cognitect.com/blog/2011/11/15/documenting-architecture-decisions
  - title: Architectural Decision Records
    url: https://adr.github.io/
---

## Why it matters

Six months on, nobody remembers why the service uses events instead of a direct call, and the next engineer either undoes a deliberate choice or is afraid to touch it. A short record of the decision, and of what was given up, is the cheapest documentation there is.

## How to apply it

* Record decisions that are costly to reverse: the data store, sync or async integration, a consistency trade-off, a pattern such as a saga.
* One decision per record: context, the decision, the consequences, including the bad ones.
* Mark it accepted when the team agrees. Supersede it with a new record rather than editing it.
* A rule marked not applicable on this service is a decision too: link the record.

## Example

"ADR-003, accepted: stock is reserved through a saga instead of a distributed transaction. Consequence: an order can be briefly accepted and then rejected, so the UI shows 'confirming'."
