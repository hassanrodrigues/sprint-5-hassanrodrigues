import { Router } from "express";
import { propertiesCreateController, propertiesListController } from "../../controllers/properties/properties.controller";
import { authUser, isAdminMiddleware } from "../../middlewares/user.middleware";

const propertiesRoutes = Router();
propertiesRoutes.post(
    "",
    authUser,
    isAdminMiddleware,
    propertiesCreateController
);
propertiesRoutes.get("", propertiesListController);
export default propertiesRoutes;
