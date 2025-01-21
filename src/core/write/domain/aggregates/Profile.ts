import { ProfileCreated } from "../../../../messages/events/ProfileCreated";
import { ProfilePictureAdded } from "../../../../messages/events/ProfilePictureAdded";
import {AggregateRoot, Handle} from "ddd";
import { Gender } from "../types/Gender";
import { v4 } from "uuid";
import { ProfileUpdated } from "../../../../messages/events/ProfileUpdated";

export interface ProfileProperties {
  id: string;
  firstname: string;
  lastname: string;
  birthDate: Date;
  gender: Gender;
  profilePicture?: string;  
  cv?: string;
}

export class Profile extends AggregateRoot<ProfileProperties> {
  static restore(props: ProfileProperties) {
    return new Profile(props);
  }

  static create(payload: {
    id: string;
    firstname: string;
    lastname: string;
    birthDate: Date;
    gender: Gender;
  }) {
    const { id, firstname, lastname, birthDate, gender } = payload;
    const profile = new Profile({
      id,
      firstname,
      lastname,
      birthDate,
      gender
    });
    profile.applyChange(
      new ProfileCreated({
        id,
        firstname,
        lastname,
        birthDate,
        gender
      })
    );
    return profile;
  }

  @Handle(ProfileCreated)
  private applyProfileCreated(event: ProfileCreated) {
    this.props.id = event.props.id;
    this.props.firstname = event.props.firstname;
    this.props.lastname = event.props.lastname;
    this.props.birthDate = event.props.birthDate;
    this.props.gender = event.props.gender;
  }

  addProfilePicture(profilePicture: string) {
    this.applyChange(
      new ProfilePictureAdded({ profilePicture })
    );
    return this;
  }

  @Handle(ProfilePictureAdded)
  private applyPhoneNumberAdded(event: ProfilePictureAdded) {
    this.props.profilePicture = event.props.profilePicture;
  }


  update(payload:
    {
      firstname: string;
      lastname: string;
      birthDate: Date;
      gender: Gender;
    }){
      const {firstname, lastname, birthDate, gender} = payload;
      this.applyChange(
        new ProfileUpdated({
          firstname,
          lastname,
          birthDate,
          gender
        })
      );
      return this;
  }

  
}




