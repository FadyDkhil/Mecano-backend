import {Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn} from "typeorm";
import { RequestStatus } from "../../../../../core/write/domain/types/RequestStatus";


@Entity('mechanics')
export class MechanicRequestEntity {

    @PrimaryColumn()
    id: string

    @Column({
        nullable: false,
        type: "varchar",
    })
    userId: string;

    @Column({
        nullable: false,
        type: "varchar",
    })
    cv: string;

    @Column({
        nullable: false,
        type: "varchar",
    })
    status: RequestStatus;

    @CreateDateColumn()
    createdAt?: Date;

    @UpdateDateColumn()
    updatedAt?: Date
}