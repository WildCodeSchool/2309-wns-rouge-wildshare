import { Field, ID, InputType, ObjectType } from "type-graphql";
import {
  BaseEntity,
  BeforeInsert,
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  ManyToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  JoinTable,
} from "typeorm";
import { User } from "./User";
import { Link } from "./Link";
import { File } from "./File";
import { Image } from "./Image";
@Entity()
@ObjectType()
export class Ressource extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id!: number;

  @Column({ type: "varchar", length: 100, nullable: false })
  @Field()
  title!: string;

  @Column({ type: "varchar", length: 100, nullable: false })
  @Field()
  type!: string;

  @Column({ type: "varchar", length: 255, nullable: false })
  @Field()
  description!: string;

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

  @OneToOne(() => File)
  @JoinColumn()
  @Field()
  file_id!: File;

  @OneToOne(() => Link)
  @JoinColumn()
  @Field()
  link_id!: Link;

  @OneToOne(() => Image)
  @JoinColumn()
  @Field()
  image_id!: Image;

  @ManyToMany(() => User, (user) => user.ressource)
  @JoinTable()
  @Field(() => [User])
  user!: User[];

}

@InputType()
export class RessourceInput {}
