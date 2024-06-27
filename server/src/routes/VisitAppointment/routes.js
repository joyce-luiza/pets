import { Router } from "express";
import VisitAppointmentFacade from "../../app/facades/VisitAppointmentFacade";
import VisitAppointmentController from "../../app/controllers/VisitAppointmentController";
import authMiddleware from "../../middlewares/auth";
const visitAppointmentRoutes = Router();

const controller = new VisitAppointmentController();
const facade = new VisitAppointmentFacade(controller);

visitAppointmentRoutes.post("/", authMiddleware, facade.create);
visitAppointmentRoutes.put("/", authMiddleware, facade.update);
visitAppointmentRoutes.get("/table", authMiddleware, facade.findAllToTableView);

export default visitAppointmentRoutes;
