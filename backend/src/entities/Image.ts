import { Field, ID, InputType, ObjectType } from "type-graphql";
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
//import { Ressource } from "./Ressource"

@Entity()
@ObjectType()
export class Image extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id!: number;

  @Column({ type: "varchar", length: 255, nullable: false })
  @Field()
  name!: string;

  @Column({ type: "varchar", length: 255, nullable: false })
  @Field()
  path!: string;

  @OneToOne(() => User)
  @JoinColumn()
  @Field(() => User)
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
  @Field(() => User)
  created_by!: User;

  @Column({ type: "timestamp", nullable: true })
  @Field()
  updated_at!: Date;

  @OneToOne(() => User)
  @JoinColumn()
  @Field(() => User)
  updated_by!: User;

  /*@OneToOne(() => Ressource)
  @JoinColumn()
  @Field()
  ressource_id!: Ressource; */
}

@InputType()
export class ImageInput {
  @Field()
  name!: string;
  @Field()
  path!: string;
  @Field(() => User, { nullable: true })
  user_id!: User;
}
