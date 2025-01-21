import 'reflect-metadata';
import { DomainEvent } from '../domain/entities/DomainEvent';
import { AggregateRoot } from '../domain/entities/AggregateRoot';
import { Handle } from '../domain/decorators/Handle';

export interface SampleProps {
  chalom?: string;
}

export class SampleChalomUpdated implements DomainEvent<string> {
  public id: string;
  public props: string;
  metadata;
  constructor(props: string) {
    this.id = '1615';
    this.props = props;
  }
}
export class SampleChalomCleaned implements DomainEvent<any> {
  public id: string;
  public props: any;
  metadata;
  constructor() {
    this.id = '1615';
  }
}

export class Sample extends AggregateRoot<SampleProps> {
  static create() {
    return new Sample({
      id: 'efsfsdr',
      chalom: '',
    });
  }
  UpdateChalom(value: string) {
    this.applyChange(new SampleChalomUpdated(value));
  }
  CleanChalom() {
    this.applyChange(new SampleChalomCleaned());
  }
  @Handle(SampleChalomUpdated)
  applyChalomUpdated(event: SampleChalomUpdated) {
    this.props.chalom = event.props;
  }
  @Handle(SampleChalomCleaned)
  applyChalomCleaned() {
    this.props.chalom = undefined;
  }
}

describe('AggregateRoot EventSourcing', () => {
  it('sandbox', () => {
    const sample = Sample.create();
    const expected = 'beau gosse';
    sample.UpdateChalom(expected);
    expect(sample.version).toEqual(1);
    expect(sample.props.chalom).toBe(expected);
    sample.CleanChalom();
    expect(sample.version).toEqual(2);
    expect(sample.props.chalom).toBeUndefined();
  });
});
