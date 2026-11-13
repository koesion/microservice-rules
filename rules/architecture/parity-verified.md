---
id: architecture.parity-verified
version: 1
title: "Behaviour is compared with the legacy system before cutover"
category: architecture
priority: high
scope: service
summary: "The new service is run against real traffic alongside the old one, and the differences are examined, before it serves users."
skill: strangler-fig-migration
references:
  - title: "Dark Launching (Martin Fowler)"
    url: https://martinfowler.com/bliki/DarkLaunching.html
  - title: "Patterns of Legacy Displacement (Martin Fowler)"
    url: https://martinfowler.com/articles/patterns-legacy-displacement/
---

## Why it matters

Nobody knows everything a legacy system does. Years of special cases live in its code and in what its users have come to expect. A rewrite from the specification reproduces the specification, not the system. Comparing the two on real traffic is the only way to find what was missed before customers do.

## How to apply it

* Send a copy of production requests to the new service (shadow traffic) and discard its responses.
* Compare results with the legacy system's automatically, and log every difference.
* Sort the differences: bugs in the new service, bugs in the old one that you choose to keep or fix, and noise such as timestamps.
* For writes, shadow into a separate store or compare the resulting state. Never write twice to the same place.
* Set a bar for cutover: for example, a week with no unexplained difference.

## Example

For ten days the proxy mirrored `/api/pricing/quote` to the new pricing service. A comparator found 0.4% of quotes differed: a rounding rule for three currencies and an undocumented staff discount. Both were fixed, and cutover began after seven days with no differences.
