
export type QueueMessage = {body: any;
  label: string;
  messageId: string;succeed: boolean; handlers: any; handledAt: Date; handlerErrors: any; retryCount: number;}
export interface EventRepository {
  save(message: QueueMessage): Promise<void>;
  getQueue(): Promise<QueueMessage[]>;
}
