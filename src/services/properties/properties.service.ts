import AppDataSource from "../../data-source";
import { Adress } from "../../entities/adresses.entity";
import { Category } from "../../entities/category.entity";
import { Property } from "../../entities/properties.entity";
import { AppError } from "../../errors/appError";
import { IPropertyRequest } from "../../interfaces/properties";

//create property, adress, category getRepository
const propertiesInfoRepository = AppDataSource.getRepository(Property);
const adressInfoRepository = AppDataSource.getRepository(Adress);
const categoryInfoRepository = AppDataSource.getRepository(Category);

export const propertyCreateService = async (propertie: IPropertyRequest): Promise<Property> => {

    if (!propertie) {
        throw new AppError("Check the required fields");
    }

    const category = await categoryInfoRepository.findOne({
        where: {
            id: propertie.categoryId,
        },
    });
    if (!category) {
        throw new AppError("Category not found", 404);
    }
    const adressesExists = await adressInfoRepository.findOne({
        where: propertie.address,
    });

    if (adressesExists) {
        throw new AppError("Adresses already exists");
    }
    if (propertie.address.zipCode.length > 8) {
        throw new AppError("Invalid Zip Code!");
    }

    if (propertie.address.state.length > 2) {
        throw new AppError("Invalid State");
    }

    const newAdresses = adressInfoRepository.create(propertie.address);
    await adressInfoRepository.save(newAdresses);

    const newPropertie = propertiesInfoRepository.create({
        ...propertie,
        address: newAdresses,
        category,
    });
    const propertyExists = await propertiesInfoRepository.findOne({
        where: {
            value: propertie.value,
        },
    });
    if (propertyExists) {
        throw new AppError("Property already exists");
    }
    await propertiesInfoRepository.save(newPropertie);

    return newPropertie;
}

export const propertiesListService = async (): Promise<Property[]> => {
    const properties = await propertiesInfoRepository.find({
        relations: {
            address: true,
            category: true,
        },
    });
    return properties;
}