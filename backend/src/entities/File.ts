import { Field, ID, ObjectType, InputType } from "type-graphql";
import {
  BaseEntity,
  BeforeInsert,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./User";

@Entity()
@ObjectType()
export class File extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id!: number;

  @Column({ type: "varchar", length: 255, nullable: false })
  @Field()
  name!: string;

  @Column({ type: "varchar", length: 255, nullable: false })
  @Field()
  type!: string;

  @Column({ type: "varchar", length: 255, nullable: false })
  @Field()
  path!: string;

  @Column({ type: "timestamp", nullable: false })
  @Field()
  created_at!: Date;

  @BeforeInsert()
  updateDate() {
    this.created_at = new Date();
  }

  @ManyToOne(() => User, (user) => user.files_creation)
  @JoinColumn({ name: "created_by" })
  @Field(() => User)
  created_by_user!: User;

  @Column({ type: "timestamp", nullable: true })
  @Field()
  updated_at!: Date;

  @ManyToOne(() => User, (user) => user.files_update)
  @JoinColumn({ name: "updated_by" })
  @Field(() => User)
  updated_by_user!: User;
}
@InputType()
export class FileCreateInput {
  @Field()
  name!: string;
}

@InputType()
export class FileUpdateInput {
  @Field()
  name!: string;
}
