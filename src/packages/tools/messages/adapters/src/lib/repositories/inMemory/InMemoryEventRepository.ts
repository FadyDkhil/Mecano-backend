import {EventRepository, QueueMessage} from "messages-core";

export class InMemoryEventRepository implements EventRepository {
  constructor(
    private readonly map: Map<string, QueueMessage>
  ) {
  }

  async save(enveloppe: QueueMessage): Promise<void> {
    this.map.set(enveloppe.messageId, enveloppe);
  }

  async getById(id: string): Promise<QueueMessage> {
    return this.map.get(id);
  }

  async getQueue(): Promise<QueueMessage[]> {
    const values = Array.from(this.map.values())
    return values.filter(elem => elem.succeed === false)
  }
}
