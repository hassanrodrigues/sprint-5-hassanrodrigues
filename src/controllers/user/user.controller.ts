import { instanceToPlain } from "class-transformer";
import { Request, Response } from "express";
import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";
import { userCreateService, userDeleteService, userListService, userUpdateService } from "../../services/user/user.service";

export const userCreateController = async (req: Request, res: Response) => {
  try {
    const { name, email, password, isAdm } = req.body;
    const userCreated = await userCreateService({ name, email, password, isAdm });

    return res.status(201).json(instanceToPlain(userCreated));
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({
        error: error.name,
        message: error.message,
      });
    }
  }
};

export const userListController = async (req: Request, res: Response) => {
  try {
    const allUsers = await userListService();

    return res.json(instanceToPlain(allUsers));
  } catch (error) {
    if (error instanceof Error) {
      return res.status(401).json({
        error: error.name,
        message: error.message,
      });
    }
  }
};

export const userDeleteController = async (req: Request, res: Response) => {
  try {
    const email = req.user.email;
    if (!email) {
      return res.status(404).json({
        message: "Email not found",
      });
    }
    const idReq = req.user.id;

    if (!idReq) {
      return res.status(404).json({
        message: "Invalid id",
      });
    }
    const { id } = req.params;
    await userDeleteService(id);


    return res.status(204).json({ message: "User deleted!" });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({
        error: error.name,
        message: error.message,
      });
    }
  }
};

export const userUpdateController = async (req: Request, res: Response) => {

  const dataUser = req.body

  const { id } = req.params;
  const [message, status] = await userUpdateService(dataUser, id);

  return res.status(status as number).json(message);

};
