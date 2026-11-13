---
id: events.eventual-consistency-explicit
version: 1
title: "Stale data is expected and handled"
category: events
priority: medium
scope: service
summary: "Where the service acts on data copied from events, it says how stale that data can be and what happens when it is."
skill: eventual-consistency
appliesWhen: consumes-events
references:
  - title: "Eventually Consistent (Werner Vogels)"
    url: https://www.allthingsdistributed.com/2008/12/eventually_consistent.html
  - title: "Data considerations for microservices (Azure Architecture Center)"
    url: https://learn.microsoft.com/en-us/azure/architecture/microservices/design/data-considerations
---

## Why it matters

Data that arrives by events is always a little behind, and during an incident it can be far behind. Code and screens written as if it were current show a paid order as unpaid, or sell stock that is gone. The delay can't be removed, so the design has to say what is acceptable and what happens beyond it.

## How to apply it

* For each piece of copied data, state how stale it may be in normal running: seconds, minutes.
* Decide what the service does when it acts on stale data: accept and correct later, or check with the owner first for the few decisions that can't be wrong.
* Show users that something is pending, not a wrong final state.
* Measure the delay and alert when it passes the stated limit.
* Have a reconciliation job or a replay for when the copy drifts.

## Example

"Stock levels come from `StockChanged` and are normally under two seconds old. Checkout reserves stock through the inventory API, so a stale level can show an item as available but can't oversell it. A nightly job compares counts with inventory."
