import { EntityManager } from "typeorm";
import { User } from "../../database/entity";

export class QueryService {
    constructor(private manager: EntityManager) {}

    getUser(id: number) {
        const userRepo = this.manager.getRepository(User);
        return userRepo.findOne(id);
    }
}
