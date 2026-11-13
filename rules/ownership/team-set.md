---
id: ownership.team-set
version: 1
title: An owning team is named
category: ownership
priority: critical
scope: service
summary: One team owns the service end to end, and the design says which.
skill: team-topologies-ownership
wizardStep: 1-identity
check: ownership.team-set
references:
  - title: "Team Topologies: key concepts"
    url: https://teamtopologies.com/key-concepts
  - title: A Conversation with Werner Vogels (ACM Queue)
    url: https://queue.acm.org/detail.cfm?id=1142065
---

## Why it matters

A service without a named owner has nobody to page, nobody to approve a change and nobody to decide when it is retired. In an incident the first ten minutes go to finding out who to call. Shared ownership works out the same way: when two teams own a service, each assumes the other is handling it.

## How to apply it

* Name **one** team, not a person and not a list of teams. People move; teams stay.
* The owning team builds the service, runs it and is on call for it. If another team runs it in production, that split is the first thing to fix.
* Keep the name identical to the one used in your repository ownership file and your paging tool, so the three never disagree.

## Example

`owner.team: payments-platform`, with `CODEOWNERS` pointing at the same group and the paging rotation named after it.
