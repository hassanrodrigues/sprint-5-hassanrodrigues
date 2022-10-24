import AppDataSource from "../../data-source";
import { Property } from "../../entities/properties.entity";
import { Schedules_user_propertie } from "../../entities/schedules_user_properties.entity";
import { User } from "../../entities/user.entity";
import { AppError } from "../../errors/appError";
import { IScheduleRequest } from "../../interfaces/schedules";

const schedulesInfoRepository = AppDataSource.getRepository(
    Schedules_user_propertie
);
const usersInfoRepository = AppDataSource.getRepository(User);
const propertiesInfoRepository = AppDataSource.getRepository(Property);

export const schedulesCreateService = async (
    schedule: IScheduleRequest,
    userId: string
): Promise<Schedules_user_propertie> => {

    if (!schedule) {
        throw new AppError("Check the required fields");
    }

    const user = await usersInfoRepository.findOneBy({ id: userId });

    if (!user) {
        throw new AppError("User not found");
    }
    const hour = +schedule.hour.split(" : ")[0];

    if (hour < 8 || hour >= 18) {
        throw new AppError("Schedule during business hours");
    }
    const Property = await propertiesInfoRepository.findOneBy({
        id: schedule.propertyId,
    });

    if (!Property) {
        throw new AppError("Category not found", 404);
    }
    const scheduleAll = await schedulesInfoRepository.find();
    const scheduleExists = scheduleAll.find((schedule) => schedule);
    if (scheduleExists) {
        throw new AppError("Date or hour already exists");
    }
    //create new schudele
    const newScheduleInstance = new Schedules_user_propertie()
    const newSchedule = schedulesInfoRepository.create({
        ...newScheduleInstance,
        date: schedule.date,
        hour: schedule.hour,
        properties: Property,
        user,
    });
    await schedulesInfoRepository.save(newSchedule);

    return newSchedule;
};
export const schedulesListService = async (id: string): Promise<Property> => {
    const Property = await propertiesInfoRepository.findOne({
        where: { id },
        relations: {
            schedules: true,
        },
    });
    if (!Property) {
        throw new AppError("Property not found", 404);
    }

    return Property;
}