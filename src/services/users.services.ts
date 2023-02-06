import AppDataSource from "../data-source";
import { User } from "../entities/user.entity";
import { IUserRequest, IUserUpdate } from "../interfaces/users";
import {v4 as uuidv4} from "uuid";
import {hash} from "bcryptjs";
import AppError from "../errors/AppError";

const createUserService = async ({
    fullname, email, phone, password, isAdm
}: IUserRequest) => {
    const userRepository = AppDataSource.getRepository(User);
    const checkEmailIsInUse = await userRepository.findOneBy({email: email});

    if (checkEmailIsInUse) {
        throw new AppError("Email is already being used.");
    }

    if (!password) {
        throw new AppError("Password is missing");
    }

    const hashPassword = await hash(password, 10);

    const user = userRepository.create({
        fullname,
        email,
        phone,
        isAdm,
        isActive: true,
        id: uuidv4(),
        password: hashPassword
    });

    await userRepository.save(user);
    return user
};

const getUsersService = async (): Promise<User[]> => {
    const userRepository = AppDataSource.getRepository(User)
    const users = await userRepository.find();

    if (!users.length) {
        throw new AppError("There's no available users.");
    }

    return users
}

const getOneUserService = async (id: string) => {
    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOneBy({id});

    if (!user) {
        throw new AppError("User not found", 404);
    }

    if (!user.isActive) {
        throw new AppError("User is not active", 400);
    }

    return user;
}

const updateUserService = async (
    { fullname, email, password, phone }: IUserUpdate, id: string): Promise <User | Array<string | number>> => {
        const userRepository = AppDataSource.getRepository(User);
        const findUser = await userRepository.findOneBy({
            id,
        });

        if (!findUser) {
            throw new AppError("User not found", 404);
        }

        await userRepository.update(id, {
            fullname: fullname ? fullname : findUser.fullname,
            email: email ? email : findUser.email,
            phone: phone ? phone : findUser.phone,
            password: password ? await hash(password, 10) : findUser.password,
        });

        const user = await userRepository.findOneBy({id});
        return user!;
}

const softDeleteUserService = async (id: string) => {
    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOneBy({id});

    if (!user) {
        throw new AppError("User not found", 404);
    }

    if (!user.isActive) {
        throw new AppError("User already inactive", 400);
    }

    await userRepository.update(id, {isActive: false});
    return user;
}


export { createUserService, getOneUserService, getUsersService, updateUserService, softDeleteUserService };
