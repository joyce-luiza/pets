import Sequelize, { Model } from "sequelize";

class AnimalFile extends Model {
  static associate(model) {
    AnimalFile.belongsTo(model.Animal, {
      foreignKey: "animalId",
      as: "animal",
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
        fileUrl: {
          field: "file_url",
          type: Sequelize.STRING,
          allowNull: false,
        },
        animalId: {
          field: "animal_id",
          type: Sequelize.STRING,
          allowNull: false,
        },
      },
      {
        sequelize,
        tableName: "AnimalFiles",
        modelName: "AnimalFile",
      }
    );

    return this;
  }
}

export default AnimalFile;
