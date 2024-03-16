import Sequelize, { Model } from "sequelize";
import { ANIMAL_SIZES } from "../../constants";

class AnimalSize extends Model {
  static associate(model) {
    AnimalSize.belongsTo(model.Status, {
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
          type: Sequelize.ENUM(...Object.keys(ANIMAL_SIZES)),
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
        tableName: "AnimalSizes",
        modelName: "AnimalSize",
      }
    );

    return this;
  }
}

export default AnimalSize;
