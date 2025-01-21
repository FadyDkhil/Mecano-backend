import {
    Column,
    CreateDateColumn,
    Entity,
    Index,
    PrimaryColumn,
    UpdateDateColumn,
} from "typeorm";
import {AccountStatus} from "../../../../../core/write/domain/types/AccountStatus";
import { UserRole } from "../../../../../core/write/domain/types/UserRole";

@Entity("users")
export class UserEntity {
    @PrimaryColumn("uuid")
    id: string;

    @Index()
    @Column({
        nullable: false,
        type: "varchar",
        unique: true,
    })
    email: string;

    @Column({
        nullable: false,
        type: "varchar",
    })
    password: string;

    @Column({
        nullable: true,
        type: "varchar",
    })
    phone: string;

    @Column({
        nullable: true,
        type: "varchar",
    })
    signInAt: Date;

    @Column({
        nullable: false,
        type: "int",
        default: 0,
    })
    role: UserRole;

    @Column({
        nullable: false,
        type: "varchar",
        default: "INACTIVE",
    })
    status: AccountStatus;

    @Column({
        nullable: true,
        type: "varchar",
    })
    recoveryCode: string;

    @Column({
        nullable: true,
        type: "int",
    })
    averageRate: number

    @CreateDateColumn()
    createdAt?: Date;

    @UpdateDateColumn()
    updatedAt?: Date;
}
