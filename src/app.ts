import "reflect-metadata";
import "express-async-errors"

import express, { Router } from "express";
import userRoutes from "./routes/users.routes";
import sessionRoutes from "./routes/sessions.routes";
import errorHandlingMiddleware from "./middlewares/errorHandling.middleware";
import contactsRoutes from "./routes/contacts.routes";


const app = express();
app.use(express.json());
app.use(userRoutes);
app.use(contactsRoutes);
app.use(sessionRoutes);

app.use(errorHandlingMiddleware);

export default app;
