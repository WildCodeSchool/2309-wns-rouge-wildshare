require("dotenv").config();
import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToMany,
  BeforeInsert,
  Timestamp,
  JoinTable,
} from "typeorm";
import { IsEmail, Matches } from "class-validator";
import { Field, ID, InputType, ObjectType } from "type-graphql";
import { Ad } from "./Ad";
import { Tag } from "./Tag";
import { Member } from "./Member";
import { Message } from "./Message";
import { Ressource } from "./Ressource";

@Entity()
@ObjectType()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id!: number;

  @Column({ type: "varchar", length: 255, nullable: false, unique: true })
  @Field()
  email!: string;

  @Column({ type: "varchar", length: 255, nullable: false })
  hashed_password!: string;

  @Column({ type: "varchar", length: 255, nullable: false })
  @Field()
  lastname!: string;

  @Column({ type: "varchar", length: 255, nullable: false })
  @Field()
  firstname!: string;

  @Column({ type: "timestamp", nullable: false })
  @Field()
  created_at!: Date;

  @BeforeInsert()
  updateDate() {
    this.created_at = new Date();
  }

  @OneToMany(() => Tag, (tags) => tags.user)
  @Field(() => [Tag])
  tags!: Tag[];

  @OneToMany(() => Member, (members) => members.user)
  @Field(() => [Member])
  members!: Member[];

  @OneToMany(() => Message, (messages) => messages.user)
  @Field(() => [Message])
  messages!: Message[];

  @ManyToMany(() => Ressource, (ressource) => ressource.user)
  @JoinTable()
  @Field(() => [Ressource])
  ressource!: Ressource[];

}

@InputType()
export class InputUser {
  @Field()
  @IsEmail()
  email!: string;
  @Field()
  @Matches(/^.{8,50}$/)
  password!: string;
  @Field()
  lastname!: string;
  @Field()
  firstname!: string;
}

@InputType()
export class UserUpdateInput {
  @Field({ nullable: true })
  lastname!: string;
  @Field({ nullable: true })
  firstname!: string;
}
