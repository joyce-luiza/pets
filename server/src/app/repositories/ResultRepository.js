import { Result } from "../../database/models";
import AbstractRepository from "../abstract/AbstractRepository";

class ResultRepository extends AbstractRepository {
    constructor() {
        super(Result);
        this.getResultTitleById = this.getResultTitleById.bind(this);
    }

    async getResultTitleById(id) {
        return (await Result.findOne({ where: { id: id } })).title;
    }
}

export default new ResultRepository();
