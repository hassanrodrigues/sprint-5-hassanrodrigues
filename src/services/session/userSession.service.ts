import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";
import { IUserLogin } from "../../interfaces/users";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config";

export const userSessionService = async ({
  email,
  password,
}: IUserLogin): Promise<string> => {
  const userRepository = AppDataSource.getRepository(User);
  const user = await userRepository.findOneBy({ email });

  if (!user) {
    throw new Error("Password / Account is incorrect");
  }

  if (!user.password) {
    throw new Error("Password / Account is incorrect");
  }

  if (!bcrypt.compareSync(password, user.password)) {
    throw new Error("Wrong email/password");
  }

  const token = jwt.sign({ email: email }, String(process.env.SECRET_KEY), {
    expiresIn: "24h",
    subject: user.id,
  });

  return token;
};

