import Sequelize, { Model } from "sequelize";

class AdopterPreference extends Model {
  static associate(model) {
    AdopterPreference.belongsTo(model.Adopter, {
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
          allowNull: false,
        },
      },
      {
        sequelize,
        tableName: "AdopterPreferences",
        modelName: "AdopterPreference",
      }
    );

    return this;
  }
}

export default AdopterPreference;
