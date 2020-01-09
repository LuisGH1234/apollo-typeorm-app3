import { DocumentNode } from "graphql";
import { ResolverFn } from "apollo-server-express";

class MapResolver extends Map<string, Resolver> {
    constructor(entries?: ReadonlyArray<readonly [string, Resolver]>) {
        super(entries);
        this.set("Query", {});
        this.set("Mutation", {});
    }

    toObject(): ResolverRoot {
        const obj: ResolverRoot = {};
        for (const [key, value] of this.entries()) {
            obj[key] = value;
        }
        return obj;
    }
}

export const resolvers = new MapResolver();

// TODO: Change it to map object
// export const resolvers: IResolvers = { Query: {}, Mutation: {} };
export const typeDefs: DocumentNode[] = [];

interface ICollect {
    constructorName: string;
    resolver: string;
    value: ResolverFn;
}

const collectMetadata = (options: ICollect) => {
    const { constructorName, resolver, value } = options;
    if (resolvers.has(constructorName)) {
        const propModule = resolvers.get(constructorName);
        propModule![resolver] = value;
    } else {
        const propModule: Resolver = { [resolver]: value };
        resolvers.set(constructorName, propModule);
    }
};

export const collectTypeDef = (value: DocumentNode) => typeDefs.push(value);
export const collectQuery = collectMetadata;
export const collectMutation = collectMetadata;
