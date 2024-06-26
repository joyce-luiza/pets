import { Router } from "express";
import AnimalFacade from "../../app/facades/AnimalFacade";
import AnimalController from "../../app/controllers/AnimalController";
import { multerUpload } from "../../config/multer";
import authMiddleware from "../../middlewares/auth";

const animalRoutes = Router();

const controller = new AnimalController();
const facade = new AnimalFacade(controller);

animalRoutes.post(
    "/",
    authMiddleware,
    multerUpload.array("files"),
    facade.create
);
animalRoutes.get("/table", authMiddleware, facade.findAllToTableView);
animalRoutes.get("/card/list", facade.findAllCardListView);
animalRoutes.get("/details/:id", facade.GetAnimalDetailsById);

export default animalRoutes;
