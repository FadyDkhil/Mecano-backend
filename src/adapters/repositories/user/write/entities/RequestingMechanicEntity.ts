import {Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn} from "typeorm";
import { RequestStatus } from "../../../../../core/write/domain/types/RequestStatus";


@Entity('requested_mechanics')
export class RequestingMechanicEntity {

    @PrimaryColumn()
    id: string

    @Column({
        nullable: false,
        type: "uuid",
    })
    userId: string;

    @Column({
        nullable: false,
        type: "uuid",
    })
    mechanicId: string;

    @Column({
        nullable: true,
        type: "varchar",
    })
    location: string;

    @Column({
        nullable: true,
        type: "varchar",
    })
    reason: string;

    @Column({
        nullable: false,
        type: "varchar",
    })
    status: RequestStatus;


    @Column({
        nullable: false,
        type: "int",
    })
    done: number;

    @CreateDateColumn()
    createdAt?: Date;

    @UpdateDateColumn()
    updatedAt?: Date
}