import Sequelize, { Model } from "sequelize";

class Animal extends Model {
  static associate(model) {
    Animal.belongsTo(model.Status, {
      foreignKey: "statusId",
      as: "status",
    });
    Animal.belongsTo(model.Organization, {
      foreignKey: "organizationId",
      as: "organization",
    });
    Animal.belongsTo(model.AnimalType, {
      foreignKey: "typeId",
      as: "type",
    });
    Animal.belongsTo(model.AnimalSize, {
      foreignKey: "sizeId",
      as: "size",
    });
    Animal.belongsTo(model.AnimalColor, {
      foreignKey: "colorId",
      as: "color",
    });
    Animal.belongsTo(model.AnimalAgeGroup, {
      foreignKey: "ageGroupId",
      as: "ageGroup",
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
        name: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        description: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        medicalInformation: {
          field: "medical_information",
          type: Sequelize.STRING,
          allowNull: false,
        },
        sex: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        birthDate: {
          field: "birth_date",
          type: Sequelize.DATE,
          allowNull: false,
        },
        organizationId: {
          field: "organization_id",
          type: Sequelize.UUID,
          allowNull: false,
        },
        typeId: {
          field: "type_id",
          type: Sequelize.UUID,
          allowNull: false,
        },
        sizeId: {
          field: "size_id",
          type: Sequelize.UUID,
          allowNull: false,
        },
        colorId: {
          field: "color_id",
          type: Sequelize.UUID,
          allowNull: false,
        },
        ageGroupId: {
          field: "age_group_id",
          type: Sequelize.UUID,
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
        tableName: "Animals",
        modelName: "Animal",
      }
    );

    return this;
  }
}

export default Animal;
