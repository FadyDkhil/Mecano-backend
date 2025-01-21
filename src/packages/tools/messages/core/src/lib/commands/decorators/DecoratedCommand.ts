import { Message } from '../../messages/Message';
import { MessageCtor } from '../../messages/MessageCtor';
import {DecoratedMessage} from '../../messages/decorators/DecoratedMessage';
import {CommandMetadata} from '../metadata/CommandMetadata';
import {StaticCommandRegistry} from '../metadata/StaticCommandRegistry';

export type DecoratedCommandData = {
  name: string;
  version: number;
  namespace?: string;
};

export function DecoratedCommand(data: DecoratedCommandData) {
  return (target: MessageCtor<Message<any>>) => {
    // forward DecoratedMessage decorator
    DecoratedMessage(data)(target);

    const metadata = CommandMetadata.ensure(target);

    // set the global metadata
    metadata.name = data.name;
    metadata.version = data.version;
    metadata.namespace = data.namespace;

    if (!StaticCommandRegistry.has(data.namespace, data.name, data.version)) {
      StaticCommandRegistry.register(target);
    } else {
      console.warn('Multiple command with same metadata has been registered', metadata);
    }
  };
}
