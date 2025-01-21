import {Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn} from "typeorm";
import { Gender } from "../../../../../core/write/domain/types/Gender";


@Entity('profiles')
export class ProfileEntity {

    @PrimaryColumn("uuid")
    id: string

    @Column({
        nullable: false,
        type: "varchar",
    })
    firstName: string;

    @Column({
        nullable: false,
        type: "varchar",
    })
    lastName: string;


    @Column({
        nullable: false,
        type: "varchar",
    })
    gender: Gender;

    @Column({
        nullable: false,
        type: "timestamp",
    })
    birthDate: Date;

    @Column({
        nullable: true,
        type: "varchar",
    })
    profilePicture?: string;

    @Column({
        nullable: true,
        type: "varchar",
    })
    cv?: string;

    @CreateDateColumn()
    createdAt?: Date;

    @UpdateDateColumn()
    updatedAt?: Date
}