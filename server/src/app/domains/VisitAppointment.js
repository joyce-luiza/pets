export default class VisitAppointment {
    constructor({
        id = null,
        adopterId = null,
        organizationId = null,
        appointmentDateTime = new Date(),
        notes = "",
        requesterId = null,
        approverId = null,
        resultId = null,
        statusId = null,
        createdAt = new Date(),
        updatedAt = new Date(),
    } = {}) {
        this.id = id ? id : null;
        this.adopterId = adopterId;
        this.organizationId = organizationId;
        this.appointmentDateTime = new Date(appointmentDateTime);
        this.notes = notes;
        this.requesterId = requesterId;
        this.approverId = approverId;
        this.resultId = resultId;
        this.statusId = statusId;
        this.createdAt = new Date(createdAt);
        this.updatedAt = new Date(updatedAt);
    }
}
