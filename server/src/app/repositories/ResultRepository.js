import { Result } from "../../database/models";
import AbstractRepository from "../abstract/AbstractRepository";

class ResultRepository extends AbstractRepository {
    constructor() {
        super(Result);
    }
}

export default new ResultRepository();
