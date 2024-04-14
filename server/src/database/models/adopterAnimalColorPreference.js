import Sequelize, { Model } from "sequelize";

class AdopterAnimalColorPreference extends Model {
  static associate(model) {
    AdopterAnimalColorPreference.belongsTo(model.AdopterPreference, {
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
        animalColorId: {
          field: "animal_color_id",
          type: Sequelize.UUID,
          allowNull: false,
        },
      },
      {
        sequelize,
        tableName: "AdopterAnimalColorPreferences",
        modelName: "AdopterAnimalColorPreference",
      }
    );

    return this;
  }
}

export default AdopterAnimalColorPreference;
