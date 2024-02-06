import { Field, ID, ObjectType } from "type-graphql";
import {
  BaseEntity,
  BeforeInsert,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./User";
import { Group } from "./Group";

@Entity()
@ObjectType()
export class Message extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id!: number;

  @ManyToOne(() => User, (users) => users.messages)
  @Field(() => [User])
  user!: User;

  @ManyToOne(() => Group, (group) => group.messages)
  @Field(() => Group)
  group!: Group;

  @Column({ type: "timestamp", nullable: false })
  @Field()
  created_at!: Date;

  @BeforeInsert()
  updateDate() {
    this.created_at = new Date();
  }

  @OneToOne(() => User)
  @JoinColumn()
  @Field()
  created_by!: User;

  @Column({ type: "timestamp", nullable: true })
  @Field()
  updated_at!: Date;

  @OneToOne(() => User)
  @JoinColumn()
  @Field()
  updated_by!: User;
}
