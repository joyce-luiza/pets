import { CustomError } from "../domains";

export default class AbstractStrategy {
    constructor() {}

    async execute(req, res) {
        throw new Error("You have to implement the method execute");
    }

    throwError(message, status) {
        throw new CustomError(message, status ? status : 500);
    }
}
