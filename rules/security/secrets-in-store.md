---
id: security.secrets-in-store
version: 1
title: Secrets live in a secret store
category: security
priority: critical
scope: service
summary: Credentials and keys are read from a secret manager at run time, never from the repository or plain configuration.
skill: microservice-security
wizardStep: 4-operations
check: security.secrets-in-store
appliesWhen: has-secrets
references:
  - title: OWASP Secrets Management Cheat Sheet
    url: https://cheatsheetseries.owasp.org/cheatsheets/Secrets_Management_Cheat_Sheet.html
  - title: "The Twelve-Factor App: Config"
    url: https://12factor.net/config
---

## Why it matters

A secret in a repository is in every clone, every fork and every backup of it, permanently. A secret in a plain environment variable shows up in deploy logs, crash dumps and the screen of anyone who can describe the deployment. Either way you can't say who has seen it, and you can't rotate it without a release.

## How to apply it

* Keep every credential, key and token in a secret manager, and name which one in the design.
* The service reads secrets at start-up or on demand, using its own identity, not a shared master credential.
* Rotate on a schedule and after anyone with access leaves. Rotation that needs a deploy will not happen.
* Scan the repository for committed secrets in CI.

## Example

`security.secrets: [DB_PASSWORD, STRIPE_API_KEY]` with `security.secretStore: aws-secrets-manager`, read through the service's own role.
