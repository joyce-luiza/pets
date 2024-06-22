import { Router } from "express";
import AuthenticationFacade from "../../app/facades/AuthenticationFacade";
import AuthenticationController from "../../app/controllers/AuthenticationController";
import authMiddleware from "../../middlewares/auth";
const authenticationRoutes = Router();

const controller = new AuthenticationController();
const facade = new AuthenticationFacade(controller);

authenticationRoutes.post("/login", facade.doLogin);
authenticationRoutes.post(
  "/verify/password",
  authMiddleware,
  facade.verifyPassword
);
authenticationRoutes.put(
  "/change/password",
  authMiddleware,
  facade.changePassword
);

export default authenticationRoutes;
