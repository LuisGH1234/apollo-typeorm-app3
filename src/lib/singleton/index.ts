import { DocumentNode } from "graphql";
import { IResolvers } from "graphql-tools";

const Resolvers2 = new Map();

// TODO: Change it to map object
export const resolvers: IResolvers = { Query: {}, Mutation: {} };
export const typeDefs: DocumentNode[] = [];

interface ICollect {
    constructorName: string;
    resolver: string;
    value: Function;
}

const collectMetadata = (options: ICollect) => {
    const { constructorName, resolver, value } = options;
    if (resolvers[constructorName]) resolvers[constructorName][resolver] = value;
    else {
        resolvers[constructorName] = {} as Resolver;
        resolvers[constructorName][resolver] = value;
    }
};

export const collectTypeDef = (value: DocumentNode) => typeDefs.push(value);
export const collectQuery = collectMetadata;
export const collectMutation = collectMetadata;
