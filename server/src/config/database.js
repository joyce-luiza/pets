const dotenv = require("dotenv");
dotenv.config();

const environment = process.env.NODE_ENV || "development";

const config = {
    development: {
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
    },
    test: {
        dialect: process.env.TEST_DB_DIALECT,
        host: process.env.TEST_DB_HOST,
        username: process.env.TEST_DB_USERNAME,
        password: process.env.TEST_DB_PASSWORD,
        database: process.env.TEST_DB_DATABASE,
        port: process.env.TEST_DB_PORT,
        define: {
            timestamps: true,
            underscored: true,
            underscoredAll: false,
        },
        seederStorage: "sequelize",
        logging: false,
    },
};

module.exports = config[environment];
