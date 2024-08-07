import { buildSchema } from "type-graphql";
import { UserResolver } from "./resolvers/Users";
import { RessourceResolver } from "./resolvers/Ressources";
import { MessageResolver } from "./resolvers/Messages";
import { MemberResolver } from "./resolvers/Members";
import { LinkResolver } from "./resolvers/Links";
import { ImageResolver } from "./resolvers/Images";
import { GroupResolver } from "./resolvers/Groups";
import { FileResolver } from "./resolvers/Files";
import { customAuthChecker } from "./middlewares/auth";
import { pubSub } from "./pubsub";

export async function getSchema() {
  return await buildSchema({
    resolvers: [
      UserResolver,
      RessourceResolver,
      MessageResolver,
      MemberResolver,
      LinkResolver,
      ImageResolver,
      GroupResolver,
      FileResolver,
    ],
    authChecker: customAuthChecker,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    pubSub: pubSub as any,
  });
}
