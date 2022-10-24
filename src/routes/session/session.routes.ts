import { Router } from "express";
import userLoginController from "../../controllers/session/session.controller";

const sessionRouter = Router();

sessionRouter.post("", userLoginController);

export default sessionRouter;
