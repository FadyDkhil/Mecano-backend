import {Column, CreateDateColumn, Entity, Index, PrimaryColumn, UpdateDateColumn} from "typeorm";

@Entity("messages_queue")
export class MessageQueueEntity {

  @PrimaryColumn({
    type: "varchar"
  })
  id: string;


  @Column({
    type: "jsonb",
    nullable: true,
  })
  body: any;

  @Column({
    type: "varchar",
    nullable: false,
  })
  label: string;

  @Index()
  @Column({
    type: "boolean",
    nullable: false,
  })
  succeed: boolean;

  @Column({
    type: "jsonb",
    nullable: true,
  })
  handlers: string;

  @Column({
    type: "jsonb",
    nullable: true,
  })
  handlerErrors

  @Column({
    type: "timestamptz",
    nullable: true,
  })
  handledAt: Date;

  @Index()
  @Column({
    type: "int",
    nullable: false,
  })
  retryCount: number;


  @CreateDateColumn()
  createdAt?: Date;

  @UpdateDateColumn()
  updatedAt?: Date;
}
