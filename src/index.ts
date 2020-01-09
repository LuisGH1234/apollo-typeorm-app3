import "reflect-metadata";
import { createConnection } from "typeorm";
import { ApolloServer } from "apollo-server-express";
import { config } from "./database/config";
import express from "express";
import { schema } from "./schema";

async function bootstrap() {
    await createConnection(config);
    // const resolvers: IResolvers = {};
    // const typeDefs = "";
    // const schema = GraphModule.schema();
    // console.log(resolvers.toObject());
    const server = new ApolloServer({ schema: schema() });
    const app = express();
    server.applyMiddleware({ app });
    app.set("PORT", process.env.PORT || 3001);
    app.listen(app.get("PORT"), err => {
        if (err) return console.error("Error: " + err);
        console.log(`Running a GraphQL API server at localhost:${app.get("PORT")}/graphql`);
    });
}
bootstrap();
