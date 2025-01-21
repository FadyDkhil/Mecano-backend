import {EventRepository, QueueMessage} from "messages-core";
import {EntityManager, LessThan} from "typeorm";
import {MessageEnveloppeMapper} from "./mappers/MessageEnveloppeMapper";
import {MessageQueueEntity} from "./entities/MessageQueueEntity";

export class PostgresEventRepository implements EventRepository {


  messageEnveloppeMapper: MessageEnveloppeMapper;

  constructor(
    private readonly entityManager: EntityManager
  ) {
    this.messageEnveloppeMapper = new MessageEnveloppeMapper(entityManager);
  }
  async getById(id: string): Promise<QueueMessage> {
    const messageEnveloppe = await this.entityManager.getRepository(MessageQueueEntity).findOne({
      where: {
        id
      }
    })
    if (!messageEnveloppe) {
      throw new Error("MESSAGE_ENVELOPPE_NOT_FOUND")
    }
    return this.messageEnveloppeMapper.toDomain(messageEnveloppe)
  }

  async getQueue(): Promise<QueueMessage[]> {
    const messages = await this.entityManager.getRepository(MessageQueueEntity).find({
      where: {
        succeed: false,
      },
      order: {
        createdAt: 'ASC'
      }
    })
    return messages.map(elem => this.messageEnveloppeMapper.toDomain(elem));
  }

  async save(message: QueueMessage): Promise<void> {
    const messageEnveloppeEntity = this.messageEnveloppeMapper.fromDomain(message);
    await this.entityManager.getRepository(MessageQueueEntity).save(messageEnveloppeEntity);
  }
}
