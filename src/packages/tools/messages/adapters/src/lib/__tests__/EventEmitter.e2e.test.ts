import {MessageModule} from "../modules/MessageModule";
import {Container, injectable} from "inversify";
import {v4} from "uuid";
import {DecoratedEvent} from "messages-core";
import {DomainEvent, DomainEventHandler, DomainEventMetadata} from "ddd";
import {EventManager} from "../EventManager";
import {InMemoryEventRepository} from "../repositories/inMemory/InMemoryEventRepository";


jest.setTimeout(10000000)
export interface AccountDeletedProps{
  deletedAt : Date;
  phone: string;
}

@DecoratedEvent({
  name: 'ACCOUNT_DELETED',
  namespace: '@oks/iac',
  version: 1,
})
export class AccountDeleted implements DomainEvent{
  id = v4()
  props : AccountDeletedProps
  timestamp = +new Date();
  metadata: DomainEventMetadata;

  constructor(props: AccountDeletedProps) {
    this.props = props;
  }
}

@DecoratedEvent({
  name: 'ACCOUNT_DELETED_bis',
  namespace: '@oks/iac',
  version: 1,
})
export class AccountDeletedBis implements DomainEvent{
  id = "bis"
  props : AccountDeletedProps
  timestamp = +new Date();
  metadata: DomainEventMetadata;

  constructor(props: AccountDeletedProps) {
    this.props = props;
  }
}

@injectable()
class OnAccountDeletedHandler extends DomainEventHandler<AccountDeleted> {
  async handle(domainEvent: AccountDeleted): Promise<void> {
    return;
  }
}


describe('E2E - EventEmitter', () => {
  let messageModule: MessageModule;

  beforeAll(async () => {
    const container = new Container();
    messageModule = new MessageModule(container).configure({
      dataSource: new InMemoryEventRepository(new Map())
    });
    await messageModule.register((em: EventManager) => {
      em.register(AccountDeleted, OnAccountDeletedHandler);
      em.register(AccountDeletedBis, OnAccountDeletedHandler);
    })
  })


  it('Should emit and receive a message', async () => {
    const spy = jest.spyOn(OnAccountDeletedHandler.prototype, 'handle')
    await messageModule.messagingPlugin.dispatcher.dispatchEvent(
      new AccountDeletedBis({
        deletedAt: new Date(),
        phone: "+33"
      })
    )
    const delay = delayInms => {
      return new Promise(resolve => setTimeout(resolve, delayInms));
    };
    await delay(10000)
    expect(spy.mock.calls[0][0].props.phone).toEqual("+33")
  })
})
