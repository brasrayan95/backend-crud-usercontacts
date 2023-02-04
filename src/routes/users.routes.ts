import { Router } from "express";
import { createUserController, listUserController, softDeleteUserController, updateUserController } from "../controllers/users.controllers";

const userRoutes = Router();

userRoutes.post("/users", createUserController);
userRoutes.get("/users", listUserController);
userRoutes.patch("/users/:id", updateUserController);
userRoutes.delete("/users/:id", softDeleteUserController);

export default userRoutes