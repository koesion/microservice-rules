---
id: events.dead-letter-queue
version: 1
title: "Messages that keep failing go to a dead-letter queue"
category: events
priority: high
scope: service
summary: "A message the consumer cannot process is set aside after a few attempts, with an alert, so it neither blocks the queue nor disappears."
skill: async-messaging
appliesWhen: consumes-events
references:
  - title: "Dead Letter Channel (Enterprise Integration Patterns)"
    url: https://www.enterpriseintegrationpatterns.com/patterns/messaging/DeadLetterChannel.html
  - title: "Amazon SQS dead-letter queues"
    url: https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-dead-letter-queues.html
  - title: "RabbitMQ dead letter exchanges"
    url: https://www.rabbitmq.com/docs/dlx
---

## Why it matters

Some messages will never succeed: a payload the code can't parse, a reference to something that doesn't exist. Retried forever, one such message blocks everything behind it. Dropped silently, it is lost business data. A dead-letter queue keeps the flow moving and keeps the message for someone to look at.

## How to apply it

* Retry a failing message a small, fixed number of times with backoff, then move it to a dead-letter queue.
* Keep the original payload, the error and the attempt count with it.
* Alert when the dead-letter queue is not empty. A queue nobody watches is a slow way to lose data.
* Have a way to replay messages from it once the cause is fixed. Replay relies on the consumer handling duplicates.
* Tell apart errors worth retrying (a timeout) from ones that never will be (a validation error), and skip the retries for the second kind.

## Example

The consumer retries `OrderPlaced` three times over a minute, then publishes it to `orders.shipping.dlq` with the stack trace in a header. An alert fires when the queue holds any message for five minutes; a runbook entry explains how to replay.
