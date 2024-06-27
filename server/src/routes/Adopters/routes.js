import { Router } from "express";
import AdopterFacade from "../../app/facades/AdopterFacade";
import AdopterController from "../../app/controllers/AdopterController";
import authMiddleware from "../../middlewares/auth";
import { multerUpload } from "../../config/multer";

const adopterRoutes = Router();

const controller = new AdopterController();
const facade = new AdopterFacade(controller);

adopterRoutes.post("/", facade.create);
adopterRoutes.get("/address", authMiddleware, facade.getAdopterAddress);
adopterRoutes.put("/address", authMiddleware, facade.updateAdopterAddress);
adopterRoutes.get("/preferences", authMiddleware, facade.getAdopterPreferences);
adopterRoutes.put(
  "/preferences",
  authMiddleware,
  facade.updateAdopterPreferences
);
adopterRoutes.get("/lifestyle", authMiddleware, facade.getAdopterLifestyle);
adopterRoutes.put("/lifestyle", authMiddleware, facade.updateAdopterLifestyle);
adopterRoutes.get("/:id", facade.getById);
adopterRoutes.get("/email/:email", facade.getByEmail);
adopterRoutes.post("/complement", authMiddleware, facade.createComplement);
adopterRoutes.delete("/:id", authMiddleware, facade.deleteLogicallyById);
adopterRoutes.put("/", authMiddleware, facade.update);
adopterRoutes.put(
  "/image",
  authMiddleware,
  multerUpload.single("file"),
  facade.updateProfileImage
);

export default adopterRoutes;
