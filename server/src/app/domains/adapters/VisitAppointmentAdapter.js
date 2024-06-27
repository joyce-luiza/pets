export default class VisitAppointmentAdapter {
    constructor({
        id = null,
        adopterId = null,
        organizationId = null,
        appointmentDateTime = new Date(),
        notes = "",
        requesterId = null,
        approverId = null,
        organizationName = "",
        organizationEmail = "",
        adopterFirstName = "",
        adopterLastName = "",
        adopterEmail = "",
        result = "",
        status = "",
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
        this.organizationName = organizationName;
        this.organazitionEmail = organizationEmail;
        this.adopterFirstName = adopterFirstName;
        this.adopterLastName = adopterLastName;
        this.adopterEmail = adopterEmail;
        this.result = result;
        this.status = status;
        this.createdAt = new Date(createdAt);
        this.updatedAt = new Date(updatedAt);
    }
}
