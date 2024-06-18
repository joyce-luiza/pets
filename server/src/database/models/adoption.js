import Sequelize, { Model } from "sequelize";

class Adoption extends Model {
    static associate(model) {
        Adoption.belongsTo(model.Status, {
            foreignKey: "statusId",
            as: "status",
        });
        Adoption.belongsTo(model.Adopter, {
            foreignKey: "adopterId",
            as: "adopter",
        });
        Adoption.belongsTo(model.Animal, {
            foreignKey: "animalId",
            as: "animal",
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
                    allowNull: false,
                },
                animalId: {
                    field: "animal_id",
                    type: Sequelize.UUID,
                    allowNull: false,
                },
                notes: {
                    type: Sequelize.STRING,
                    allowNull: true,
                },
                resultId: {
                    field: "result_id",
                    type: Sequelize.UUID,
                    allowNull: false,
                },
                organizationReply: {
                    field: "organization_reply",
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
                tableName: "Adoptions",
                modelName: "Adoption",
            }
        );

        return this;
    }
}

export default Adoption;
