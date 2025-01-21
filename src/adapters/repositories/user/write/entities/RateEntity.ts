import {Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn} from "typeorm";


@Entity('rates')
export class RateEntity {

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
    mechanicId: string;

    @Column({
        nullable: false,
        type: "int",
    })
    rateNumber: number;

    @CreateDateColumn()
    createdAt?: Date;

    @UpdateDateColumn()
    updatedAt?: Date
}