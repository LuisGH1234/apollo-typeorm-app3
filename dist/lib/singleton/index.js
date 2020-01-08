"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvers = { Query: {}, Mutation: {} };
exports.typeDefs = [];
const collectMetadata = (options) => {
    const { constructorName, resolver, value } = options;
    if (exports.resolvers[constructorName])
        exports.resolvers[constructorName][resolver] = value;
    else {
        exports.resolvers[constructorName] = {};
        exports.resolvers[constructorName][resolver] = value;
    }
};
exports.collectTypeDef = (value) => exports.typeDefs.push(value);
exports.collectQuery = collectMetadata;
exports.collectMutation = collectMetadata;
//# sourceMappingURL=index.js.map