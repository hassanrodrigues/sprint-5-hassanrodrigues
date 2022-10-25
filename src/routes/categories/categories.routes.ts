import { Router } from "express";
import { categoryListPropetyController, createCategoryController, listCategoriesController } from "../../controllers/categories/categories.controller";
import { authUser, isAdminMiddleware } from "../../middlewares/user.middleware";

const categoriesRouter = Router();
categoriesRouter.post("", authUser, isAdminMiddleware, createCategoryController);
categoriesRouter.get("", listCategoriesController);
categoriesRouter.get("/:id/properties", categoryListPropetyController);

export default categoriesRouter;
