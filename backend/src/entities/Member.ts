import { Field, ID, InputType, ObjectType } from "type-graphql";
import {
  BaseEntity,
  BeforeInsert,
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./User";
import { Group } from "./Group";
import { Right } from "./Right";

@Entity()
@ObjectType()
export class Member extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id!: number;

  @ManyToOne(() => Group, (group) => group.members)
  @Field(() => Group)
  group!: Group;

  @Column({ type: "timestamp" })
  @Field()
  last_visit!: Date;

  @ManyToMany(() => Right, (rights) => rights.members)
  @Field(() => [Right])
  rights!: Right[];

  @Column({ type: "timestamp", nullable: false })
  @Field()
  created_at!: number;

  @BeforeInsert()
  updateDate() {
    this.created_at = Date.now();
  }

  @ManyToOne(() => User, (users) => users.messages)
  @JoinColumn()
  @Field(() => User)
  created_by!: User;

  @Column({ type: "timestamp", nullable: true })
  @Field()
  updated_at!: number;

  @ManyToOne(() => User)
  @JoinColumn()
  @Field(() => User)
  updated_by!: User;
}

@InputType()
export class MemberInput {
  @Field(() => User)
  user!: User;

  @Field(() => Group)
  group!: Group;

  @Field({ nullable: true })
  last_visit!: Date;

  @Field(() => [Right])
  rights!: Right[];
}