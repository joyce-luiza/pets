import { Router } from "express";
import AnimalAgeGroupFacade from "../../app/facades/AnimalAgeGroupFacade";
import AnimalAgeGroupController from "../../app/controllers/AnimalAgeGroupController";
const animalAgeGroupRoutes = Router();

const controller = new AnimalAgeGroupController();
const facade = new AnimalAgeGroupFacade(controller);

animalAgeGroupRoutes.get("/all", facade.findAll);

export default animalAgeGroupRoutes;
