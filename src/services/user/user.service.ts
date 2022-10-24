import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";
import { IUserRequest } from "../../interfaces/users";
import bcrypt from "bcrypt";
import { instanceToPlain } from "class-transformer";
import { AppError } from "../../errors/appError";

export const userCreateService = async ({
  name,
  email,
  password,
  isAdm,
}: IUserRequest): Promise<User> => {
  const userRepository = AppDataSource.getRepository(User);
  const userExists = await userRepository.findOneBy({ email });

  if (userExists) {
    throw new Error("Email already exists");
  }

  const userCreated = {
    name,
    email,
    password: await bcrypt.hash(password, 10),
    isAdm,
  }

  userRepository.create(userCreated);
  await userRepository.save(userCreated);
  //  user without password
  const { password: _, ...userWithoutPassword } = userCreated;
  return userWithoutPassword as User;

};

export const userListService = async (): Promise<User[]> => {
  const userRepository = AppDataSource.getRepository(User);
  const users = userRepository.find();

  return users;
};



export const userDeleteService = async (id: string) => {
  const userRepository = AppDataSource.getRepository(User);
  const userDeleted = await userRepository.findOneBy({ id });

  if (!userDeleted?.isActive) {
    throw new Error("Unable to delete inactive user");
  }

  userDeleted.isActive = false;
  await userRepository.save(userDeleted);

  return true;
};



export const userUpdateService = async (
  user: Partial<User>,
  id: string
): Promise<Array<string | number>> => {
  const userRepository = AppDataSource.getRepository(User);
  const allUsers = await userRepository.find();
  const accountUpdated = allUsers.find((user) => user.id === id);


  const data = Object.keys(user);
  //  verify if exist isAdm, isActive and id
  const isAdm = data.includes("isAdm");
  const isActive = data.includes("isActive");
  const isId = data.includes("id");


  if (isAdm || isActive || isId) {
    throw new AppError("Unable to update isAdm, isActive and id", 401)
    ;
  }

  await userRepository.update(accountUpdated!.id, {
    ...instanceToPlain(accountUpdated),
    ...user,
    updatedAt: new Date(),
  });


  return ["Updated!", 200];
};




