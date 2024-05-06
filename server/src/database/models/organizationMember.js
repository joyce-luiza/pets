import Sequelize, { Model } from "sequelize";
import bcrypt from "bcryptjs";

class OrganizationMember extends Model {
    static associate(model) {
        OrganizationMember.belongsTo(model.Status, {
            foreignKey: "statusId",
            as: "status",
        });
    }

    static associate(model) {
        OrganizationMember.belongsTo(model.Organization, {
            foreignKey: "organizationId",
            as: "organization",
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
                role: {
                    type: Sequelize.STRING,
                    allowNull: false,
                },
                firstName: {
                    field: "first_name",
                    type: Sequelize.STRING,
                    allowNull: false,
                },
                lastName: {
                    field: "last_name",
                    type: Sequelize.STRING,
                    allowNull: false,
                },
                birthDate: {
                    field: "birth_date",
                    type: Sequelize.DATE,
                    allowNull: false,
                },
                email: {
                    type: Sequelize.STRING,
                    allowNull: false,
                },
                password: {
                    type: Sequelize.STRING,
                    allowNull: false,
                },
                phoneNumber: {
                    field: "phone_number",
                    type: Sequelize.STRING,
                    allowNull: false,
                },
                statusId: {
                    field: "status_id",
                    type: Sequelize.UUID,
                    allowNull: false,
                },
                organizationId: {
                    field: "organization_id",
                    type: Sequelize.UUID,
                    allowNull: false,
                },
            },
            {
                sequelize,
                tableName: "OrganizationMembers",
                modelName: "OrganizationMember",
            }
        );

        this.addHook("beforeSave", async (member) => {
            if (member.password) {
                member.password = await bcrypt.hash(member.password, 8);
            }
        });

        this.addHook("beforeBulkUpdate", async ({ attributes }) => {
            if (attributes.password) {
                attributes.password = await bcrypt.hash(attributes.password, 8);
            }
        });

        return this;
    }

    checkPassword(password) {
        return bcrypt.compare(password, this.password);
    }
}

export default OrganizationMember;
