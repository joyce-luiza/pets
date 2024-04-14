import Sequelize, { Model } from "sequelize";

class Lifestyle extends Model {
  static associate(model) {
    Lifestyle.belongsTo(model.Adopter, {
      foreignKey: "adopterId",
      as: "adopter",
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
        totalPets: {
          field: "total_pets",
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        routine: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        travelFrequency: {
          field: "travel_frequency",
          type: Sequelize.STRING,
          allowNull: false,
        },
      },
      {
        sequelize,
        tableName: "Lifestyles",
        modelName: "Lifestyle",
      }
    );

    return this;
  }
}

export default Lifestyle;
