import { ResolverFn } from "apollo-server-express";
import { DocumentNode } from "graphql";

declare global {
    interface ITool {
        import: (...paths: string[]) => DocumentNode;
    }

    type DocumentTool = (tools: ITool) => DocumentNode;

    type MethodResolverDecorator = (
        target: Object,
        propertyKey: string | symbol,
        descriptor: TypedPropertyDescriptor<Resolver>
    ) => TypedPropertyDescriptor<Resolver> | void;

    interface Resolver {
        [key: string]: ResolverFn;
    }

    interface ResolverRoot {
        [key: string]: Resolver;
    }

    interface Schema {
        Query: Resolver;
        Mutation: Resolver;
    }
}
