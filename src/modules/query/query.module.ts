import { Resolver, Query } from "../../lib";

@Resolver({
    name: "Query",
    document: tool => tool.import(__dirname, "./schema.gql")
})
export class QueryRoot {
    @Query()
    user() {
        return { id: 1 };
    }
}
