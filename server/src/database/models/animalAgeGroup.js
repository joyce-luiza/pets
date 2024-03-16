import Sequelize, { Model } from "sequelize";
import { ANIMAL_AGE_GROUPS } from "../../constants";

class AnimalAgeGroup extends Model {
  static associate(model) {
    AnimalAgeGroup.belongsTo(model.Status, {
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
          type: Sequelize.ENUM(...Object.keys(ANIMAL_AGE_GROUPS)),
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
        tableName: "AnimalAgeGroups",
        modelName: "AnimalAgeGroup",
      }
    );

    return this;
  }
}

export default AnimalAgeGroup;
