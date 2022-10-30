import { Request, Response } from "express";
import { propertiesListService, propertyCreateService } from "../../services/properties/properties.service";

export const propertiesCreateController = async (req: Request, res: Response) => {

    const propertie = req.body;
    const propertyCreated = await propertyCreateService(propertie);

    return res.status(201).json(propertyCreated);
}
export const propertiesListController = async (req: Request, res: Response) => {
    const properties = await propertiesListService();

    return res.json(properties);
};