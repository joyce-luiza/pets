import Sequelize, { Model } from "sequelize";
import { RESULTS } from "../../constants";

class Result extends Model {
    static associate(model) {
        Result.belongsTo(model.Status, {
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
                title: {
                    type: Sequelize.ENUM(...Object.keys(RESULTS)),
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
                tableName: "Results",
                modelName: "Result",
            }
        );

        return this;
    }
}

export default Result;
