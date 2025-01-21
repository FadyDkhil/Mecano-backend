import { ReflectMetadataService } from '../services/ReflectMetadataService';

export function EventSourcedAggregateRoot() {
  return function (target: any) {
    ReflectMetadataService.ensureSchemaMetadata(target);
  };
}
