import { Sequelize } from "sequelize";
import dbConfig from "../config/database";
import cls from "cls-hooked";

// Limpa o banco em caso de erros
const namespace = cls.createNamespace("my-transaction-ns");
Sequelize.useCLS(namespace);

// Models
import {
    Adopter,
    Status,
    AnimalType,
    AnimalAgeGroup,
    AnimalSize,
    AnimalColor,
    AdopterPreference,
    AdopterAnimalTypePreference,
    AdopterAnimalSizePreference,
    AdopterAnimalColorPreference,
    AdopterAnimalAgeGroupPreference,
    Address,
    Lifestyle,
    Organization,
    OrganizationMember,
    OrganizationInvite,
    Animal,
    AnimalFile,
} from "./models";

const models = [
    Status,
    Adopter,
    AnimalType,
    AnimalAgeGroup,
    AnimalSize,
    AnimalColor,
    AdopterPreference,
    AdopterAnimalTypePreference,
    AdopterAnimalSizePreference,
    AdopterAnimalColorPreference,
    AdopterAnimalAgeGroupPreference,
    Address,
    Lifestyle,
    Organization,
    OrganizationMember,
    OrganizationInvite,
    Animal,
    AnimalFile,
];

class Database {
    constructor() {
        this.init();
    }

    init() {
        this.connection = new Sequelize(dbConfig);
        console.log("Conexão com o banco de dados realizada com sucesso!");

        models
            .map((model) => model.init(this.connection))
            .map(
                (model) =>
                    model.associate && model.associate(this.connection.models)
            );
    }
}

export default new Database();
