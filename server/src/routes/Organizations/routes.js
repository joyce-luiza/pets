import { Router } from "express";
import OrganizationFacade from "../../app/facades/OrganizationFacade";
import OrganizationController from "../../app/controllers/OrganizationController";
import authMiddleware from "../../middlewares/auth";
import verifyRole from "../../middlewares/verifyRole";
const organizationRoutes = Router();

const controller = new OrganizationController();
const facade = new OrganizationFacade(controller);

organizationRoutes.post("/", facade.create);
organizationRoutes.get("/:id", facade.getById);
organizationRoutes.get("/cnpj/:cnpj", facade.getByCNPJ);
organizationRoutes.get("/complement/:id", facade.getComplement);
organizationRoutes.put("/", authMiddleware, verifyRole, facade.update);
organizationRoutes.put(
    "/address",
    authMiddleware,
    verifyRole,
    facade.updateAddress
);
organizationRoutes.get("/:id", facade.getById);
organizationRoutes.delete(
    "/:id",
    authMiddleware,
    verifyRole,
    facade.deleteLogicallyById
);

export default organizationRoutes;
