import Sequelize, { Model } from "sequelize";

class AdopterAnimalTypePreference extends Model {
  static associate(model) {
    AdopterAnimalTypePreference.belongsTo(model.AdopterPreference, {
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
        animalTypeId: {
          field: "animal_type_id",
          type: Sequelize.UUID,
          allowNull: false,
        },
      },
      {
        sequelize,
        tableName: "AdopterAnimalTypePreferences",
        modelName: "AdopterAnimalTypePreference",
      }
    );

    return this;
  }
}

export default AdopterAnimalTypePreference;
