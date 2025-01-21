import {Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn} from "typeorm";


@Entity('vehicles')
export class VehicleEntity {

    @PrimaryColumn()
    id: string

    @Column({
        nullable: false,
        type: "varchar",
    })
    model: string;

    @Column({
        nullable: false,
        type: "varchar",
    })
    licensePlate: string;

    @Column({
        nullable: false,
        type: "uuid",
    })
    userId: string;

    @CreateDateColumn()
    createdAt?: Date;

    @UpdateDateColumn()
    updatedAt?: Date
}