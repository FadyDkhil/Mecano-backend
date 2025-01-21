import {AggregateRoot, Handle} from "ddd";
import { v4 } from "uuid";
import { RateCreated } from "../../../../messages/events/RateCreated";

export interface RateProperties {
  id: string;
  userId: string;
  mechanicId: string;
  rateNumber: number;
}

export class Rate extends AggregateRoot<RateProperties> {
  static restore(props: RateProperties) {
    return new Rate(props);
  }

  static create(payload: {
    userId: string;
    mechanicId: string;
    rateNumber: number;
  }) {
    const { userId , mechanicId, rateNumber } = payload;
    const rate = new Rate({
      id: v4(),
      userId,
      mechanicId,
      rateNumber
    });
    rate.applyChange(
      new RateCreated({
        id: v4(),
        userId,
        mechanicId,
        rateNumber
      })
    );
    return rate;
  }

  @Handle(RateCreated)
  private applyProfileCreated(event: RateCreated) {
    this.props.id = event.props.id;
    this.props.userId = event.props.userId;
    this.props.mechanicId = event.props.mechanicId;
    this.props.rateNumber = event.props.rateNumber;
  }



}
