import { Router } from "express";
import AnimalTypeFacade from "../../app/facades/AnimalTypeFacade";
import AnimalTypeController from "../../app/controllers/AnimalTypeController";
const animalTypesRoutes = Router();

const controller = new AnimalTypeController();
const facade = new AnimalTypeFacade(controller);

animalTypesRoutes.get("/all", facade.findAll);

export default animalTypesRoutes;
