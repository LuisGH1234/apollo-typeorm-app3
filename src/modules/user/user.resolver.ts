import { Resolver, Query } from "../../lib";

@Resolver()
export class User {
    @Query()
    books() {
        return [{ title: "book1" }, { title: "book2" }];
    }
}
