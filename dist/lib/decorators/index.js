"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("../");
const helpers_1 = require("../helpers");
function buildResolver(name, cb) {
    if (!__1.resolvers[name]) {
        __1.resolvers[name] = {};
        console.warn(`${name} is an empty module resolver`);
    }
    else {
        if (cb)
            __1.collectTypeDef(cb(helpers_1.SDL.sdlTool));
        console.log(`${name} module resolver loaded`);
    }
}
function Resolver(options) {
    return constructor => {
        if (typeof options === "function" || !options) {
            const { name } = constructor;
            buildResolver(name, options);
        }
        else if (typeof options === "object") {
            const { name, document } = options;
            buildResolver(name, document);
            if (__1.resolvers[constructor.name]) {
                __1.resolvers[name] = __1.resolvers[constructor.name];
                delete __1.resolvers[constructor.name];
            }
        }
        else
            throw new Error("Unsupported type error");
    };
}
exports.Resolver = Resolver;
function Query() {
    return function (target, key, descriptor) {
        if (typeof key === "symbol")
            throw new Error(`GraphQl does not supports symbol`);
        else if (typeof descriptor.value === "function") {
            const { name } = target.constructor;
            __1.collectQuery({
                constructorName: name,
                resolver: key,
                value: descriptor.value
            });
        }
        else
            throw new Error(`Property ${key} in ${target.constructor.name} is not a function`);
    };
}
exports.Query = Query;
function Mutation() {
    return function (target, key, descriptor) {
        if (typeof key === "symbol")
            throw new Error(`GraphQl does not supports symbol`);
        else if (typeof descriptor.value === "function") {
            const { name } = target.constructor;
            __1.collectMutation({
                constructorName: name,
                resolver: key,
                value: descriptor.value
            });
        }
        else
            throw new Error(`Property ${key} in ${target.constructor.name} is not a function`);
    };
}
exports.Mutation = Mutation;
//# sourceMappingURL=index.js.map