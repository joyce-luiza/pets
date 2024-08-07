import Sequelize, { Model } from "sequelize";

class Address extends Model {
  static associate(model) {
    Address.belongsTo(model.Adopter, {
      foreignKey: "adopterId",
      as: "adopter",
    });
  }

  static associate(model) {
    Address.belongsTo(model.Organization, {
      foreignKey: "organizationId",
      as: "organization",
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
        organizationId: {
          field: "organization_id",
          type: Sequelize.UUID,
          allowNull: true,
        },
        street: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        city: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        state: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        cep: {
          type: Sequelize.STRING(8),
          allowNull: false,
        },
        residenceType: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        complement: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        number: {
          type: Sequelize.STRING,
          allowNull: false,
        },
      },
      {
        sequelize,
        tableName: "Addresses",
        modelName: "Address",
      }
    );

    return this;
  }
}

export default Address;
