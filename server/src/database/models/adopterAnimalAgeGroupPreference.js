import Sequelize, { Model } from "sequelize";

class AdopterAnimalAgeGroupPreference extends Model {
  static associate(model) {
    AdopterAnimalAgeGroupPreference.belongsTo(model.AdopterPreference, {
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
        animalAgeGroupId: {
          field: "animal_age_group_id",
          type: Sequelize.UUID,
          allowNull: false,
        },
      },
      {
        sequelize,
        tableName: "AdopterAnimalAgeGroupPreferences",
        modelName: "AdopterAnimalAgeGroupPreference",
      }
    );

    return this;
  }
}

export default AdopterAnimalAgeGroupPreference;
