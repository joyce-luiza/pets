import Sequelize, { Model } from "sequelize";

class VisitAppointment extends Model {
    static associate(model) {
        VisitAppointment.belongsTo(model.Adopter, {
            foreignKey: "adopterId",
            as: "adopter",
        });

        VisitAppointment.belongsTo(model.Organization, {
            foreignKey: "organizationId",
            as: "organization",
        });

        VisitAppointment.belongsTo(model.Status, {
            foreignKey: "statusId",
            as: "status",
        });

        VisitAppointment.belongsTo(model.Result, {
            foreignKey: "resultId",
            as: "result",
        });
    }
    static init(sequelize) {
        super.init(
            {
                id: {
                    type: Sequelize.UUID,
                    defaultValue: Sequelize.UUIDV4,
                    primaryKey: true,
                    autoIncrement: false,
                    allowNull: false,
                },
                adopterId: {
                    field: "adopter_id",
                    type: Sequelize.UUID,
                    allowNull: true,
                },
                organizationId: {
                    field: "organization_id",
                    type: Sequelize.UUID,
                    allowNull: true,
                },
                appointmentDateTime: {
                    field: "appointment_date_time",
                    type: Sequelize.DATE,
                    allowNull: false,
                },
                notes: {
                    type: Sequelize.STRING,
                    allowNull: true,
                },
                requesterId: {
                    type: Sequelize.UUID,
                    allowNull: false,
                },
                approverId: {
                    type: Sequelize.UUID,
                    allowNull: true,
                },
                resultId: {
                    field: "result_id",
                    type: Sequelize.UUID,
                    allowNull: false,
                },
                statusId: {
                    field: "status_id",
                    type: Sequelize.UUID,
                    allowNull: false,
                },
            },
            {
                sequelize,
                modelName: "VisitAppointment",
                tableName: "VisitAppointments",
            }
        );
        return this;
    }
}

export default VisitAppointment;
