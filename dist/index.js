"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const apollo_server_express_1 = require("apollo-server-express");
const graphql_tools_1 = require("graphql-tools");
const express_1 = __importDefault(require("express"));
const lib_1 = require("./lib");
require("./modules");
async function bootstrap() {
    // await createConnection(config);
    // const resolvers: IResolvers = {};
    // const typeDefs = "";
    const schema = graphql_tools_1.makeExecutableSchema({ typeDefs: lib_1.typeDefs, resolvers: lib_1.resolvers });
    const server = new apollo_server_express_1.ApolloServer({ schema });
    const app = express_1.default();
    server.applyMiddleware({ app });
    app.set("PORT", process.env.PORT || 3001);
    app.listen(app.get("PORT"), err => {
        if (err)
            return console.error("Error: " + err);
        console.log(`Running a GraphQL API server at localhost:${app.get("PORT")}/graphql`);
    });
}
bootstrap();
//# sourceMappingURL=index.js.map