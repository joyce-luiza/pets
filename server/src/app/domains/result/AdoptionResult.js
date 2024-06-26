export default class AdoptionResult {
    constructor({
        id = "",
        adopterId = "",
        animalId = "",
        notes = "",
        result = "",
        organizationReply = "",
        statusId = "",
        createdAt = new Date(),
        updatedAt = new Date(),
    } = {}) {
        this.id = id;
        this.adopterId = adopterId;
        this.animalId = animalId;
        this.notes = notes;
        this.result = result;
        this.organizationReply = organizationReply;
        this.statusId = statusId;
        this.createdAt = new Date(createdAt);
        this.updatedAt = new Date(updatedAt);
    }
}
