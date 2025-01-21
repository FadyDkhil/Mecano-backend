import {RecipientCreated} from "../../../../messages/events/RecipientCreated";
import {AggregateRoot, Handle} from "ddd";


export interface RecipientProperties {
  id: string;
  email: string;
  phone: string;
}


export class Recipient extends AggregateRoot<RecipientProperties> {

  static restore(props: RecipientProperties) {
    return new Recipient(props);
  }


  static create(payload: {id: string; email: string; phone: string;}) {
    const { phone, id, email } = payload;
    const recipient = new Recipient({
      email,
      phone,
      id,
    });
    recipient.applyChange(
      new RecipientCreated({
        phone,
        email,
      })
    )
    return recipient;
  }

  @Handle(RecipientCreated)
  private applyRecipientCreated(event: RecipientCreated) {
    this.props.phone = event.props.phone;
    this.props.email = event.props.email;
  }

}
