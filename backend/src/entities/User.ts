require("dotenv").config();
import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
  BeforeInsert,
  Timestamp,
} from "typeorm";
import { IsEmail, Matches } from "class-validator";
import { Field, ID, InputType, ObjectType } from "type-graphql";
import { Ad } from "./Ad";

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

  // @OneToMany(() => Ad, (ads) => ads.user)
  // @Field(() => [Ad])
  // ads!: Ad[];
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
