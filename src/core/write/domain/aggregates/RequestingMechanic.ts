
import {AggregateRoot, Handle} from "ddd";
import { v4 } from "uuid";
import { MechanicAccepted } from "../../../../messages/events/MechanicAccepted";
import { MechanicCanceled } from "../../../../messages/events/MechanicCanceled";
import { MechanicPending } from "../../../../messages/events/MechanicPending";
import { MechanicRejected } from "../../../../messages/events/MechanicRejected";
import { RequestStatus } from "../types/RequestStatus";


export interface RequestingMechanicProperties {
  id: string;
  userId: string;
  mechanicId: string;
  location?: string;
  reason?: string;
  status: RequestStatus;
  done: number;
}

export class RequestingMechanic extends AggregateRoot<RequestingMechanicProperties> {
  static restore(props: RequestingMechanicProperties) {
    return new RequestingMechanic(props);
  }

  static create(payload: {
    userId: string;
    mechanicId: string;
    location?: string;
    reason?: string;
  }) {
    const { userId, mechanicId, location, reason } = payload;
    const mechanicRequest = new RequestingMechanic({
      id: v4(),
      userId,
      mechanicId,
      location,
      reason,
      status: RequestStatus.PENDING,
      done: 0
    });
    return mechanicRequest;
  }

  chooseStatus(status: RequestStatus) {
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
@Handle(MechanicAccepted)
private applyRequestAccepted(event: MechanicAccepted) {
    this.props.id = event.props.id;
    this.props.status = event.props.status
}
@Handle(MechanicRejected)
private applyRequestRejected(event: MechanicRejected) {
    this.props.id = event.props.id;
    this.props.status = event.props.status
}
@Handle(MechanicCanceled)
private applyRequestCanceled(event: MechanicCanceled) {
    this.props.id = event.props.id;
    this.props.status = event.props.status
}

delete(){
}
}
