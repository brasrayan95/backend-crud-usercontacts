import "reflect-metadata";

import express, { Router } from "express";
import userRoutes from "./routes/users.routes";
import sessionRoutes from "./routes/sessions.routes";
import errorHandlingMiddleware from "./middlewares/errorHandling.middleware";


const app = express();
app.use(express.json());
app.use(userRoutes);
app.use(sessionRoutes);

app.use(errorHandlingMiddleware);

export default app;
