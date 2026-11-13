---
id: security.least-privilege-data-access
version: 1
title: "The database account has only the rights it needs"
category: security
priority: medium
scope: service
summary: "The service connects to its data store with an account limited to its own schema and to the operations it performs."
skill: microservice-security
appliesWhen: owns-data
references:
  - title: "Database Security Cheat Sheet (OWASP)"
    url: https://cheatsheetseries.owasp.org/cheatsheets/Database_Security_Cheat_Sheet.html
  - title: "PostgreSQL: privileges"
    url: https://www.postgresql.org/docs/current/ddl-priv.html
---

## Why it matters

If the service runs as a database owner or superuser, any injection flaw or leaked connection string gives an attacker everything: other schemas, the ability to drop tables, the ability to read credentials. A narrow account turns the same flaw into a contained one. It also stops a service from quietly reading another service's tables.

## How to apply it

* Create one account per service. Don't share accounts between services or with people.
* Grant only what the running service does: usually select, insert, update and delete on its own schema.
* Run migrations with a separate account that can change the schema, used only by the deploy pipeline.
* Give no access to other services' schemas, even read-only.
* Give people their own read-only accounts, with access that is logged.

## Example

`orders_app` can read and write tables in the `orders` schema and nothing else. `orders_migrator` owns the schema and is used only by the migration job. Engineers query through `orders_readonly`, issued for eight hours on request.
