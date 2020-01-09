import { Resolver, Query } from "../../lib";
import { QueryService } from "./query.service";
import { getManager, getConnection } from "typeorm";

@Resolver({
    name: "Query",
    document: [__dirname, "./schema.gql"]
    // props: [
    //     [QueryService, [getManager()]]
    // ]
    // document: tool => tool.import(__dirname, "./schema.gql")
})
export class QueryRoot {
    // constructor(private service: QueryService) {}
    private service: QueryService = new QueryService(getManager());

    @Query()
    user() {
        return this.service.getUser(1);
    }
}
