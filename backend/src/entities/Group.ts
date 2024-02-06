import { Field, ID, ObjectType } from "type-graphql";
import {
  BaseEntity,
  BeforeInsert,
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./User";
import { Member } from "./Member";

@Entity()
@ObjectType()
export class Group extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id!: number;

  @Column({ type: "varchar", length: 255, nullable: false })
  @Field()
  name!: string;

  @Column({ type: "text" })
  @Field()
  description!: string;

  @Column({ type: "varchar", length: 255, nullable: false })
  @Field()
  token!: string;

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

  @OneToMany(() => Member, (members) => members.user)
  @Field(() => [Member])
  members!: Member[];
}
