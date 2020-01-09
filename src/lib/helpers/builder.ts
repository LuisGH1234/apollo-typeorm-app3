import { makeExecutableSchema } from "graphql-tools";
import { typeDefs, resolvers } from "..";

type Module = Function | FunctionConstructor | any;
interface IOptions {
    modules: Module[];
    directives?: any[];
}

function buildModules(modules: Module[]) {
    for (const Module of modules) {
        new Module();
    }
}

export function schema(options: IOptions) {
    buildModules(options.modules);
    return makeExecutableSchema({ typeDefs, resolvers: resolvers.toObject() });
}
