const path = require("path");

const dotenv = require("dotenv");
dotenv.config({
  path:
    process.env.NODE_ENV === "development"
      ? path.resolve(__dirname, "../../.env")
      : process.env.NODE_ENV === "test"
      ? path.resolve(__dirname, "../../.env.test")
      : process.env.NODE_ENV === "production"
      ? path.resolve(__dirname, "../../.env.prod")
      : path.resolve(__dirname, "../../.env"),
});

module.exports = {
  dialect: process.env.DB_DIALECT,
  host: process.env.DB_HOST,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port: process.env.DB_PORT,
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: false,
  },
  seederStorage: "sequelize",
  logging: false,
};
