import { Router } from "express";
import { createSessionController } from "../controllers/sessions.controllers";

const sessionRoutes = Router();

sessionRoutes.post("/login", createSessionController);

export default sessionRoutes;
