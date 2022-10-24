import { Request, Response } from "express";
import { userSessionService } from "../../services/session/userSession.service";

const userLoginController = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const token = await userSessionService({ email, password });

    return res.status(200).json({ token });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(403).json({
        error: error.name,
        message: error.message,
      });
    }
  }
};

export default userLoginController;
