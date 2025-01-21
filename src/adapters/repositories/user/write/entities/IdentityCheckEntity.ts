import {Entity, PrimaryColumn, Column, CreateDateColumn} from "typeorm";

@Entity("identity_checks")
export class IdentityCheckEntity {
    @PrimaryColumn({
        type: "varchar",
    })
    id: string;

    @Column({
        nullable: false,
        type: "varchar",
    })
    userId: string;

    @Column({
        nullable: false,
        type: "varchar",
    })
    workflowId: string;

    @Column({
        nullable: false,
        type: "varchar",
    })
    applicantId: string;

    @Column({
        type: "varchar",
        nullable: true
    })
    result?: string;

    @CreateDateColumn()
    startedAt?: Date;

    @Column({
        nullable: true,
    })
    endedAt?: Date;
}
