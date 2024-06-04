import { Router } from "express";
import AnimalFacade from "../../app/facades/AnimalFacade";
import AnimalController from "../../app/controllers/AnimalController";
import { multerUpload } from "../../config/multer";

const animalRoutes = Router();

const controller = new AnimalController();
const facade = new AnimalFacade(controller);

animalRoutes.post("/", multerUpload.array("files"), facade.create);
animalRoutes.get("/table", facade.findAllToTableView);

export default animalRoutes;
