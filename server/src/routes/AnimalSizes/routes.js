import { Router } from "express";
import AnimalSizeFacade from "../../app/facades/AnimalSizeFacade";
import AnimalSizeController from "../../app/controllers/AnimalSizeController";
const animalSizesRoutes = Router();

const controller = new AnimalSizeController();
const facade = new AnimalSizeFacade(controller);

animalSizesRoutes.get("/all", facade.findAll);

export default animalSizesRoutes;
