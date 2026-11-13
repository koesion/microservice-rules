---
id: security.dependencies-scanned
version: 1
title: "Dependencies and images are scanned for known vulnerabilities"
category: security
priority: medium
scope: service
summary: "Every build checks libraries and the base image against vulnerability databases, and someone owns fixing what is found."
skill: microservice-security
references:
  - title: "Vulnerable Dependency Management Cheat Sheet (OWASP)"
    url: https://cheatsheetseries.owasp.org/cheatsheets/Vulnerable_Dependency_Management_Cheat_Sheet.html
  - title: "A06:2021 Vulnerable and Outdated Components (OWASP Top 10)"
    url: https://owasp.org/Top10/A06_2021-Vulnerable_and_Outdated_Components/
---

## Why it matters

Most of the code a service runs was written by someone else: libraries, their dependencies, the base image. New vulnerabilities in it are published every week, and attackers scan for them within days. A service nobody has rebuilt for a year is running whatever was found in that year.

## How to apply it

* Scan dependencies and the container image on every build, and on a schedule for services that rarely change.
* Pin versions with a lockfile, so the scan and the deploy see the same thing.
* Fail the build on critical findings that have a fix. Give each lower severity a deadline.
* Turn on automatic update pull requests, and merge them.
* Use a small base image: less installed means less to patch.
* Record accepted risks with a reason and an expiry date.

## Example

CI runs a dependency audit and an image scan. A critical finding with a fix fails the build; high ones open a ticket due in 14 days. Automated update PRs are merged weekly once tests pass, and an idle service is rebuilt every month to pick up base image patches.
