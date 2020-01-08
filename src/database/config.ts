import { ConnectionOptions } from "typeorm";

export const config: ConnectionOptions = {
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
