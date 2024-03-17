import Sequelize, { Model } from "sequelize";
import { ANIMAL_COLORS } from "../../constants";

class AnimalColor extends Model {
  static associate(model) {
    AnimalColor.belongsTo(model.Status, {
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
          type: Sequelize.ENUM(...Object.keys(ANIMAL_COLORS)),
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
        tableName: "AnimalColors",
        modelName: "AnimalColor",
      }
    );

    return this;
  }
}

export default AnimalColor;
