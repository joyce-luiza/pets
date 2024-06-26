export default class AdoptionAdapter {
    constructor({
        id,
        animalname,
        type,
        adopterid,
        adopterfirstname,
        adopterlastname,
        adopteremail,
        result,
        status,
        createdAt = new Date(),
    } = {}) {
        this.id = id;
        this.animalName = animalname;
        this.type = type;
        this.adopterId = adopterid;
        this.adopterFirstName = adopterfirstname;
        this.adopterLastName = adopterlastname;
        this.adopterEmail = adopteremail;
        this.result = result;
        this.status = status;
        this.createdAt = new Date(createdAt);
    }
}
