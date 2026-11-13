---
id: data.sagas-have-compensation
version: 1
title: "Each saga has compensating steps"
category: data
priority: high
scope: service
summary: "For every step of a saga that can be followed by a failure, there is a defined action that undoes it."
skill: saga-pattern
wizardStep: 3-data-deps
check: data.sagas-have-compensation
appliesWhen: has-sagas
references:
  - title: "Compensating Transaction pattern (Azure Architecture Center)"
    url: https://learn.microsoft.com/en-us/azure/architecture/patterns/compensating-transaction
  - title: "Pattern: Saga (microservices.io)"
    url: https://microservices.io/patterns/data/saga.html
---

## Why it matters

A saga has no rollback. Each step is already committed when a later one fails. Unless every step has a way back, a failed payment leaves stock reserved for an order that will never exist, and someone fixes it by hand from a spreadsheet. The failure path is where a saga earns its keep.

## How to apply it

* For each step, define the compensation: release the reservation, refund the payment, cancel the shipment.
* Make compensations idempotent and retried until they succeed. A compensation that fails needs an alert and a manual path.
* Order the steps so the hardest to undo comes last.
* Some steps can't be undone (an email sent): compensate with a new action, such as a correction email.
* Test the failure of each step, not only the normal path.

## Example

"Place order": if payment is declined → inventory releases the reservation (`StockReleased`), orders marks the order `REJECTED`. If confirmation fails after capture → payments refunds (`PaymentRefunded`), then inventory releases.
