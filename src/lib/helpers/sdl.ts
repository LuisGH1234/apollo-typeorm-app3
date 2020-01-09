import { gql } from "apollo-server-express";
import * as fs from "fs";
import * as path from "path";

export const sdlTool: ITool = {
    import: (...paths: string[]) => {
        const file = fs.readFileSync(path.join(...paths));
        return gql(file.toString());
    }
};
