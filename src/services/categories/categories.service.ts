import AppDataSource from "../../data-source";
import { Category } from "../../entities/category.entity";
import { AppError } from "../../errors/appError";
import { ICategoryRequest } from "../../interfaces/categories";

export const categoryCreateService = async (
    category: Category
): Promise<ICategoryRequest> => {
    const categoryRepository = AppDataSource.getRepository(Category);
    const categoryExists = await categoryRepository.findOneBy(
        { name: category.name },
    )

    if (categoryExists) {
        throw new AppError('Category already exists');
    }

    const categoryCreated = categoryRepository.create({ name: category.name });

    await categoryRepository.save(categoryCreated);

    return categoryCreated;
}
export const categoryListService = async (): Promise<ICategoryRequest[]> => {
    const categoryRepository = AppDataSource.getRepository(Category);
    const categories = await categoryRepository.find();
    return categories;
}

export const categoryListPropetyService = async (id: string): Promise<Category> => {
    try {
        const categoryRepository = AppDataSource.getRepository(Category);
        const category = await categoryRepository.findOne({
            where: {
                id,
            },
            relations: {
                properties: true,
            },
        });

        if (!category) {
            throw new AppError("Category not found", 404);
        }

        return category;
    } catch (error) {
        throw new AppError("ID Invalid", 404);
    }

}