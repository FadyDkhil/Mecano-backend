import 'reflect-metadata';
import {Column, CreateDateColumn, Entity, Index, PrimaryColumn, UpdateDateColumn} from "typeorm";

@Entity("sca_verifiers")
export class ScaVerifierEntity {

    @PrimaryColumn({
        type: "varchar"
    })
    id: string;

    @Column({
        nullable: true,
        type: "varchar"
    })
    tenant?: string;


    @Index()
    @Column({
        nullable: false,
        type: "varchar",
    })
    phone: string;


    @Column({
        nullable: true,
        type: "timestamp",
    })
    completedAt: Date;

    @Column({
        nullable: true,
        type: "varchar"
    })
    code: string;

    @Column({
        nullable: true,
        type: "varchar"
    })
    contextId: string;


    @CreateDateColumn()
    createdAt?: Date;

    @UpdateDateColumn()
    updatedAt?: Date;
}
