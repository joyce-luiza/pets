import Sequelize, { Model } from "sequelize";
import bcrypt from "bcryptjs";

class Adopter extends Model {
  static associate(model) {
    Adopter.belongsTo(model.Status, {
      foreignKey: "statusId",
      as: "status",
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
        firstName: {
          field: "first_name",
          type: Sequelize.STRING,
          allowNull: false,
        },
        lastName: {
          field: "last_name",
          type: Sequelize.STRING,
          allowNull: false,
        },
        birthDate: {
          field: "birth_date",
          type: Sequelize.DATE,
          allowNull: false,
        },
        email: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        password: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        phoneNumber: {
          field: "phone_number",
          type: Sequelize.STRING,
          allowNull: false,
        },
        statusId: {
          field: "status_id",
          type: Sequelize.UUID,
          allowNull: false,
        },
        imageUrl: {
          field: "image_url",
          type: Sequelize.STRING,
          allowNull: true,
        },
      },
      {
        sequelize,
        tableName: "Adopters",
        modelName: "Adopter",
      }
    );

    this.addHook("beforeSave", async (adopter) => {
      if (adopter.password) {
        adopter.password = await bcrypt.hash(adopter.password, 8);
      }
    });

    this.addHook("beforeBulkUpdate", async ({ attributes }) => {
      if (attributes.password) {
        attributes.password = await bcrypt.hash(attributes.password, 8);
      }
    });

    return this;
  }

  checkPassword(password) {
    return bcrypt.compare(password, this.password);
  }
}

export default Adopter;
