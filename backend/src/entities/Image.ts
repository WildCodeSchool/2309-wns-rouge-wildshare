import { Field, ID, ObjectType } from "type-graphql";
import {
  BaseEntity,
  BeforeInsert,
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  OneToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./User";

@Entity()
@ObjectType()
export class Image extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id!: number;

  @Column({ type: "varchar", length: 255, nullable: false })
  name!: string;

  @Column({ type: "varchar", length: 255, nullable: false })
  path!: string;

  @OneToOne(() => User)
  @JoinColumn()
  user_id!: User;

  @Column({ type: "timestamp", nullable: false })
  @Field()
  created_at!: Date;

  @BeforeInsert()
  updateDate() {
    this.created_at = new Date();
  }

  @OneToOne(() => User)
  @JoinColumn()
  created_by!: User;

  @Column({ type: "timestamp", nullable: true })
  @Field()
  updated_at!: Date;

  @OneToOne(() => User)
  @JoinColumn()
  updated_by!: User;
}
