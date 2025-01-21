import {AggregateRoot, Handle} from "ddd";
import { v4 } from "uuid";
import { VehicleCreated } from "../../../../messages/events/VehicleCreated";
import { VehicleDeleted } from "../../../../messages/events/VehicleDeleted";
import { VehicleUpdated } from "../../../../messages/events/VehicleUpdated";

export interface VehicleProperties {
  id: string;
  model: string;
  licensePlate: string;
  userId: string;
}

export class Vehicle extends AggregateRoot<VehicleProperties> {
  static restore(props: VehicleProperties) {
    return new Vehicle(props);
  }

  static add(payload: {
    model: string;
    licensePlate: string;
    userId: string;
  }) {
    const { model, licensePlate, userId } = payload;
    const vehicle = new Vehicle({
      id: v4(),
      model,
      licensePlate,
      userId
    });
    vehicle.applyChange(
      new VehicleCreated({
        model,
        licensePlate,
        userId
      })
    );
    return vehicle;
  }

  @Handle(VehicleCreated)
  private applyVehicleCreated(event: VehicleCreated) {
      this.props.model = event.props.model;
      this.props.licensePlate = event.props.licensePlate;
      this.props.userId = event.props.userId;
  }


  
  update(payload: {
    model: string;
    licensePlate: string;
}) {
    const { model, licensePlate } = payload;
    this.applyChange(
        new VehicleUpdated({
            model,
            licensePlate,
        })
    );
    return this;
}

@Handle(VehicleUpdated)
private applyVehicleUpdated(event: VehicleUpdated) {
    this.props.model = event.props.model;
    this.props.licensePlate = event.props.licensePlate;
}


delete() {
  this.applyChange(
      new VehicleDeleted({
          id: this.props.id,
          licensePlate: `${this.props.licensePlate}-${v4()}`,
      })
  );
}

@Handle(VehicleDeleted)
private applyVehicleDeleted(event: VehicleDeleted) {
  this.props.id = event.props.id;
  this.props.licensePlate = event.props.licensePlate;
}
}
