import { ReflectMetadataService } from '../services/ReflectMetadataService';
import { DomainEvent } from '../entities/DomainEvent';
import { Newable } from 'ts-essentials';

export function Handle<T extends DomainEvent<any>>(event: Newable<T>) {
  return function (target: any, functionName: any) {
    const meta = ReflectMetadataService.ensureSchemaMetadata(target.constructor);
    // todo check the key index
    meta.handlers.set(event.name, functionName);
  };
}
