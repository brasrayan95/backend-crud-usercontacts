import { Request, Response } from "express";
import { IUserRequest, IUserUpdate } from "../interfaces/users";
import { createUserService, getUsersService, getOneUserService, updateUserService, softDeleteUserService } from "../services/users.services";

import { instanceToPlain } from "class-transformer";

const createUserController = async (req: Request, res: Response) => {
    try {
        const user: IUserRequest = req.body;
        const createUser = await createUserService(user);
        return res.status(201).json(instanceToPlain(createUser)) 
    } catch (err) {
        if (err instanceof Error){
            return res.status(400).json({message: err.message})
        }
    }
};

const listUserController = async (req: Request, res: Response) => {
    const users = await getUsersService();
    return res.status(200).json(instanceToPlain(users));
}

const getOneUserController = async (req: Request, res: Response) => {
    try {
        const id: string = req.params.id;
        const user = await getOneUserService(id);
        return res.status(209).json(instanceToPlain(user))
    } catch (err) {
        if (err instanceof Error){
            return res.status(400).json({message: err.message})
        }
    }
}

const updateUserController = async (req: Request, res: Response) => {
    const user: IUserUpdate = req.body;
    const id: string = req.params.id;
    const updateUser = await updateUserService(user, id);

    return res.status(200).json(instanceToPlain(updateUser));
}

const softDeleteUserController = async (req: Request, res: Response) => {
    try {
        const {id} = req.params;
        const result = await softDeleteUserService(id);
        return res.status(204).json(result);
    } catch (err) {
        if (err instanceof Error){
            return res.status(400).json({message: err.message})
        }
    }
}

export {createUserController, listUserController, updateUserController, softDeleteUserController, getOneUserController};