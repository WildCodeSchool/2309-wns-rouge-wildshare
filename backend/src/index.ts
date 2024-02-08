import "reflect-metadata";
import { ApolloServer } from "@apollo/server";
import { dataSource } from "./datasource";
import { buildSchema } from "type-graphql";
import { TagResolver } from "./resolvers/Tags";
import { UserResolver } from "./resolvers/Users";
import { ContextType, customAuthChecker } from "./middlewares/auth";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import express from "express";
import http from "http";
import cors from "cors";
import { RightResolver } from "./resolvers/Right";
import { RessourceResolver } from "./resolvers/Ressources";
import { MessageResolver } from "./resolvers/Messages";
import { MemberResolver } from "./resolvers/Members";
import { LinkResolver } from "./resolvers/Links";
import { ImageResolver } from "./resolvers/Images";
import { GroupResolver } from "./resolvers/Groups";
import { FileResolver } from "./resolvers/Files";
import { User } from "./entities/User";
import { populateBdd } from "./utils/populateBdd";

const start = async () => {
  const schema = await buildSchema({
    resolvers: [
      TagResolver,
      UserResolver,
      RightResolver,
      RessourceResolver,
      MessageResolver,
      MemberResolver,
      LinkResolver,
      ImageResolver,
      GroupResolver,
      FileResolver,
    ],
    authChecker: customAuthChecker,
  });

  const app = express();
  const httpServer = http.createServer(app);

  const server = new ApolloServer<ContextType>({
    schema,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });
  await server.start();

  app.use(
    "/",
    cors<cors.CorsRequest>({
      credentials: true,
      origin: "http://localhost:3000",
    }),
    express.json({ limit: "50mb" }),
    expressMiddleware(server, {
      context: async (arg) => {
        return {
          req: arg.req,
          res: arg.res,
        };
      },
    })
  );

  await new Promise<void>((resolve) =>
    httpServer.listen({ port: 4000 }, resolve)
  );
  console.log(`🚀 Server ready at http://localhost:4000/`);

  await dataSource.initialize();
  const user = await User.findOneBy({ email: "admin@ressources.com" });
  if (!user) {
    await populateBdd();
  }
};
start();
