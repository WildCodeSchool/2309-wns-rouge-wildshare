import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  BeforeInsert,
  JoinColumn,
  ManyToMany,
} from "typeorm";

import { Field, ID, InputType, ObjectType } from "type-graphql";
import { User } from "./User";
import { Ressource } from "./Ressource";

@Entity()
@ObjectType()
export class Tag extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id!: number;

  @Column({ type: "varchar", length: 255, nullable: true }) // to false for prod
  @Field()
  name!: string;

/*   @ManyToMany(() => Ressource, (ressource) => ressource.tags)
  @JoinColumn()
  @Field(() => Ressource)
  ressources!: Ressource[]; */

  @Column({ type: "timestamp", nullable: true }) // to false for prod
  @Field()
  created_at!: Date;

  @BeforeInsert()
  updateDate() {
    this.created_at = new Date();
  }

  @ManyToOne(() => User, (user) => user.tags_creation)
  @JoinColumn({ name: "created_by" })
  @Field(() => User)
  created_by_user!: User;

  @Column({ type: "timestamp", nullable: true })
  @Field()
  updated_at!: Date;

  @ManyToOne(() => User, (user) => user.tags_update)
  @JoinColumn({ name: "updated_by" })
  @Field(() => User)
  updated_by_user!: User;
}

@InputType()
export class TagCreateInput {
  @Field()
  name!: string;
}

@InputType()
export class TagUpdateInput {
  @Field()
  name!: string;
}
