import Sequelize, { Model } from "sequelize";

class OrganizationInvite extends Model {
    static associate(model) {
        OrganizationInvite.belongsTo(model.Status, {
            foreignKey: "statusId",
            as: "status",
        });

        OrganizationInvite.belongsTo(model.Organization, {
            foreignKey: "organizationId",
            as: "organization",
        });

        OrganizationInvite.belongsTo(model.OrganizationMember, {
            foreignKey: "organizationAdminId",
            as: "organizationMember",
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
                invitedEmail: {
                    field: "invited_email",
                    type: Sequelize.STRING,
                    allowNull: false,
                },
                token: {
                    field: "token",
                    type: Sequelize.STRING,
                    allowNull: false,
                },
                organizationAdminId: {
                    field: "organization_admin_id",
                    type: Sequelize.UUID,
                    allowNull: false,
                },
                organizationId: {
                    field: "organization_id",
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
                tableName: "OrganizationInvites",
                modelName: "OrganizationInvite",
            }
        );

        return this;
    }
}

export default OrganizationInvite;
