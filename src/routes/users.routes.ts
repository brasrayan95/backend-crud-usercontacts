import { Router } from "express";
import { createUserController, listUserController, getOneUserController, softDeleteUserController, updateUserController } from "../controllers/users.controllers";
import ensureIsAdmMiddleware from "../middlewares/ensureAdm.middleware";
import ensureAuthMiddleware from "../middlewares/ensureAuth.middleware";


const userRoutes = Router();

userRoutes.post("/users", createUserController);
userRoutes.get("/users",
    ensureAuthMiddleware,
    ensureIsAdmMiddleware,
    listUserController);
userRoutes.get("/users/:id",
    ensureAuthMiddleware,
    ensureIsAdmMiddleware,
    getOneUserController);
userRoutes.patch("/users/:id",
    ensureAuthMiddleware,
    ensureIsAdmMiddleware,
    updateUserController);
userRoutes.delete("/users/:id",
    ensureAuthMiddleware,
    ensureIsAdmMiddleware, 
    softDeleteUserController);

export default userRoutes