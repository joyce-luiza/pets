import { Router } from "express";
import AdoptionFacade from "../../app/facades/AdoptionFacade";
import AdoptionController from "../../app/controllers/AdoptionController";
import authMiddleware from "../../middlewares/auth";
const adoptionRoutes = Router();

const controller = new AdoptionController();
const facade = new AdoptionFacade(controller);

adoptionRoutes.post("/", authMiddleware, facade.create);
adoptionRoutes.get("/table", authMiddleware, facade.findAllToTableView);
adoptionRoutes.get("/:id", authMiddleware, facade.getById);
adoptionRoutes.put("/", authMiddleware, facade.update);
adoptionRoutes.get("/adopter/:id", facade.getByAdopterId);
adoptionRoutes.get(
    "/verify/:id",
    authMiddleware,
    facade.verifyAdoptionInProgress
);

export default adoptionRoutes;
