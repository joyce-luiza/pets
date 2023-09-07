const dotenv = require("dotenv");

dotenv.config();

module.exports = {
    dialect: process.env.DB_DIALECT,
    host: process.env.DB_HOST,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT,
    define: {
        timestamps: true,
        underscored: false,
        underscoredAll: false,
    },
    seederStorage: "sequelize",
};
