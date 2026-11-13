---
id: architecture.data-moves-with-capability
version: 1
title: "The data moves with the capability"
category: architecture
priority: high
scope: service
summary: "The extracted service owns the data for its capability in its own store. It does not keep reading or writing the legacy database."
skill: database-per-service
references:
  - title: "How to break a Monolith into Microservices (Zhamak Dehghani)"
    url: https://martinfowler.com/articles/break-monolith-into-microservices.html
  - title: "Patterns of Legacy Displacement (Martin Fowler)"
    url: https://martinfowler.com/articles/patterns-legacy-displacement/
---

## Why it matters

The usual shortcut is to move the code and leave the data: the new service reads and writes the monolith's tables. It ships faster and achieves little. The two are still coupled through the schema, can't be deployed or scaled apart, and the monolith's database can never be switched off. The hard part of an extraction is the data, and it has to be done.

## How to apply it

* Decide which tables belong to the capability, and give the service its own store for them.
* Migrate in steps: copy the data, keep both in sync, switch reads, switch writes, then stop the sync.
* While both exist, name one of them the source of truth for each field.
* Where the monolith still needs the data, give it an API or events from the new service, not database access.
* Remove the old tables, or the monolith's access to them, when the move is done.

## Example

Notifications moved with its tables `notification_log` and `templates`. For two weeks a change-data-capture job copied legacy rows into the new store while the service wrote to both. Reads switched, then writes, and the monolith's tables were dropped a month later.
