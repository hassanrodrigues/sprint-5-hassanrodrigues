import { Router } from "express";
import { schedulesCreateController, schedulesListController } from "../../controllers/schedules/schudules.controller";
import { authUser, isAdminMiddleware } from "../../middlewares/user.middleware";

const schedulesRoutes = Router();

schedulesRoutes.post("/", authUser, schedulesCreateController)
schedulesRoutes.get("/properties/:id", authUser, isAdminMiddleware, schedulesListController)

export default schedulesRoutes;
