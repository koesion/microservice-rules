---
id: data.sagas-described
version: 1
title: "Each saga names its trigger and its steps"
category: data
priority: medium
scope: service
summary: "A saga the service takes part in is written down: what starts it and the steps of the normal path, in order."
skill: saga-pattern
wizardStep: 3-data-deps
check: data.sagas-described
appliesWhen: has-sagas
references:
  - title: "Saga design pattern (Azure Architecture Center)"
    url: https://learn.microsoft.com/en-us/azure/architecture/patterns/saga
  - title: "Saga pattern (AWS Prescriptive Guidance)"
    url: https://docs.aws.amazon.com/prescriptive-guidance/latest/cloud-design-patterns/saga.html
---

## Why it matters

A saga is spread over several services and, with choreography, over event handlers that never mention each other. The only complete picture is in people's heads. When an order is stuck, nobody can say which step it is waiting for. Written down, the flow can be reviewed, tested and debugged.

## How to apply it

* Name the saga after the business operation: "Place order".
* Say whether it is orchestrated (one service drives it) or choreographed (services react to each other's events).
* Name the event or command that starts it.
* List the steps of the normal path in order, with the service that performs each and the event it emits.
* List the states an instance can be in, so a stuck one can be found.

## Example

"Place order" (orchestrated by orders). Trigger: `OrderPlaced`. Steps: 1. inventory reserves stock → `StockReserved`; 2. payments captures → `PaymentCaptured`; 3. orders confirms → `OrderConfirmed`. States: PENDING, STOCK_RESERVED, PAID, CONFIRMED, REJECTED.
