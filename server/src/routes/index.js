import { Router } from "express";

import adopterRoutes from "./Adopters/routes";
import authenticationRoutes from "./Authentication/routes";
import animalTypesRoutes from "./AnimalTypes/routes";
import animalAgeGroupRoutes from "./AnimalAgeGroups/routes";
import animalSizesRoutes from "./AnimalSizes/routes";
import animalColorsRoutes from "./AnimalColors/routes";
import organizationRoutes from "./Organizations/routes";
import organizationMemberRoutes from "./OrganizationMembers/routes";
import organizationInviteRoutes from "./OrganizationInvites/routes";
import animalRoutes from "./Animals/routes";
import adoptionRoutes from "./Adoptions/routes";
import visitAppointmentRoutes from "./VisitAppointment/routes";

const routes = Router();

routes.use("/auth", authenticationRoutes);
routes.use("/adopter", adopterRoutes);
routes.use("/animalTypes", animalTypesRoutes);
routes.use("/animalAgeGroups", animalAgeGroupRoutes);
routes.use("/animalSizes", animalSizesRoutes);
routes.use("/animalColors", animalColorsRoutes);
routes.use("/organization", organizationRoutes);
routes.use("/member", organizationMemberRoutes);
routes.use("/invite", organizationInviteRoutes);
routes.use("/animals", animalRoutes);
routes.use("/adoption", adoptionRoutes);
routes.use("/visit", visitAppointmentRoutes);

export default routes;
