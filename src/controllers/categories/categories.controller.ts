import { Request, Response } from "express";
import AppDataSource from "../../data-source";
import { Category } from "../../entities/category.entity";
import { categoryCreateService, categoryListPropetyService, categoryListService } from "../../services/categories/categories.service";


export const createCategoryController = async (req: Request, res: Response) => {
    const createdCategory = await categoryCreateService(req.body);

    return res.status(201).json(createdCategory);
}
export const listCategoriesController = async (req: Request, res: Response) => {
    const categories = await categoryListService();

    return res.status(200).json(categories);
}
export const categoryListPropetyController = async (req: Request, res: Response) => {
    const { id } = req.params;

    const categories = await categoryListPropetyService(id);

    return res.json(categories);
}

