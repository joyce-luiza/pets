export default class Adoption {
    constructor({
        id = "",
        adopterId = "",
        animalId = "",
        notes = "",
        resultId = "",
        organizationReply = "",
        statusId = "",
        createdAt = new Date(),
        updatedAt = new Date(),
    } = {}) {
        this.id = id;
        this.adopterId = adopterId;
        this.animalId = animalId;
        this.notes = notes;
        this.resultId = resultId;
        this.organizationReply = organizationReply;
        this.statusId = statusId;
        this.createdAt = new Date(createdAt);
        this.updatedAt = new Date(updatedAt);
    }
}
