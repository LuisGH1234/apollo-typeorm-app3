import { QueryRoot } from "./query/query.resolver";
import { User } from "./user/user.resolver";
import { GraphModule } from "../lib";

export const schema = () =>
    GraphModule.schema({
        modules: [QueryRoot, User]
    });
