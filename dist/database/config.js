"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = {
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "root",
    database: "apollo-typeorm",
    synchronize: true,
    logging: false,
    entities: ["dist/database/entity/**/*.js"]
};
//# sourceMappingURL=config.js.map