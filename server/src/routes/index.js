import { Router } from "express";
import adopterRoutes from "./Adopters/routes";
import authenticationRoutes from "./Authentication/routes";
import animalTypesRoutes from "./AnimalTypes/routes";
import animalAgeGroupRoutes from "./AnimalAgeGroups/routes";
import animalSizesRoutes from "./AnimalSizes/routes";
import animalColorsRoutes from "./AnimalColors/routes";
import organizationRoutes from "./Organizations/routes";

const routes = Router();

routes.use("/auth", authenticationRoutes);
routes.use("/adopter", adopterRoutes);
routes.use("/animalTypes", animalTypesRoutes);
routes.use("/animalAgeGroups", animalAgeGroupRoutes);
routes.use("/animalSizes", animalSizesRoutes);
routes.use("/animalColors", animalColorsRoutes);
routes.use("/organization", organizationRoutes);

export default routes;
