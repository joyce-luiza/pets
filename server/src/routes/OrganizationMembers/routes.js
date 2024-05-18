import { Router } from "express";
import OrganizationMemberFacade from "../../app/facades/OrganizationMemberFacade";
import OrganizationMemberController from "../../app/controllers/OrganizationMemberController";
const organizationMemberRoutes = Router();

const controller = new OrganizationMemberController();
const facade = new OrganizationMemberFacade(controller);

organizationMemberRoutes.post("/", facade.create);
organizationMemberRoutes.get("/:id", facade.getById);
organizationMemberRoutes.get("/email/:email", facade.getByEmail);

export default organizationMemberRoutes;
