import { Router } from "express";
import AnimalColorFacade from "../../app/facades/AnimalColorFacade";
import AnimalColorController from "../../app/controllers/AnimalColorController";
const animalColorsRoutes = Router();

const controller = new AnimalColorController();
const facade = new AnimalColorFacade(controller);

animalColorsRoutes.get("/all", facade.findAll);

export default animalColorsRoutes;
