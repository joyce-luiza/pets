import Sequelize, { Model } from "sequelize";

class AdopterAnimalSexPreference extends Model {
  static associate(model) {
    AdopterAnimalSexPreference.belongsTo(model.AdopterPreference, {
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
        animalSex: {
          field: "animal_sex",
          type: Sequelize.STRING,
          allowNull: false,
        },
      },
      {
        sequelize,
        tableName: "AdopterAnimalSexPreferences",
        modelName: "AdopterAnimalSexPreference",
      }
    );

    return this;
  }
}

export default AdopterAnimalSexPreference;
