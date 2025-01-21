import {injectable} from "inversify";
import {User} from "../../../../core/write/domain/aggregates/User";
import {AccountStatus} from "../../../../core/write/domain/types/AccountStatus";
import {Mapper} from "ddd";


export interface UserApiResponse {
  id: string;
  phone: string;
  email: string;
  status : AccountStatus;
  createdAt: Date;
  updatedAt: Date;
}

@injectable()
export class UserDto implements Mapper<UserApiResponse, User> {
  fromDomain(t: User): UserApiResponse {
    return {
      phone: t.props.phone,
      email: t.props.email,
      id: t.id,
      status : t.props.status,
      createdAt: t.createdAt,
      updatedAt: t.updatedAt,
    }
  }
}
