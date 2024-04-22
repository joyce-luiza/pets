import { Router } from "express";
import OrganizationFacade from "../../app/facades/OrganizationFacade";
import OrganizationController from "../../app/controllers/OrganizationController";
const organizationRoutes = Router();

const controller = new OrganizationController();
const facade = new OrganizationFacade(controller);

organizationRoutes.post("/", facade.create);
organizationRoutes.get("/:id", facade.getById);

export default organizationRoutes;
