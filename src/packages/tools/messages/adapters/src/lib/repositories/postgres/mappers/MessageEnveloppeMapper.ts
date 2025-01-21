import {Mapper} from "ddd";
import {MessageQueueEntity} from "../entities/MessageQueueEntity";
import { QueueMessage} from "messages-core";
import {EntityManager} from "typeorm";

export class MessageEnveloppeMapper implements Mapper<MessageQueueEntity, QueueMessage> {


  constructor(
    private readonly entityManager: EntityManager
  ) {
  }
  toDomain(t: MessageQueueEntity): QueueMessage {
    return {
      handlers: t.handlers,
      handledAt: t.handledAt,
      messageId: t.id,
      succeed: t.succeed,
      label: t.label,
      body: t.body,
      retryCount: t.retryCount,
      handlerErrors: t.handlerErrors
    }
  }

  fromDomain(raw: QueueMessage): MessageQueueEntity {
    return this.entityManager.create(MessageQueueEntity, {
      body: raw.body,
      label: raw.label,
      succeed: raw.succeed,
      handledAt: raw.handledAt,
      id: raw.messageId,
      handlerErrors: raw.handlerErrors,
      retryCount: raw.retryCount,
      handlers: raw.handlers,
    })
  }

}
