import { resolvers, collectMutation, collectQuery, collectTypeDef } from "../";
import path from "path";
import { SDL } from "../helpers";

interface IResolverOption {
    name: string;
    document: DocumentTool | string[];
    props?: Array<[any, any[]]>;
}

function buildResolver(name: string, doc?: DocumentTool | string[]) {
    if (!resolvers.has(name)) {
        resolvers.set(name, {});
        console.warn(`${name} is an empty module resolver`);
    } else if (doc) {
        if (typeof doc === "function") collectTypeDef(doc(SDL.sdlTool));
        else if (Array.isArray(doc)) {
            collectTypeDef(SDL.sdlTool.import(...doc));
        }
        console.log(`${name} module resolver loaded`);
    }
}

export function Resolver(options?: IResolverOption | DocumentTool): ClassDecorator {
    return constructor => {
        if (typeof options === "function" || !options) {
            const { name } = constructor;
            buildResolver(name, options);
        } else if (typeof options === "object") {
            const { name, document } = options;
            buildResolver(name, document);
            const mayReplace = constructor.name != name;
            if (mayReplace && resolvers.has(constructor.name)) {
                const prev = resolvers.get(constructor.name);
                resolvers.set(name, prev!);
                resolvers.delete(constructor.name);
            }
        } else throw new Error("Resolver: Unsupported type error");
    };
}

export function Query(): MethodDecorator {
    return function(target, key, descriptor) {
        if (typeof key === "symbol") throw new Error(`GraphQl does not supports symbol`);
        else if (typeof descriptor.value === "function") {
            const { name } = target.constructor;
            collectQuery({
                constructorName: name,
                resolver: key as string,
                value: descriptor.value as any
            });
        } else throw new Error(`Property ${key} in ${target.constructor.name} is not a function`);
    };
}

export function Mutation(): MethodDecorator {
    return function(target, key, descriptor) {
        if (typeof key === "symbol") throw new Error(`GraphQl does not supports symbol`);
        else if (typeof descriptor.value === "function") {
            const { name } = target.constructor;
            collectMutation({
                constructorName: name,
                resolver: key as string,
                value: descriptor.value as any
            });
        } else throw new Error(`Property ${key} in ${target.constructor.name} is not a function`);
    };
}

const paramMetadatakey = Symbol("Param");
function Param(): ParameterDecorator {
    return function(target, paramName, paramIndex) {
        let existingParamParameters: number[] = Reflect.getOwnMetadata(
            paramMetadatakey,
            target,
            paramName
        );
        existingParamParameters.push(paramIndex);
        Reflect.defineMetadata(paramMetadatakey, existingParamParameters, target, paramName);
    };
}

interface IServiceOption {
    props?: any[];
}

export function Service(options?: IServiceOption) {
    return function<T extends { new (...args: any[]): {} }>(Constructor: T) {
        return class extends Constructor {
            ["nyu"] = 3;
        };
    };
}
