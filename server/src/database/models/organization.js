import Sequelize, { Model } from "sequelize";

class Organization extends Model {
    static associate(model) {
        Organization.belongsTo(model.Status, {
            foreignKey: "statusId",
            as: "status",
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
                name: {
                    type: Sequelize.STRING,
                    allowNull: false,
                },
                cnpj: {
                    type: Sequelize.STRING,
                    allowNull: false,
                },
                description: {
                    type: Sequelize.STRING,
                    allowNull: false,
                },
                email: {
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
            },
            {
                sequelize,
                tableName: "Organizations",
                modelName: "Organization",
            }
        );

        return this;
    }
}

export default Organization;
