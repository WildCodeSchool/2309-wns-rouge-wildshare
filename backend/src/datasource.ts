require("dotenv").config();
import { DataSource } from "typeorm";
import { Tag } from "./entities/Tag";
import { User } from "./entities/User";
import { Right } from "./entities/Right";
import { Ressource } from "./entities/Ressource";
import { Message } from "./entities/Message";
import { Member } from "./entities/Member";
import { Link } from "./entities/Link";
import { Group } from "./entities/Group";
import { Image } from "./entities/Image";
import { File } from "./entities/File";

export const dataSource = new DataSource({
  type: "postgres",
  host: "db",
  port: 5432,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  entities: [
    Tag,
    User,
    Right,
    Ressource,
    Message,
    Member,
    Link,
    Image,
    Group,
    File,
  ],
  synchronize: true,
  logging: true,
});
