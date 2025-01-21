import {v4} from "uuid";
import {UserSignedUp} from "../../../../messages/events/UserSignedUp";
import { Email } from "../valueObject/Email";
import {UserSignIn} from "../../../../messages/events/UserSignIn";
import {UserAccountActivated} from "../../../../messages/events/UserAccountActivated";
import {PhoneNumberAdded} from "../../../../messages/events/PhoneNumberAdded";
import {PasswordReset} from "../../../../messages/events/PasswordReset";
import {RecoveryCodeGenerated} from "../../../../messages/events/RecoveryCodeGenerated";
import {UserErrors} from "../errors/UserErrors";
import {customAlphabet} from "nanoid";
import {AggregateRoot, Handle} from "ddd";
import { AccountStatus } from "../types/AccountStatus";
import { UserRole } from "../types/UserRole";


export interface UserProperties {
    id: string;
    email: string;
    password: string;
    signInAt: Date;
    role: UserRole;
    phone?: string;
    status: AccountStatus;
    recoveryCode?: string;
    averageRate?: number
}

export class User extends AggregateRoot<UserProperties> {
    static restore(props: UserProperties) {
        return new User(props);
    }

    static signup(payload: {
        email: string;
        password: string;
    }) {
        const {email, password} = payload;
        const user = new User({
            id: v4(),
            email,
            password,
            signInAt: new Date(),
            role: UserRole.USER,
            status: AccountStatus.INACTIVE,
            phone: "",
        });
        user.applyChange(
            new UserSignedUp({
                email: new Email(email).value,
            })
        );
        return user;
    }

    @Handle(UserSignedUp)
    private applyUserSignedUp(event: UserSignedUp) {
        this.props.email = event.props.email;
    }

    signIn() {
        this.applyChange(
            new UserSignIn({
                signInAt: new Date(),
            })
        );
        return this;
    }

    update(
        payload: {
            role: UserRole
        }
    ){
        const {role} = payload;
        this.props.role = role;
    }

    @Handle(UserSignIn)
    private applyUserSignIn(event: UserSignIn) {
        this.props.signInAt = event.props.signInAt;
    }

    activate() {
        this.applyChange(
            new UserAccountActivated({
                accountStatus: AccountStatus.ACTIVE,
            })
        );
        return this;
    }

    @Handle(UserAccountActivated)
    private applyUserAccountActivated(event: UserAccountActivated) {
        this.props.status = event.props.accountStatus;
    }

    addPhoneNumber(phone: string) {
        this.applyChange(new PhoneNumberAdded({phone}));
        return this;
    }

    @Handle(PhoneNumberAdded)
    private applyPhoneNumberAdded(event: PhoneNumberAdded) {
        this.props.phone = event.props.phone;
    }

    resetPassword(payload: {password: string; recoveryCode: string}) {
        if (this.props.recoveryCode !== payload.recoveryCode) {
            throw new UserErrors.InvalidRecoveryCode();
        }
        this.applyChange(
            new PasswordReset({
                password: payload.password,
            })
        );
    }

    @Handle(PasswordReset)
    private applyPasswordReset(event: PasswordReset) {
        this.props.password = event.props.password;
        this.props.recoveryCode = null;
    }

    generateRecoveryCode() {
        const nanoid = customAlphabet("ABCDEFGHIJKLMNOPQRSTUVW1234567890");
        this.applyChange(
            new RecoveryCodeGenerated({
                email: this.props.email,
                recoveryCode: nanoid(5),
                id: this.id,
            })
        );
    }

    @Handle(RecoveryCodeGenerated)
    private applyRecoveryCodeGenerated(event: RecoveryCodeGenerated) {
        this.props.recoveryCode = event.props.recoveryCode;
    }


}
