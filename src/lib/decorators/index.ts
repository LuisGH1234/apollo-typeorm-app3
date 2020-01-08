import { resolvers, collectMutation, collectQuery, collectTypeDef } from "../";
import { SDL } from "../helpers";

interface IResolverOption {
    name: string;
    document: DocumentTool;
}

function buildResolver(name: string, cb?: DocumentTool) {
    if (!resolvers[name]) {
        resolvers[name] = {} as Resolver;
        console.warn(`${name} is an empty module resolver`);
    } else {
        if (cb) collectTypeDef(cb(SDL.sdlTool));
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
            if (resolvers[constructor.name]) {
                resolvers[name] = resolvers[constructor.name];
                delete resolvers[constructor.name];
            }
        } else throw new Error("Unsupported type error");
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
                value: descriptor.value
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
                value: descriptor.value
            });
        } else throw new Error(`Property ${key} in ${target.constructor.name} is not a function`);
    };
}
