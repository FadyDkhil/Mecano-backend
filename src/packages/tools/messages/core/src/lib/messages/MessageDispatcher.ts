import { Message } from './Message';

export interface MessageDispatcher {
  dispatch<TMessage extends Message>(message: TMessage, partitionKey?: string): Promise<any>;
}
