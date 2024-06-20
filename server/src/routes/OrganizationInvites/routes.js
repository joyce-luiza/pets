import { Router } from "express";
import OrganizationInviteFacade from "../../app/facades/OrganizationInviteFacade";
import OrganizationInviteController from "../../app/controllers/OrganizationInviteController";
import authMiddleware from "../../middlewares/auth";
import verifyRole from "../../middlewares/verifyRole";
const organizationInvitesRoutes = Router();

const controller = new OrganizationInviteController();
const facade = new OrganizationInviteFacade(controller);

organizationInvitesRoutes.post("/", authMiddleware, verifyRole, facade.create);
organizationInvitesRoutes.get("/:id", facade.getById);
organizationInvitesRoutes.get("/token/:token", facade.validateToken);

export default organizationInvitesRoutes;
