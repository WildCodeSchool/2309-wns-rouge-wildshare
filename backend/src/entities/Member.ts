import { Field, ID, InputType, ObjectType } from "type-graphql";
import {
  BaseEntity,
  BeforeInsert,
  Column,
  Entity,
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

  @ManyToOne(() => User, (user) => user.members)
  @Field(() => User)
  user!: User;

  @ManyToOne(() => Group, (group) => group.members)
  @Field(() => Group)
  group!: Group;

  @Column({ type: "timestamp" })
  @Field()
  last_visit!: Date;

  @Column({ type: "timestamp", nullable: false })
  @Field()
  created_at!: Date;

  @BeforeInsert()
  updateDate() {
    this.created_at = new Date();
  }

  @Column({ type: "timestamp", nullable: true })
  @Field()
  updated_at!: Date;

  @ManyToMany(() => Right, (rights) => rights.members)
  @Field(() => [Right])
  rights!: Right[];
}

@InputType()
export class MemberInput {}
