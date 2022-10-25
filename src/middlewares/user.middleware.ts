import "dotenv/config";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import AppDataSource from "../data-source";
import { User } from "../entities/user.entity";

export const authUser = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    return jwt.verify(
      token as string,
      process.env.SECRET_KEY as string,
      (error: any, decoded: any) => {
        if (error) {
          return res.status(401).json({
            message: "Invalid token",
          });
        }
        req.user = {
          email: decoded.email,
          id: decoded.sub,
        };
        return next();
      }
    );
  } catch (error) {
    return res.status(401).json({ message: "Invalid Token" });
  }
};

export const isAccountExistsMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;
  const userRepository = AppDataSource.getRepository(User);
  const account = await userRepository.findOneBy({ id });

  if (!account) {
    return res.status(404).json({
      message: "Account not found",
    });
  }

  return next();
};

export const isAdminMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const email = req.user.email;
  if (!email) {
    return res.status(404).json({
      message: "Email not found",
    });
  }

  const userRepository = AppDataSource.getRepository(User);
  const user = await userRepository.findOneBy({ email });

  if (!user) {
    return res.status(404).json({
      message: "User not found",
    });
  }

  if (!user.isAdm) {
    return res.status(403).json({
      message: "Unauthorized",
    });
  }

  return next();
};

export const updateAdmin = async (req: Request, res: Response, next: NextFunction) => {
  const email = req.user.email;
  if (!email) {
    return res.status(404).json({
      message: "Email not found",
    });
  }

  const userRepository = AppDataSource.getRepository(User);
  const user = await userRepository.findOneBy({ email });

  if (!user) {
    return res.status(404).json({
      message: "User not found",
    });
  }

  if (!user.isAdm) {
    return res.status(401).json({
      message: "Forbidden",
    });
  }

  return next();
};
