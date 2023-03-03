import { Router } from "express";
import {
  userCreateController,
  userDeleteController,
  userListController,
  userUpdateController,
} from "../../controllers/user/user.controller";
import { authUser, isAccountExistsMiddleware, isAdminMiddleware, updateAdmin } from "../../middlewares/user.middleware";

const userRoutes = Router();

userRoutes.post("", userCreateController);
userRoutes.get("", authUser, isAdminMiddleware, userListController);
userRoutes.delete("/:id", authUser, isAdminMiddleware, isAccountExistsMiddleware, userDeleteController);
userRoutes.patch("/:id", authUser, updateAdmin, isAccountExistsMiddleware, userUpdateController);

export default userRoutes;