import { Router } from "express";
import OrganizationMemberFacade from "../../app/facades/OrganizationMemberFacade";
import OrganizationMemberController from "../../app/controllers/OrganizationMemberController";
import { multerUpload } from "../../config/multer";
import authMiddleware from "../../middlewares/auth";
import verifyRole from "../../middlewares/verifyRole";

const organizationMemberRoutes = Router();

const controller = new OrganizationMemberController();
const facade = new OrganizationMemberFacade(controller);

organizationMemberRoutes.post("/", facade.create);
organizationMemberRoutes.get("/:id", facade.getById);
organizationMemberRoutes.get("/email/:email", facade.getByEmail);
organizationMemberRoutes.put("/", authMiddleware, facade.update);
organizationMemberRoutes.put(
    "/image",
    authMiddleware,
    multerUpload.single("file"),
    facade.updateProfileImage
);
organizationMemberRoutes.get(
    "/organization/:id",
    authMiddleware,
    facade.getMembersByOrganizationId
);
organizationMemberRoutes.put(
    "/role",
    authMiddleware,
    verifyRole,
    facade.updateMemberRole
);
organizationMemberRoutes.delete(
    "/:id",
    authMiddleware,
    verifyRole,
    facade.deleteLogicallyById
);

export default organizationMemberRoutes;
