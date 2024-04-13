import Sequelize, { Model } from "sequelize";

class AdopterAnimalSizePreference extends Model {
  static associate(model) {
    AdopterAnimalSizePreference.belongsTo(model.AdopterPreference, {
      foreignKey: "adopterPreferenceId",
      as: "adopterPreference",
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
        adopterPreferenceId: {
          field: "adopter_preference_id",
          type: Sequelize.UUID,
          allowNull: false,
        },
        animalSizeId: {
          field: "animal_size_id",
          type: Sequelize.UUID,
          allowNull: false,
        },
      },
      {
        sequelize,
        tableName: "AdopterAnimalSizePreferences",
        modelName: "AdopterAnimalSizePreference",
      }
    );

    return this;
  }
}

export default AdopterAnimalSizePreference;
