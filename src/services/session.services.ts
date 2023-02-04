import AppDataSource from "../data-source";
import { User } from "../entities/user.entity";
import { compare } from "bcryptjs";
import jwt from "jsonwebtoken";
import "dotenv/config";
import { ISessionRequest } from "../interfaces/users";
import AppError from "../errors/AppError";

const createSessionService = async ({
    email, password,
}: ISessionRequest): Promise<string> => {
    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOneBy({email: email});

    if (!user){
        throw new AppError("Senha ou email inválidos");
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch){
        throw new AppError("Senha ou email inválidos");
    }

    const token = jwt.sign(
        { isAdm: user.isAdm, id: user.id},
        process.env.SECRET_KEY as string,
        { expiresIn: "24h", subject: user.id });

    return token
}

export default createSessionService