import Sequelize, { Model } from "sequelize";
import { ANIMAL_TYPES } from "../../constants";

class AnimalType extends Model {
  static associate(model) {
    AnimalType.belongsTo(model.Status, {
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
          type: Sequelize.ENUM(...Object.keys(ANIMAL_TYPES)),
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
        tableName: "AnimalTypes",
        modelName: "AnimalType",
      }
    );

    return this;
  }
}

export default AnimalType;
