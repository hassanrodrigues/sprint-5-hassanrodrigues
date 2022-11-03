import { Request, Response } from "express";
import { schedulesCreateService, schedulesListService } from "../../services/schedules/schedules.service";

//create schedule controller
export const schedulesCreateController = async (req: Request, res: Response) => {
    const schedule = req.body;
    const userId = req.user.id;
    const scheduleCreated = await schedulesCreateService(schedule, userId);

    return res.status(201).json({ message: "Schedule created", schedules: scheduleCreated });

}
export const schedulesListController = async (req: Request, res: Response) => {
    const id = req.params.id;
    const schedules = await schedulesListService(id);

    return res.status(200).json(schedules);
}