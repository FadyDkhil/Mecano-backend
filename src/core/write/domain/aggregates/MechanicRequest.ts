import {AggregateRoot} from "ddd";
import { v4 } from "uuid";
import { MechanicAccepted } from "../../../../messages/events/MechanicAccepted";
import { MechanicCanceled } from "../../../../messages/events/MechanicCanceled";
import { MechanicPending } from "../../../../messages/events/MechanicPending";
import { MechanicRejected } from "../../../../messages/events/MechanicRejected";
import { RequestStatus } from "../types/RequestStatus";


export interface MechanicRequestProperties {
  id: string;
  userId: string;
  cv: string;
  status: RequestStatus;
}

export class MechanicRequest extends AggregateRoot<MechanicRequestProperties> {
  static restore(props: MechanicRequestProperties) {
    return new MechanicRequest(props);
  }

  static create(payload: {
    userId: string;
    cv: string;
  }) {
    const { userId, cv } = payload;
    const mechanicRequest = new MechanicRequest({
      id: v4(),
      userId,
      cv,
      status: RequestStatus.PENDING
    });
    return mechanicRequest;
  }

  approve(status: RequestStatus) {
    switch (status) {
      case RequestStatus.ACCEPTED:
          this.applyChange(
              new MechanicAccepted({
                  id: this.props.id,
                  status: RequestStatus.ACCEPTED,
              })
          );
          break;
      case RequestStatus.REJECTED:
          this.applyChange(
              new MechanicRejected({
                  id: this.props.id,
                  status: RequestStatus.REJECTED,
              })
          );
          break;
      case RequestStatus.PENDING:
          this.applyChange(
              new MechanicPending({
                  id: this.props.id,
                  status: RequestStatus.PENDING,
              })
          );
          break;
      case RequestStatus.CANCELED:
          this.applyChange(
              new MechanicCanceled({
                  id: this.props.id,
                  status: RequestStatus.CANCELED,
              })
          );
          break;
  }
  return this;
}


}
